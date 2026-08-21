# Context Enhancement Proposal Registry

A Context Enhancement Proposal (CEP) is the only path for changing normative rights, protocol objects, conformance requirements, breaking behavior, or governance. Discussion can begin informally, but normative change must become a numbered, reviewable document.

## Registry

| CEP | Title | Status | Discussion | Target |
|---|---|---|---|---|
| CEP-0001 | CRPP Core Draft | Draft | Repository history and Discussions | `0.1` |

## Lifecycle

`Idea → Draft → Review → Last Call → Accepted → Implemented`

Terminal or redirecting states are `Rejected`, `Withdrawn`, and `Superseded`.

- **Idea** — a problem statement in Discussions; no number and no normative standing.
- **Draft** — a numbered pull request using [`template.md`](template.md), with authors, scope, tests, security analysis, and disclosed interests.
- **Review** — the proposal is complete enough for technical, legal, worker, company, privacy, and interoperability challenge.
- **Last Call** — a public, time-bounded review of at least 14 calendar days. The notice identifies the exact revision and unresolved objections.
- **Accepted** — the Technical Steering Committee records rough consensus, minority objections, conflicts, and rationale. An author may participate in discussion but may not unilaterally accept their own proposal.
- **Implemented** — normative text, schemas, valid and invalid fixtures, translations, and migration material are merged. For major interoperability changes, two independent implementations are the target.
- **Rejected** — the decision record explains why the proposal will not proceed.
- **Withdrawn** — the authors stop the proposal without erasing its public history.
- **Superseded** — a later CEP replaces it and links both directions.

## Numbering and immutability

- A maintainer assigns the next four-digit number when a complete Draft pull request opens.
- Numbers are never reused.
- Accepted text identifies an immutable commit.
- Published versions are not silently edited; corrections use errata or a new version.
- Normative English and Chinese changes must be reviewed for semantic alignment before release.

## Required evidence

Every CEP changing observable behavior must include:

1. the affected actors and power asymmetries;
2. normative rules and rule identifiers;
3. schema changes;
4. at least one valid and one invalid fixture;
5. privacy and security analysis;
6. compatibility and migration consequences;
7. translation impact;
8. implementation evidence or a testable implementation plan;
9. serious alternatives and objections;
10. author and reviewer conflicts of interest.

Substantive objections remain in the decision record even when consensus forms. Consensus means the proposal can advance after concerns were heard and answered; it does not mean unanimity or a simple popularity vote.
