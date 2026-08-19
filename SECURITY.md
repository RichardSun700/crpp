# Security Policy

## Supported version

Only the latest CRPP draft is actively reviewed for security issues. A draft is not production certification.

## Reporting

Use GitHub private vulnerability reporting after the public repository enables it. Do not open a public issue containing exploit details, private context, credentials, or re-identification examples based on real people.

## Scope

Relevant reports include:

- authorization bypass;
- projection leakage or re-identification;
- provenance forgery;
- grant or revocation bypass;
- raw-context exposure through logs, caches, adapters, or escrow output;
- malicious schema or fixture behavior;
- CI or release-chain compromise.

## Secrets

CRPP requires no production credentials. Reference implementations must read optional secrets from environment variables and must never commit them. All public fixtures are synthetic.
