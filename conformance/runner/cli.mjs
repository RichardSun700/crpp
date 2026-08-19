import { readdir, readFile } from "node:fs/promises";
import { decideScenario, validateFixture } from "./index.mjs";

const root = new URL("../fixtures/", import.meta.url);
const results = [];

for (const kind of ["valid", "invalid"]) {
  const directory = new URL(`${kind}/`, root);
  const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  for (const name of names) {
    const fixture = JSON.parse(await readFile(new URL(name, directory), "utf8"));
    const result = await validateFixture(fixture);
    const expected = kind === "valid";
    results.push({ id: `${kind}/${name}`, pass: result.valid === expected, result });
  }
}

const scenarios = JSON.parse(await readFile(new URL("scenarios/fairness.json", root), "utf8"));
for (const scenario of scenarios) {
  const result = await decideScenario(scenario.input);
  results.push({
    id: `scenario/${scenario.id}`,
    pass: result.decision === scenario.expected.decision
      && JSON.stringify(result.rule_ids) === JSON.stringify(scenario.expected.rule_ids),
    result,
  });
}

const failed = results.filter((entry) => !entry.pass);
console.log(JSON.stringify({
  protocol_version: "0.1.0-draft.1",
  total: results.length,
  passed: results.length - failed.length,
  failed: failed.length,
  results,
}, null, 2));

if (failed.length > 0) process.exitCode = 1;
