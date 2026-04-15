---
title: UAE Pass integration — the parts the docs don't cover
date: 2026-02-14
excerpt: Clock skew, signature verification, and the audit trail pattern I wish I'd started with.
tags: [.NET, Auth, UAE Pass]
author: Faisal Aman
---

UAE Pass is a solid identity provider — once you clear the production-readiness hurdles the developer docs don't quite prepare you for. Here's what I wish someone had told me before my first rollout.

## OIDC with PKCE — non-negotiable

The staging docs make authorization code flow look optional. For production apps handling government data, **always** use OIDC with PKCE. The code verifier closes a class of interception attacks that matter when your user is on a public network.

## Clock skew is your invisible enemy

Government networks sometimes sit behind NTP servers that drift a few seconds. A freshly issued ID token can arrive at your API already "expired" by your clock. Fix:

```csharp
options.TokenValidationParameters = new TokenValidationParameters {
    ClockSkew = TimeSpan.FromSeconds(30),
    // ...
};
```

Without this, you'll see ~1% of logins fail at random and spend a week thinking it's a bug in your code.

## Signature verification that actually works

The UAE Pass eSeal responses are CAdES-signed. Stock .NET `SignedCms` can parse them, but the library surface is rough. My rules of thumb:

- Verify the signing certificate chain against a pinned root
- Check the revocation status (OCSP or CRL) on a schedule, not per-request
- Hash-check the signed content against what your app sent — critical for replay protection

## Build the audit trail before you ship

Every auth + signature event should be written to an append-only log with:

- Timestamp (UTC, ntp-synced)
- Subject identifier (hashed, never raw)
- Request correlation ID
- Outcome + error code

Tamper-evidence via chained hashing is a small addition that pays off the first time you're asked "did X actually log in on Y date?"

## The one-line middleware I keep porting

The 10th time I rewrote this glue code, I packaged it as a .NET library. If I ever open-source it, I'll link it here.
