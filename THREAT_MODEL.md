# Threat Model

Status: initial draft

| Threat | Protected asset | Required control | Normative rules |
|---|---|---|---|
| Projection copies company secrets | Company and third-party context | Input minimization, leakage checks, quarantine | CRPP-PROJECTION-002..006 |
| Company reclassifies private life as work context | Personal context | Purpose and explicit authority boundaries | CRPP-CORE-001, CRPP-DEFAULT-001 |
| Majority exposes a minority contributor | Sensitive joint contribution | Affected-contributor consent | CRPP-ESCROW-002..003 |
| Unrelated participant blocks access | Independent contribution | Provenance-scoped veto | CRPP-ESCROW-002, CRPP-ESCROW-004 |
| Client string impersonates an actor | All governed context | Host-authenticated identity | CRPP-CORE-002 |
| Grant is reused after expiry or revocation | Joint and third-party context | Runtime re-evaluation | CRPP-GRANT-002, CRPP-REVOCATION-001 |
| Logs reveal denied content | Protected context | Minimal audit and non-sensitive errors | CRPP-AUDIT-002..003 |
| Compute-to-data returns raw context | Joint context | Output schema and leakage controls | CRPP-GRANT-004, CRPP-ESCROW-005 |
| Old release is silently rewritten | Protocol integrity | Immutable releases and signed tags | Governance release policy |

Each threat must gain at least one invalid conformance fixture before `0.1.0-rc.1`.
