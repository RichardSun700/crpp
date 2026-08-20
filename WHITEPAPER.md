# When Work Becomes AI Memory, Who Owns It?

## CRPP: An Open Protocol for Portable Intelligence

Version `0.1.0-draft.1` · Public working paper · 2026-08-20

### Abstract

Work is becoming machine-readable memory. Meetings, messages, decisions, failed attempts, customer knowledge, operating methods, and tool-use patterns are increasingly retained by AI systems and used to generate future action. The resulting context is economically valuable, but it does not fit a single ownership category. It may contain company records, a person's separable contribution, jointly produced reasoning, and third-party information at the same time.

The usual choice is unacceptable. If the organization keeps the whole memory, a person can lose the continuity of capabilities developed through years of work. If the person copies the whole memory, the organization, collaborators, and third parties can be exposed. CRPP proposes a third architecture: classify authority at creation time, retain the complete authorized business record in the company domain, produce a safe and verifiable capability projection for each eligible person, place inseparable joint context under escrow, and keep third-party restrictions independently enforceable.

CRPP is a technical and governance protocol, not a declaration that one side owns all context. It separates operations such as reading, copying, invoking, training, publishing, commercializing, and delegating; records provenance and affected contributors; and provides schemas and tests for independent implementations. This paper explains the coordination problem, the design, the threat model, the incentive structure, and the limits of the current draft. It is not legal advice.

## 1. The coordination problem

An employee leaves a company after three years. The company should keep its contracts, customer history, product decisions, source material, and authorized business records. The employee should not leave with a copied mailbox, customer list, confidential roadmap, or a raw export of every shared conversation. Yet it is also implausible that the person must become cognitively discontinuous on departure. They developed ways to frame uncertain decisions, check assumptions, run tools, recognize failure modes, and coordinate complex work. Those capabilities are now increasingly represented inside AI memory rather than only inside the person's unaided mind.

The problem is not adequately described as data portability. A raw export is often too much, while a blank account is too little. Nor is it adequately described as intellectual-property ownership. A single context object can contain uncopyrightable facts, copyrighted expression, trade secrets, personal information, contractual restrictions, and the contributions of several people. Employment law, privacy law, confidentiality, database rights, and contract can point in different directions across jurisdictions.

The coordination failure appears before departure. If workers expect every trace of their reasoning to become an irreversible company asset, they have an incentive to withhold reusable knowledge or keep shadow notes. If companies expect portability to mean copying business records, they have an incentive to block personal knowledge systems entirely. Both responses reduce the quality of the shared memory while increasing security risk.

CRPP reframes the question. Instead of asking who owns an indivisible pile after it has already accumulated, the protocol asks, at creation time: What is this object for? Which authority domains are implicated? Who contributed to it? Who could be exposed by its later use? Which operations are permitted? Which safe derivative can be produced now rather than reconstructed at resignation?

## 2. The design thesis

The design thesis is simple: companies should retain authorized business facts; people should be able to carry safe, verifiable capability; inseparable joint context should not be awarded to a self-declared principal contributor; and independent third-party restrictions should survive agreement among insiders.

This is not a compromise made by cutting one database in half. Business facts and portable capability are different artifacts. The company record can preserve names, dates, customer decisions, internal identifiers, exact incidents, and authorized source material. A portable projection should instead express reusable methods, checks, abstractions, decision patterns, and tool orchestration without reconstructing the protected facts from which the capability was learned.

The protocol therefore uses generation-time routing. An authorized event is evaluated against an agreement and purpose, classified by provenance and authority, written to the organization's canonical record when appropriate, and transformed into candidate portable projections. Those projections pass identifier, secret, unique-event, semantic leakage, and re-identification checks. A failed, unavailable, or indeterminate check causes quarantine rather than export.

This architecture follows a broader lesson from successful public protocols. A rule becomes infrastructure when it has a concise human thesis, a normative specification, machine-readable objects, running reference code, test vectors, and a neutral change process. A whitepaper alone cannot provide interoperability. Code alone cannot decide legitimate authority. Contract language alone cannot make enforcement observable. CRPP treats these layers as one stack while keeping their claims distinct.

## 3. Four authority domains

CRPP defines four authority domains. A context object may implicate more than one domain, but implementations must not collapse them into an unexamined owner field.

The `company` domain contains the complete authorized business record. It includes material created or received for a legitimate organizational purpose, subject to applicable law and third-party limits. Company authority does not automatically reach unrelated private life, personal accounts, or material collected without a valid purpose.

The `personal` domain contains private context, a person's independently separable raw contribution, and compliant portable projections. A projection does not grant the person a raw copy of the company record. It creates a distinct artifact with its own provenance, content commitment, checks, allowed operations, and revocation state.

The `joint` domain contains context that cannot be separated without destroying meaning or exposing another contributor. A jointly reasoned strategy, a composite design produced by several specialists, or a conversation whose meaning depends on several participants can enter this domain. Joint classification does not mean every participant owns an unrestricted copy. It means later operations must follow the ex-ante agreement or the conservative escrow default.

The `third_party` domain protects context governed by someone outside the immediate worker-company relationship: a customer, user, patient, partner, source, community, or legal controller. Unanimous agreement among project contributors cannot erase an independent third-party restriction.

These domains describe authority, not storage location. An implementation may use separate stores, encrypted partitions, or a common physical system, but the policy boundary must remain enforceable. Authentication is also separate. A client-provided string claiming to be a person or company is not an identity. Production implementations require host-authenticated actors and verifiable authorization.

## 4. Agreement before creation

The fairest moment to define portability is before the relevant context is produced. A CRPP Context Agreement identifies participants, purposes, default domains, permitted operations, effective time, and signatures. A project can specify that every named participant receives an agreed projection, that only certain roles receive one, or that some work is not portable because the risk of reconstruction is too high.

Ex-ante agreement matters for joint work. It avoids a retrospective contest in which status, bargaining power, or a claim of being the main contributor determines access. It also permits different rules for different projects. A public research collaboration, a regulated clinical project, an internal security investigation, and a routine product-planning meeting should not inherit the same portability policy.

The protocol still needs a default because many real systems will encounter missing, incomplete, or invalid agreements. Under the draft default, the organization retains its complete authorized business record. Each person retains their separable raw contribution and may receive a compliant projection derived from their contribution. Inseparable joint context enters escrow and is not automatically copied to anyone. Third-party limits remain in force.

This default deliberately avoids two extremes. It does not let the company absorb unrelated private context merely because a work device or model touched it. It does not let a person relabel company or joint facts as personal learning. It also does not grant a self-declared principal contributor unilateral possession of joint context. Later permanent access, time-limited invocation, or conditional use requires a scoped grant from affected contributors and any independent controller whose rights are implicated.

## 5. Portable projection at generation time

A Portable Projection is the protocol's central artifact. It is not an employment file, a transcript summary, or an archive. It is a purpose-limited derivative intended to preserve capability while excluding protected facts.

Generation time is essential. Waiting until resignation makes the task both harder and less trustworthy. Years of material must be reconstructed, classifications are missing, contributors may be unavailable, and the person requesting export has an obvious conflict of interest. If a candidate projection is produced when the event occurs, it can use the contemporaneous agreement, contributor list, purpose, and policy version. It can also be reviewed while the relevant people still understand the context.

A production projection pipeline should minimize its input before transformation; remove direct identifiers and secrets; generalize organizations, products, times, quantities, and unique incidents; detect rare combinations that permit reconstruction; test whether the result reveals a protected decision; attach attestations; and quarantine uncertain outputs. Export must trigger a new evaluation because a projection safe inside one environment can become identifying when combined with external information.

The draft schemas represent the output and its checks, not a claim that de-identification is solved. The reference demo intentionally uses synthetic data and a narrow allowlist of capability text. It demonstrates routing and conformance, not semantic privacy. Production deployment requires domain-specific leakage models, red-team evaluation, human review paths, and measurable residual-risk thresholds.

Portable does not mean unrestricted. A person may be allowed to read and invoke a projection in a private knowledge system without permission to publish it, train a public model on it, commercialize it, or delegate it. Keeping operations separate prevents a broad word such as access from silently authorizing every downstream use.

## 6. Joint Context Escrow

Joint context creates the hardest fairness problem because multiple people can have legitimate but unequal interests. Requiring unanimity for every operation gives an unrelated participant a permanent veto. Allowing a simple majority can expose a minority contributor. Awarding the object to a principal contributor rewards hierarchy rather than provenance.

CRPP uses affected-contributor authorization. A person can object only where their contribution, privacy, contractual responsibility, or other protected interest is implicated. An unrelated participant cannot block an independently attributable object. A majority cannot authorize an output that reveals a sensitive minority contribution without that contributor's approval. Third-party controllers remain independent of the internal vote.

When no agreement authorizes raw copying, inseparable joint context enters Joint Context Escrow. The default policy is deny-raw-copy. A later grant may authorize read access, time-limited invocation, or a new projection under specified purposes, time bounds, use counts, output schemas, and review conditions. Compute-to-data is preferred where useful: approved code or an agent can operate near the protected context, while only an evaluated output leaves the escrow boundary.

Escrow is not merely a database table. A durable implementation needs an independent operator model, authenticated decisions, tamper-evident logs, availability commitments, succession rules, revocation checks, output inspection, and a remedy when the operator fails. CRPP currently specifies the policy objects and conservative behavior but does not certify an escrow operator.

## 7. Rights are operation-specific

Many data systems use one broad permission called access. CRPP decomposes authority into at least eight operations: `read`, `copy`, `project`, `invoke`, `train`, `publish`, `commercialize`, and `delegate`. Implementations may extend the vocabulary through a reviewed proposal, but they must not infer one operation from another.

A read grant does not authorize copying. An invocation grant can permit a model to answer a bounded question without revealing raw context. A projection grant permits creation of a derivative but does not guarantee that the derivative will pass checks. Training can be prohibited even when private reading is allowed. Publication, commercialization, and delegation require explicit authority.

Every grant has a subject, purpose, start, expiry, and revocation status. Runtime enforcement must re-evaluate those constraints rather than trusting a stale token. Audit events should record the decision, rule identifiers, actor, object commitments, and time without reproducing denied content. Logs themselves are protected assets; verbose error messages can become a side channel.

This approach does not settle every legal entitlement. It provides a common language in which parties, products, auditors, and regulators can observe that different operations were considered separately. Legal agreements can incorporate or override protocol defaults where law permits, but an implementation must disclose the policy profile it enforces.

## 8. Threat and incentive model

The protocol must be evaluated against both technical attackers and institutional incentives. A malicious worker may try to encode customer names or roadmap facts inside a supposed capability. A company may classify private life as work context or make projections useless by excessive generalization. A majority may expose a minority. A third party may be omitted from provenance. An escrow service may leak raw data. An old release may be silently rewritten.

Controls include purpose limitation, provenance, input minimization, conservative classification, leakage checks, quarantine, affected-contributor approval, independent third-party priority, operation-specific grants, runtime expiry and revocation, minimal audit records, immutable releases, and conformance fixtures. The current [threat model](THREAT_MODEL.md) maps these controls to stable rule identifiers.

The incentive goal is not to give every party everything. It is to make honest contribution safer. A company gains a complete and better-governed business record, clearer provenance, and reduced pressure for shadow exports. A person gains continuity of methods and tool skill without carrying confidential files. Collaborators gain protection against unilateral copying. Third parties retain restrictions that cannot be voted away by insiders.

There is no purely technical definition of a fair projection. Over-generalization can destroy economic value; under-generalization can leak protected facts. The protocol therefore requires visible policy versions, attestations, and reviewable outcomes rather than presenting an opaque model judgment as objective truth. Conformance means an implementation follows the declared CRPP rules. It does not mean a court has approved the result or that no contextual harm can occur.

## 9. Running code and independent verification

World-scale protocols become credible when independent parties can implement and test them. CRPP publishes JSON Schemas for agreements, context objects, portable projections, joint context, access grants, attestations, revocations, and audit events. Stable rule identifiers connect normative text to machine outcomes. Valid, invalid, and fairness scenarios make important defaults executable.

The reference employee-exit demo accepts a synthetic event and produces four governed outputs: a company context object, per-person portable projections, a joint escrow object, and a commitment-linked audit sequence. Each output is validated against the public schemas. Repeated execution produces identical results for the same input. The router rejects non-synthetic inputs because the demo is not a production privacy service.

The next credibility threshold is not more repository stars. It is a second implementation that does not reuse the reference routing code, followed by interoperable test vectors and a pilot that uses synthetic or legally authorized data. A future conformance mark must identify the exact protocol version, policy profile, schemas, test suite, and implementation build. It must never imply legal certification.

Protocol evolution uses Context Enhancement Proposals. Proposals move through public states, disclose affected actors and conflicts of interest, describe compatibility and migration, include security and fairness analysis, and provide implementation evidence. Published protocol releases are immutable. Corrections appear as errata or a new version.

## 10. Governance, legal boundaries, and roadmap

CRPP is incubated in a personal GitHub account, but the intended protocol cannot depend on a founder, vendor, or sponsor. Interim maintainers may operate the repository during incubation. Neutral transfer requires at least a second independent owner, a functioning proposal process, public records, and a Technical Steering Committee representing workers, organizations, implementers, privacy or law, and public-interest research. Funding must not purchase protocol votes or conformance status.

The protocol separates technical conformance from legal validity. Context can implicate employment duties, confidentiality, trade-secret law, copyright, privacy, database rights, sector regulation, collective bargaining, and contractual restrictions. Those rules vary. CRPP provides model objects and defaults but is not legal advice, a model employment contract, or a substitute for jurisdiction-specific review. A production adoption should document applicable law, controllers, appeal routes, retention, evidence standards, and remedies.

The immediate roadmap is intentionally concrete: improve the whitepaper through expert review; publish the deterministic reference demo; add a proposal registry and Last Call process; expand invalid fixtures until each threat has a test; define an interoperability profile; obtain one independent implementation; conduct a synthetic pilot; and only then consider a release candidate or certification program.

The long-term claim is larger but testable. When work becomes AI memory, society does not need to choose between corporate amnesia for the person and uncontrolled copying from the company. Business facts can remain where they are legitimately governed. Capability can travel as a separate, evaluated artifact. Joint memory can remain jointly governed. That is the new default CRPP is trying to make implementable.

### Primary references

- Satoshi Nakamoto, [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf).
- IETF, [Guide to the IETF standards process](https://www.ietf.org/process/process/).
- Creative Commons, [The three layers of a Creative Commons license](https://creativecommons.org/legal-code-defined/).
- CERN, [The birth and open release of the World Wide Web](https://home.cern/science/computing/the-birth-of-the-web/).
- GNU Project, [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html).
- CRPP, [Normative draft](SPEC.md), [threat model](THREAT_MODEL.md), and [governance](GOVERNANCE.md).
