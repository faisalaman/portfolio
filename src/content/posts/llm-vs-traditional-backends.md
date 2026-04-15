---
title: LLMs vs traditional backends — when to use which
date: 2026-01-28
excerpt: Not everything needs a model. A practical decision framework after a year of shipping hybrid systems.
tags: [AI, Architecture, Engineering]
author: Faisal Aman
---

A lot of LLM integrations I've seen (and a few I've built) should have been a `switch` statement. Here's how I decide now.

## Use a traditional backend when

- The inputs and outputs have a **fixed schema** — validate, transform, return
- Correctness matters more than flexibility
- Latency budget is tight (< 200ms)
- The cost per call must be predictable to the cent

Invoice calculations, role-based auth, inventory checks, payment processing — none of these need an LLM. They need boring, tested, deterministic code.

## Use an LLM when

- The input is **unstructured** (free text, images, messy docs)
- The output needs to adapt to many phrasings or edge cases
- You need natural-language reasoning over domain context
- A near-miss answer is still useful

Customer-support triage, document summarization, search-over-messy-KBs, semantic similarity — this is where an LLM earns its keep.

## The hybrid pattern that wins

Most production systems I ship now are **LLM on the edges, deterministic code in the core**:

```
User input (messy)
  → LLM: classify + extract structured fields
  → Traditional backend: validate, transact, persist
  → LLM: generate natural-language response
  → User
```

The middle is plain engineering — auditable, testable, cheap. The edges are where the LLM's flexibility shines.

## A checklist before reaching for an LLM

1. Can a regex + lookup table solve 90%? Use that.
2. Is the failure mode "sometimes wrong" acceptable? LLM is fine.
3. Do you need the output to be parseable? Use structured output / JSON schema.
4. Is the call chain deep? Cache aggressively — same prompt → same output most of the time.

## The real win

Knowing when **not** to use an LLM is a bigger productivity lever than knowing how to prompt one.
