# When Work Becomes AI Memory, Who Owns It?

## CRPP — An Open Protocol for Portable Intelligence

**Companies keep the business facts. People carry safe, verifiable capability. Shared context follows rules agreed before it is created.**

> **Carry the capability. Not the secrets.**

[Read the whitepaper](WHITEPAPER.md) · [Run the demo](QUICKSTART.md) · [Adopt CRPP](ADOPT.md) · [中文](README.zh-CN.md)

> Status: `0.1.0-draft.1`. CRPP is an experimental technical and governance protocol. It is not legal advice, a certification, or a substitute for employment, privacy, confidentiality, intellectual-property, or data-processing agreements.

## The conflict

AI is turning ordinary work into persistent memory: decisions, rejected options, relationships, operating methods, judgment patterns, and tool-use skills.

Today that memory is usually treated as one indivisible pile:

- the organization keeps everything, and a person loses the continuity of capabilities developed through work; or
- the person copies work material, exposing company secrets, collaborators, customers, or regulated data.

CRPP specifies a third option. It separates business facts from portable capability at generation time, records who affected each object, and makes later access machine-verifiable.

```text
Authorized work event
  -> agreement + purpose resolver
  -> provenance + authority classification
  -> company canonical record
  -> safe portable projection for each eligible person
       -> leakage checks -> quarantine or approval
  -> inseparable joint context escrow
  -> third-party protected layer
  -> audit events + commitments
```

## Four authority domains

| Domain | Default role |
|---|---|
| `company` | Complete authorized business record |
| `personal` | Private context, separable contribution, and compliant capability projection |
| `joint` | Inseparable multi-party context governed through escrow |
| `third_party` | Context subject to customer, user, patient, partner, or legal restrictions |

Rights should be agreed **before or when context is created**. Reading, copying, projecting, invoking, training, publishing, commercializing, and delegating are separate permissions.

**No prior agreement is not a blank check.** The company retains its authorized business record; each person retains only their separable contribution and compliant capability projection; inseparable joint context is not automatically copied to the company, a self-declared “main contributor,” or every participant.

## See it run

The reference demo uses synthetic data only. It routes one work event into a company record, two portable projections, joint escrow, and a verifiable audit chain.

```bash
npm ci
npm run demo
```

The demo does not claim production de-identification or legal compliance. It is a deterministic reference flow for protocol review and independent implementation.

## Protocol stack

- [Whitepaper](WHITEPAPER.md): the coordination problem, design thesis, incentives, and limits.
- [Normative specification](SPEC.md): the rules an implementation must follow.
- [JSON Schemas](schemas/README.md): machine-readable protocol objects.
- [Conformance suite](conformance/README.md): valid, invalid, and fairness scenarios.
- [Reference flow](reference/README.md): minimal running code.
- [Context Enhancement Proposals](proposals/README.md): the public change process.
- [Threat model](THREAT_MODEL.md): protected assets, adversaries, and required controls.
- [Governance](GOVERNANCE.md): decision rights and neutral-stewardship path.

## Participate

- Use Discussions for early concepts and normative questions.
- Use Issues for scoped defects, translation differences, and conformance gaps.
- Use a CEP for new protocol objects, rights changes, breaking changes, or governance changes.
- Every normative schema change must include specification text and valid/invalid fixtures.
- Public examples must be synthetic and must not contain employer, worker, customer, patient, or user data.

Start with [CONTRIBUTING.md](CONTRIBUTING.md) and the [CEP registry](proposals/README.md).

## Licensing

- Schemas, conformance tests, and reference code: Apache License 2.0.
- Specification, diagrams, explanatory examples, whitepapers, and translations: CC BY 4.0.
- See [LICENSE](LICENSE) and [REUSE.toml](REUSE.toml) for machine-readable allocation.

Memova initiated CRPP as a reference participant. It receives no permanent seat or veto, and CRPP does not require Memova or any other vendor.
