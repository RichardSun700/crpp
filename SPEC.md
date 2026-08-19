# CRPP 0.1 Normative Draft

Version: `0.1.0-draft.1`

Language: English, normative

Translation: [SPEC.zh-CN.md](SPEC.zh-CN.md)

## 1. Status and interpretation

This document defines the minimum normative behavior of the Context Rights & Portability Protocol. It does not determine legal ownership. Implementers MUST apply applicable law, contract, collective agreement, and third-party rights in addition to this protocol.

The terms MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY indicate requirement levels. Stable rule IDs are normative and are used by the conformance suite.

## 2. Actors and authority domains

An actor is a person, organization, third-party controller, escrow operator, or automated service acting under authenticated authority.

Every Context Object MUST declare one or more authority domains:

- `personal`
- `company`
- `joint`
- `third_party`

An authority domain is not a claim of universal property ownership. It is a protocol boundary for permitted operations, purpose, provenance, retention, and authorization.

**CRPP-CORE-001 — Explicit authority.** A Context Object MUST NOT be processed without an explicit authority domain, purpose, and applicable agreement or default-rule reference.

**CRPP-CORE-002 — Authenticated actor.** A CRPP decision MUST use an actor identity authenticated by the host environment. A client-provided actor string alone MUST NOT establish authority.

## 3. Ex-ante agreements

**CRPP-AGREEMENT-001 — Time of agreement.** Portable-copy, projection, training, publication, commercialization, and post-project access rules SHOULD be agreed before context is created and MUST be recorded no later than the first governed write.

**CRPP-AGREEMENT-002 — No retrospective expansion.** An actor MUST NOT unilaterally expand its historical rights after context has been created. A later agreement MAY grant future access but MUST identify its effective time and consenting actors.

**CRPP-AGREEMENT-003 — Specific operations.** An agreement MUST distinguish reading, copying, projecting, invoking, training, publishing, commercializing, and delegating. Permission for one operation MUST NOT imply permission for another.

## 4. Default rules without an agreement

**CRPP-DEFAULT-001 — Company record.** An organization MAY retain the complete canonical record produced within its lawful, disclosed, and authorized business purpose. This rule MUST NOT be used to collect a person's unrelated private context.

**CRPP-DEFAULT-002 — Own separable contribution.** A contributor MAY retain a separable raw contribution that can be isolated without including another actor's contribution, company-provided secret facts, or third-party protected context.

**CRPP-DEFAULT-003 — Own portable capability.** A contributor MAY receive a Portable Projection derived from that contributor's provenance scope only after the projection passes all required checks.

**CRPP-DEFAULT-004 — Inseparable joint context.** Inseparable jointly created context MUST enter Joint Context Escrow. It MUST NOT be automatically copied to a participant, including a self-declared or measured primary contributor.

**CRPP-DEFAULT-005 — Other participants.** A participant receives no automatic post-project copy of another person's separable contribution or of joint raw context.

## 5. Generation-time portable projections

A Portable Projection expresses reusable capability such as a method, checklist, decision pattern, or tool-orchestration skill. It is not a summary of company facts.

**CRPP-PROJECTION-001 — Generation-time routing.** A compliant implementation MUST classify authority and create candidate projections during the governed generation pipeline, not solely at resignation, project completion, or export.

**CRPP-PROJECTION-002 — Input minimization.** A projection generator MUST receive only the provenance scope needed to derive the permitted capability.

**CRPP-PROJECTION-003 — Required checks.** Before a projection is written to the personal domain, it MUST pass required checks for direct identifiers, secrets, unique numbers or events, metadata leakage, re-identification risk, and policy-prohibited content.

**CRPP-PROJECTION-004 — Quarantine.** A projection with a failed, unavailable, or indeterminate required check MUST enter quarantine. It MUST NOT be written to the personal domain until an authorized review produces an attestation.

**CRPP-PROJECTION-005 — No hidden source.** A personal projection MUST NOT contain raw source paths, recoverable embeddings, hidden fields, caches, or logs that expose protected source content. It MAY contain a non-revealing provenance commitment.

**CRPP-PROJECTION-006 — Export re-audit.** Export MUST re-evaluate current policy, revocation state, and newly known re-identification risks. A generation-time pass does not create an irrevocable right to export unsafe content.

## 6. Joint Context Escrow

**CRPP-ESCROW-001 — Default custody.** Inseparable joint context MUST remain in a controlled escrow domain unless a valid operation-specific grant permits another action.

**CRPP-ESCROW-002 — Affected contributors.** For each request, the implementation MUST resolve affected contributors from provenance edges inside the requested scope. It MUST NOT automatically use every project participant.

**CRPP-ESCROW-003 — Minority protection.** Majority approval MUST NOT disclose an affected contributor's sensitive or identifiable contribution without that contributor's required consent.

**CRPP-ESCROW-004 — No unrelated blocking.** An actor without provenance, privacy, contractual, or legal interest in the requested scope MUST NOT receive a veto over that scope.

**CRPP-ESCROW-005 — Compute-to-data preference.** When a purpose can be fulfilled without a raw copy, an implementation SHOULD execute the request in a controlled environment and release only checked outputs.

## 7. Third-party context

**CRPP-THIRD-001 — Independent authority.** Customer, user, patient, partner, data-subject, or controller restrictions MUST be evaluated independently. Contributor agreement, including unanimous agreement, MUST NOT override an independent third-party requirement.

**CRPP-THIRD-002 — Scope minimization.** Third-party context MUST be excluded from personal projections unless an explicit lawful basis and operation-specific authorization permit inclusion.

## 8. Access grants

Every Access Grant MUST identify the grantor, grantee, scope, operation, purpose, start and end times, invocation or output limits, training permission, copying permission, delegation permission, revocation terms, and integrity proof.

**CRPP-GRANT-001 — Deny incomplete grants.** A grant missing purpose, scope, operation, or expiry MUST be rejected.

**CRPP-GRANT-002 — Runtime enforcement.** Each invocation MUST check the grant's current time, remaining uses, revocation state, actor identity, purpose, and requested operation.

**CRPP-GRANT-003 — Separate irreversible uses.** Raw copying, model training, public release, commercialization, and delegation each require explicit authorization. A read or invoke grant MUST NOT imply them.

**CRPP-GRANT-004 — Output controls.** Compute-to-data output MUST pass the declared output schema and leakage controls before release. A failed output MUST be withheld and audited.

## 9. Revocation and retention

**CRPP-REVOCATION-001 — Future enforcement.** A valid revocation MUST prevent future operations covered by the revocation after its effective time.

**CRPP-REVOCATION-002 — Honest limits.** An implementation MUST distinguish revoking future authority, cryptographic erasure, deletion from active indexes, and the inability to recover every previously lawful external copy.

**CRPP-REVOCATION-003 — Minimal audit.** Revocation MUST NOT erase the minimum audit evidence required to prove that later access was denied, unless applicable law requires deletion.

## 10. Audit and decisions

**CRPP-AUDIT-001 — Decision evidence.** Creation, classification, projection, quarantine, review, grant, invocation, denial, revocation, and export MUST create append-only audit events.

**CRPP-AUDIT-002 — Data minimization.** Audit events MUST record stable object references, rule IDs, decision results, and integrity evidence without copying protected content into logs.

**CRPP-AUDIT-003 — Explainable denial.** A denial MUST return stable rule IDs and a non-sensitive reason. Error output MUST NOT reveal the protected content that caused the denial.

## 11. Conformance claims

An implementation MUST name its protocol version and profile. The initial profiles are:

- `CRPP 0.1 Core Compatible`
- `CRPP 0.1 Portable Projection Compatible`
- `CRPP 0.1 Joint Escrow Compatible`

An implementation MUST NOT claim conformance without publishing or providing verifiable results for the applicable conformance suite and declaring unsupported optional behavior.

## 12. Security and privacy boundary

CRPP conformance does not prove legal compliance, successful anonymization, or production security. Implementers MUST maintain a threat model appropriate to their data and deployment. Public conformance fixtures MUST contain synthetic data only.
