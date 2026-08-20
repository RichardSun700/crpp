import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { routeSyntheticWorkEvent } from "../../reference/router.mjs";
import { validateFixture } from "./index.mjs";

const inputUrl = new URL("../../demo/employee-exit/input.json", import.meta.url);

async function loadInput() {
  return JSON.parse(await readFile(inputUrl, "utf8"));
}

test("the employee-exit reference flow creates four governed outputs", async () => {
  const input = await loadInput();
  const output = routeSyntheticWorkEvent(input);

  assert.equal(output.protocol_version, "0.1.0-draft.1");
  assert.equal(output.synthetic, true);
  assert.deepEqual(output.company_record.authority_domains, ["company"]);
  assert.equal(output.portable_projections.length, 2);
  assert.equal(output.joint_context.default_policy, "deny-raw-copy");
  assert.equal(output.audit_events.length, 3);

  const serializedProjections = JSON.stringify(output.portable_projections);
  for (const marker of input.restricted_markers) {
    assert.equal(serializedProjections.includes(marker), false, `projection leaked restricted marker: ${marker}`);
  }
});

test("all reference outputs conform to their CRPP schemas", async () => {
  const output = routeSyntheticWorkEvent(await loadInput());
  const fixtures = [
    { schema: "context-object", data: output.company_record },
    ...output.portable_projections.map((data) => ({ schema: "portable-projection", data })),
    { schema: "joint-context", data: output.joint_context },
    ...output.audit_events.map((data) => ({ schema: "audit-event", data })),
  ];

  for (const fixture of fixtures) {
    const result = await validateFixture(fixture);
    assert.equal(result.valid, true, `${fixture.schema}: ${JSON.stringify(result.errors)}`);
  }
});

test("the reference router is deterministic", async () => {
  const input = await loadInput();
  assert.deepEqual(routeSyntheticWorkEvent(input), routeSyntheticWorkEvent(input));
});

test("the public demo refuses non-synthetic or structurally unsafe inputs", async () => {
  const input = await loadInput();
  assert.throws(() => routeSyntheticWorkEvent({ ...input, synthetic: false }), /synthetic/i);
  assert.throws(() => routeSyntheticWorkEvent({ ...input, portable_capabilities: [] }), /portable capability/i);
  assert.throws(() => routeSyntheticWorkEvent({ ...input, contributor_ids: ["actor_alex"] }), /joint context/i);
});
