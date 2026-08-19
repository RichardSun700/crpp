# CRPP 0.1.0-draft.1 TDD Evidence

## Source plan

The implementation follows the approved CRPP repository design and phased implementation plan maintained by the initiating project. Public guarantees are represented in this repository by the normative spec, schemas, fixtures, and tests rather than by relying on that external plan.

## User journeys

- As a contributor, I can retain my own separable contribution without copying another person's or a company's protected context.
- As an organization, I can retain a complete authorized business record while a person receives only a checked capability projection.
- As a joint contributor, my sensitive contribution cannot be exposed by a majority vote.
- As a requester, an unrelated participant cannot veto context outside that participant's provenance or rights.
- As a third-party controller, my independent restriction is not overridden by unanimous project contributors.
- As an implementer, I receive deterministic decisions with stable rule IDs and non-sensitive errors.

## RED evidence

Commit `7e7ad06` added schema and fairness tests. The executed suite failed because the required `conformance/runner/index.mjs` implementation did not exist. Both test modules were loaded and failed with `ERR_MODULE_NOT_FOUND` for the intended missing implementation.

Commit `e54e5c7` added the five-example contract. The executed suite passed the existing 13 tests and failed five tests with `ENOENT` for the intended missing example bundles.

## GREEN evidence

Commit `2f9c174` added eight public object schemas, shared definitions, deterministic decisions, and a CLI runner. The same suite passed 13/13 tests after strict JSON Schema issues were corrected without disabling strict mode.

Commit `d2078b7` added five synthetic examples. The same suite passed 18/18 tests.

## Test specification

| Guarantee | Evidence | Type | Result |
|---|---|---|---|
| Eight public schemas compile under JSON Schema Draft 2020-12 strict validation | `schema.test.mjs` | integration | PASS |
| Valid objects pass and invalid objects return stable rule IDs | `schema.test.mjs` | integration | PASS |
| Main-contributor status does not grant joint raw-copy rights | `scenario.test.mjs` | policy | PASS |
| Majority approval cannot expose a minority's sensitive contribution | `scenario.test.mjs` | policy | PASS |
| Unrelated participants cannot block independently attributable context | `scenario.test.mjs` | policy | PASS |
| Third-party authority survives unanimous contributor approval | `scenario.test.mjs` | policy | PASS |
| Read permission does not imply model-training permission | `scenario.test.mjs` | policy | PASS |
| Expired grants are denied and scoped invocations can be allowed | `scenario.test.mjs` | policy | PASS |
| Failed projection checks produce quarantine without secret echo | `scenario.test.mjs`, `schema.test.mjs` | security | PASS |
| English and Chinese drafts expose identical ordered rule IDs | `scenario.test.mjs`, `scripts/lint.mjs` | documentation | PASS |
| Five public examples are synthetic and match expected decisions | `examples.test.mjs` | end-to-end fixture | PASS |

## Coverage and known gaps

The draft conformance runner is covered by Node's built-in test coverage. It is a deterministic protocol demonstrator, not a production authorization service. Production identity verification, cryptographic signatures, semantic leakage models, durable escrow, network adapters, and jurisdiction-specific legal mappings remain future work and are explicitly outside the draft conformance claim.
