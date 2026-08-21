# Run CRPP in Five Minutes

CRPP's reference flow is deliberately small. It turns one **synthetic** work event into four governed outputs:

1. a complete company record;
2. one safe capability projection for each eligible contributor;
3. a Joint Context Escrow record; and
4. a chained audit trail.

## Requirements

- Node.js 20 or later
- npm

## Run the reference flow

```bash
npm ci
npm run demo
```

The command reads [`demo/employee-exit/input.json`](demo/employee-exit/input.json) and writes deterministic JSON to standard output. Run it twice: the outputs should be identical.

To route another local synthetic fixture:

```bash
node reference/cli.mjs path/to/synthetic-input.json
```

The CLI rejects input unless `synthetic` is exactly `true`. Do not use the demo with employer, worker, customer, patient, partner, or user data.

## Verify conformance

```bash
npm test
npm run validate
npm run test:coverage
```

The demo outputs validate against the same JSON Schemas used by the conformance suite. A passing demo means only that this narrow reference flow conforms to the current draft. It is not a privacy audit, legal opinion, security certification, or proof of production-grade de-identification.

## Read the output

- `company_record` preserves the synthetic business facts inside the `company` authority domain.
- `portable_projections` contain capability statements supplied separately from restricted facts. Each projection records the source commitment and policy checks.
- `joint_context` denies raw copying by default and allows only governed `read`, `invoke`, and `project` operations.
- `audit_events` form a deterministic commitment chain from classification through projection and escrow creation.

Next: read the [whitepaper](WHITEPAPER.md), inspect the [normative specification](SPEC.md), or follow the [adoption guide](ADOPT.md).
