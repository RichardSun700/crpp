# CRPP Implementations

This registry distinguishes protocol text from running systems. Listing does not imply endorsement, security review, legal compliance, or certification.

## Reference implementation

| Implementation | Language | Profile | Status | Maintainer |
|---|---|---|---|---|
| [`reference/`](reference/README.md) | JavaScript / Node.js | Synthetic employee-exit routing | Experimental reference | CRPP contributors |

The Reference implementation exists to make protocol discussion concrete. It is deterministic, rejects non-synthetic input, emits schema-valid objects, and demonstrates the separation of company facts, portable capability, joint context, and audit evidence. It is not a production de-identification engine.

## Listing an independent implementation

Open a pull request that adds one row to the table below and includes:

- a public source repository and immutable implementation revision;
- the CRPP version and exact supported profile;
- reproducible conformance output;
- supported and unsupported objects and operations;
- known security, privacy, legal, and interoperability limitations;
- a maintainer and vulnerability-reporting contact;
- no use of real personal, employer, customer, patient, or partner data in public fixtures.

| Implementation | Language | Profile | Evidence | Status |
|---|---|---|---|---|
| _No independent implementation listed yet_ | — | — | — | — |

Two interoperable implementations controlled by independent parties are a target for moving core protocol changes from `Accepted` to `Implemented`. Self-attestation alone does not establish interoperability.
