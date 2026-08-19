import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { decideScenario } from "./index.mjs";

const scenarios = JSON.parse(await readFile(
  new URL("../fixtures/scenarios/fairness.json", import.meta.url),
  "utf8",
));

for (const scenario of scenarios) {
  test(`fairness: ${scenario.id}`, async () => {
    const first = await decideScenario(scenario.input);
    const second = await decideScenario(scenario.input);
    assert.deepEqual(first, second, "decisions must be deterministic");
    assert.equal(first.decision, scenario.expected.decision);
    assert.deepEqual(first.rule_ids, scenario.expected.rule_ids);
    assert.equal(first.protocol_version, "0.1.0-draft.1");
    assert.ok(!JSON.stringify(first).includes("SYNTHETIC-SECRET"));
  });
}

test("normative English and Chinese drafts expose the same ordered rule IDs", async () => {
  const [english, chinese] = await Promise.all([
    readFile(new URL("../../SPEC.md", import.meta.url), "utf8"),
    readFile(new URL("../../SPEC.zh-CN.md", import.meta.url), "utf8"),
  ]);
  const pattern = /CRPP-[A-Z]+-\d{3}/g;
  assert.deepEqual(english.match(pattern), chinese.match(pattern));
});
