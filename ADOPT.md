# Adopt CRPP

CRPP adoption is a sequence of increasingly serious commitments. Start with synthetic evidence. Do not treat a repository badge, passing test, or self-description as certification.

## Level 0 — Explore

- Read the whitepaper and threat model.
- Map your information into `personal`, `company`, `joint`, and `third_party` authority domains.
- Identify which operations are actually needed: read, copy, project, invoke, train, publish, commercialize, or delegate.
- Record unresolved legal, labor, privacy, intellectual-property, security, and power-asymmetry questions.

No production data is processed at this level.

## Level 1 — Synthetic pilot

- Fork the employee-exit demo.
- Use invented actors, organizations, customers, projects, identifiers, and secrets.
- Add valid and invalid conformance fixtures for your proposed policy.
- Demonstrate quarantine when a projection check fails or is unavailable.
- Ask affected workers, organizations, and third parties to challenge the model before implementation.

A synthetic pilot is a design exercise, **not a certification**.

## Level 2 — Controlled implementation

Before any real context enters the system:

- obtain qualified employment, privacy, intellectual-property, sectoral, and data-protection review in each relevant jurisdiction;
- complete a documented threat model and data-protection impact assessment where applicable;
- define agreements before or when context is created;
- separate identity resolution, policy enforcement, storage, projection, escrow, and audit duties;
- require generation-time projection and quarantine instead of post-exit bulk export;
- establish a human appeal route and emergency revocation process;
- prohibit silent expansion from `read` or `invoke` to `copy`, `train`, `publish`, `commercialize`, or `delegate`;
- test re-identification, collusion, prompt injection, compromised clients, malicious administrators, and audit-log tampering.

## Level 3 — Public conformance claim

Publish:

- the exact CRPP version and implementation commit;
- the conformance command and complete machine-readable results;
- supported and unsupported protocol objects and operations;
- security, privacy, and legal limitations;
- known deviations and open risks;
- an incident and revocation contact;
- evidence that at least one party independent of the implementation team reproduced the result.

Use wording such as “conforms to CRPP `0.1.0-draft.1` for the declared profile.” Do not say “CRPP certified” unless a future, independently governed certification program actually exists.

## Minimum deployment gate

| Gate | Required evidence |
|---|---|
| Authority | Every object has an authority domain and agreement basis |
| Purpose | Purpose and allowed operations are explicit and bounded |
| Projection | Checks run at generation time; uncertain outputs quarantine |
| Joint context | Affected contributors and escrow controller are recorded |
| Third parties | Independent restrictions survive employment or project changes |
| Audit | Tamper-evident events record decisions without logging raw secrets |
| Remedy | Appeal, correction, revocation, and incident paths are usable |
| Verification | Fixtures, schemas, and reproducible results are public where lawful |

CRPP does not decide who legally owns a trade secret, copyright, personal datum, employment invention, or professional privilege. It provides technical objects and decision records that can implement a lawful agreement; it cannot create authority that the parties do not possess.
