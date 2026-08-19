# Context Rights & Portability Protocol

**CRPP is an open, vendor-neutral protocol for deciding what work context stays with an organization, what portable capability a person may retain, and how jointly created context can be governed after a project ends.**

> Status: `0.1.0-draft.1`. CRPP is an experimental technical and governance protocol. It is not legal advice, a certification, or a substitute for employment, privacy, confidentiality, intellectual-property, or data-processing agreements.

[中文说明](README.zh-CN.md) · [Normative draft](SPEC.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

## The problem

AI systems increasingly rely on accumulated context: decisions, failed approaches, relationships, operating methods, judgment patterns, and tool-use skills. Today that context is usually treated as one indivisible data pile:

- the company keeps everything and the worker loses the continuity of capabilities developed through work; or
- the worker copies work material and risks exposing company secrets, other contributors, or third-party data.

CRPP separates four authority domains and makes the rules machine-readable at creation time:

| Domain | Default role |
|---|---|
| `company` | Complete authorized business record |
| `personal` | A person's private context, separable contribution, and compliant portable capability projection |
| `joint` | Inseparable multi-party context governed through escrow |
| `third_party` | Context subject to independent customer, user, patient, partner, or legal constraints |

## Core default

Rights should be agreed **before or when context is created**.

When there is no prior agreement:

1. the organization retains its complete, authorized business record;
2. each person retains only their separable raw contribution and a compliant capability projection derived from their contribution;
3. inseparable joint context enters Joint Context Escrow and is not automatically copied to any participant;
4. later permanent access, time-limited invocation, or conditional rental requires a scoped grant from the affected contributors and any independent third-party controller;
5. reading, copying, model training, publication, commercialization, and delegation are separate permissions.

The default does **not** give a self-declared “main contributor” unilateral possession of joint context.

## Portability by construction

De-identification is not postponed until resignation or export. An authorized work event is routed at generation time:

```text
Authorized work event
  -> agreement + purpose resolver
  -> provenance + authority classification
  -> company canonical record
  -> per-person portable capability projection
       -> leakage checks -> quarantine/review -> personal domain
  -> joint context escrow
  -> third-party protected layer
  -> signed manifest + audit events
```

A portable projection describes reusable capability — methods, checks, decision patterns, and tool orchestration — rather than summarizing confidential company facts.

## What is in this draft

- English normative rules and a full Chinese translation;
- JSON Schemas for agreements, objects, projections, joint context, grants, attestations, revocations, and audit events;
- synthetic valid and invalid conformance scenarios;
- a deterministic conformance runner;
- governance through public Context Enhancement Proposals (CEPs).

Reference policy engines, generation-time projection pipelines, Joint Context Escrow, and MCP/REST adapters are planned after the core draft is validated.

## Participate

- Use Discussions for early concepts and normative questions.
- Use Issues for scoped defects, translation differences, and conformance gaps.
- Use a CEP for new protocol objects, rights changes, breaking changes, or governance changes.
- Every schema change must include spec text and valid/invalid fixtures.

See [CONTRIBUTING.md](CONTRIBUTING.md). All public examples must be synthetic and must not contain employer, worker, customer, patient, or user data.

## Licenses

- Specification, diagrams, explanatory examples, and translations: [CC BY 4.0](LICENSE-SPEC)
- Schemas, conformance tests, and reference code: [Apache License 2.0](LICENSE-CODE)

Memova initiated this repository as a reference participant. It receives no permanent veto and CRPP does not require Memova or any other vendor.
