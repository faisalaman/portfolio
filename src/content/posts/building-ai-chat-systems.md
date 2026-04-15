---
title: Building AI chat systems that don't fall over in production
date: 2026-03-20
excerpt: Token streaming, memory strategies, and the edge cases that quietly kill prod LLM apps.
tags: [AI, LLM, Architecture]
author: Faisal Aman
---

Most AI chat demos look great on stage and fall apart in production. After shipping a handful of them, I've settled on a short list of patterns that consistently survive real traffic.

## Stream by default, batch when you must

Users judge an AI app on the first token, not the last. Streaming with Server-Sent Events (SSE) makes a 6-second response feel like a 400ms one.

```ts
// .NET minimal-API streaming endpoint
app.MapPost("/chat", async (ChatRequest req, HttpContext ctx) => {
    ctx.Response.Headers.Append("Content-Type", "text/event-stream");
    await foreach (var chunk in llm.StreamAsync(req.Messages)) {
        await ctx.Response.WriteAsync($"data: {chunk}\n\n");
        await ctx.Response.Body.FlushAsync();
    }
});
```

Gotcha: if a proxy in front of your API buffers the response, streaming silently becomes batching. Always test end-to-end through your real edge.

## Memory: summarize, don't accumulate

Storing the full conversation history and sending it on every turn is a cost and latency trap. A cleaner pattern:

- Keep the last **N** messages verbatim
- Beyond that, maintain a running summary, updated every few turns
- At token-budget time, send: system prompt → summary → last N messages

This stays cheap and keeps the model oriented without drowning it in scroll-back.

## The three failure modes you'll hit

1. **Rate limits.** A single user with a bad script can DoS your provider quota. Rate-limit per-user, not per-IP.
2. **Streaming drops.** Networks flake. Always buffer on the client and detect premature closes.
3. **Hallucinated tool calls.** When you give an LLM tools, it will sometimes invent tool names. Validate the call against your registered schema before executing.

## Closing thought

Reliability in LLM apps is 80% plumbing — backpressure, timeouts, retries, auth — and 20% prompt. Spend accordingly.
