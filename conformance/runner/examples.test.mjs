import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { decideScenario } from "./index.mjs";

const examples = [
  "individual-contribution",
  "employee-company",
  "joint-project",
  "cross-company-project",
  "post-project-rental",
];

for (const name of examples) {
  test(`synthetic example: ${name}`, async () => {
    const root = new URL(`../../examples/${name}/`, import.meta.url);
    const [readme, raw] = await Promise.all([
      readFile(new URL("README.md", root), "utf8"),
      readFile(new URL("example.json", root), "utf8"),
    ]);
    const example = JSON.parse(raw);
    assert.equal(example.synthetic, true);
    assert.match(readme, /synthetic/i);
    assert.ok(!raw.includes("/Users/"));
    assert.ok(!raw.includes("SYNTHETIC-SECRET"));
    const decision = await decideScenario(example.request);
    assert.equal(decision.decision, example.expected.decision);
    assert.deepEqual(decision.rule_ids, example.expected.rule_ids);
  });
}
