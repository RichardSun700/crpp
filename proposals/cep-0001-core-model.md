# CEP-0001: Core Context Rights Model

- Status: Draft
- Authors: CRPP initiating contributors
- Created: 2026-08-19
- Discussion: Repository history and public Discussions
- Target version: 0.1

## Summary

Adopt four authority domains, ex-ante Context Agreements, conservative no-agreement defaults, generation-time Portable Projections, Joint Context Escrow, affected-contributor authorization, third-party priority, and operation-specific grants.

## Fairness rationale

The model prevents a company from absorbing unrelated private context, prevents a person from copying company and joint facts under the label of portability, prevents a majority from exposing a minority's sensitive contribution, and prevents unrelated participants from blocking independently attributable context.

## Normative changes

Define the first CRPP rule set, object model, four authority domains, operation-specific grants, generation-time Portable Projections, Joint Context Escrow, audit commitments, conservative no-agreement defaults, and third-party priority.

## Privacy and security impact

Implementations must defend against projection leakage, re-identification, provenance forgery, privilege expansion, collusion, compromised clients, malicious administrators, escrow bypass, and raw-context exposure through logs or caches. Unavailable or indeterminate projection checks cannot produce an approved output.

## Schema and conformance changes

The draft introduces eight public JSON Schemas, shared definitions, valid and invalid fixtures, and fairness scenarios. Every implementation claim must identify the exact protocol version and supported profile.

## Implementation requirement

Every normative rule must be represented by stable rule IDs and valid/invalid synthetic conformance fixtures before the first release candidate.

## Translation impact

Normative English and Chinese drafts must expose the same ordered rule identifiers. Semantic differences are tracked as protocol defects.

## Compatibility and migration

This is the initial draft and makes no backward-compatibility promise. Once a version is published, it is immutable; changes require errata or a new version.

## Alternatives rejected

- Treating all work context as company property ignores portable personal capability.
- Treating all participant-visible context as individually portable exposes company, collaborator, and third-party facts.
- Making every later decision unanimous creates holdout power for unrelated participants.
- Naming a single “owner” does not express operation-specific rights or purpose limits.

## Serious objections and responses

The largest unresolved objection is whether technical separation can be sufficiently resistant to re-identification and employer coercion. CRPP therefore remains a draft, requires conservative quarantine, and does not claim that conformance establishes legal fairness.

## Disclosure of interests

Memova initiated the draft and may implement CRPP concepts. It receives no permanent governance seat, veto, certification privilege, or exclusive license.
