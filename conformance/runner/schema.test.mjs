import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { validateFixture } from "./index.mjs";

const fixtureRoot = new URL("../fixtures/", import.meta.url);

async function loadFixtures(kind) {
  const directory = new URL(`${kind}/`, fixtureRoot);
  const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  return Promise.all(names.map(async (name) => ({
    name,
    value: JSON.parse(await readFile(new URL(name, directory), "utf8")),
  })));
}

test("all eight CRPP object schemas compile", async () => {
  const expected = [
    "access-grant",
    "attestation",
    "audit-event",
    "context-agreement",
    "context-object",
    "joint-context",
    "portable-projection",
    "revocation",
  ];
  const result = await validateFixture({ operation: "list-schemas" });
  assert.deepEqual(result.schemas, expected);
});

test("valid fixtures are accepted with deterministic evidence", async () => {
  for (const fixture of await loadFixtures("valid")) {
    const first = await validateFixture(fixture.value);
    const second = await validateFixture(fixture.value);
    assert.equal(first.valid, true, fixture.name);
    assert.deepEqual(first, second, `${fixture.name} must be deterministic`);
    assert.equal(first.protocol_version, "0.1.0-draft.1");
    assert.deepEqual(first.rule_ids, fixture.value.expected_rule_ids);
  }
});

test("invalid fixtures are rejected with their expected rule IDs", async () => {
  for (const fixture of await loadFixtures("invalid")) {
    const result = await validateFixture(fixture.value);
    assert.equal(result.valid, false, fixture.name);
    assert.ok(result.rule_ids.includes(fixture.value.expected_rule_id), fixture.name);
    assert.ok(result.errors.every((error) => !JSON.stringify(error).includes("SYNTHETIC-SECRET")));
  }
});
