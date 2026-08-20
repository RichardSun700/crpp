import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../../", import.meta.url);

async function text(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
}

test("the public front door leads with the human conflict and three adoption paths", async () => {
  const [english, chinese] = await Promise.all([text("README.md"), text("README.zh-CN.md")]);

  assert.match(english, /^# When Work Becomes AI Memory, Who Owns It\?/m);
  assert.match(english, /Carry the capability\. Not the secrets\./);
  assert.match(english, /\[Read the whitepaper\]\(WHITEPAPER\.md\)/i);
  assert.match(english, /\[Run the demo\]\(QUICKSTART\.md\)/i);
  assert.match(english, /\[Adopt CRPP\]\(ADOPT\.md\)/i);

  assert.match(chinese, /^# 当工作变成 AI 记忆，它属于谁？/m);
  assert.match(chinese, /带走能力，不带走秘密。/);
  assert.match(chinese, /WHITEPAPER\.zh-CN\.md/);
  assert.match(chinese, /QUICKSTART\.md/);
  assert.match(chinese, /ADOPT\.md/);
});

test("the bilingual whitepapers are substantial, aligned, and explicit about limits", async () => {
  const [english, chinese] = await Promise.all([text("WHITEPAPER.md"), text("WHITEPAPER.zh-CN.md")]);
  const englishSections = [...english.matchAll(/^## ([0-9]+)\. /gm)].map((match) => match[1]);
  const chineseSections = [...chinese.matchAll(/^## ([0-9]+)\. /gm)].map((match) => match[1]);

  assert.deepEqual(englishSections, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  assert.deepEqual(chineseSections, englishSections);
  assert.ok(english.length > 9_000, "English whitepaper should carry the full argument");
  assert.ok(chinese.length > 6_000, "Chinese whitepaper should carry the full argument");
  assert.doesNotMatch(english, /[\u3400-\u9fff]/u);
  assert.match(english, /not legal advice/i);
  assert.match(chinese, /不构成法律意见/);
  assert.match(english, /company|organization/i);
  assert.match(english, /worker|person/i);
  assert.match(english, /joint context/i);
  assert.match(english, /threat model/i);
});

test("adoption, implementation, proposal, and licensing paths are explicit", async () => {
  const [quickstart, adopt, implementations, proposals, changelog, packageJson, reuse, license] = await Promise.all([
    text("QUICKSTART.md"),
    text("ADOPT.md"),
    text("IMPLEMENTATIONS.md"),
    text("proposals/README.md"),
    text("CHANGELOG.md"),
    text("package.json"),
    text("REUSE.toml"),
    text("LICENSE"),
  ]);

  assert.match(quickstart, /npm run demo/);
  assert.match(quickstart, /synthetic/i);
  assert.match(adopt, /pilot/i);
  assert.match(adopt, /not.*certif/i);
  assert.match(implementations, /Reference implementation/i);
  for (const status of ["Idea", "Draft", "Review", "Last Call", "Accepted", "Implemented", "Rejected", "Withdrawn", "Superseded"]) {
    assert.match(proposals, new RegExp(`\\b${status}\\b`));
  }
  assert.match(changelog, /## 0\.1\.0-draft\.1 — 2026-08-19/);

  const manifest = JSON.parse(packageJson);
  assert.equal(manifest.scripts.demo, "node reference/cli.mjs demo/employee-exit/input.json");
  assert.equal(manifest.bin.crpp, "reference/cli.mjs");
  assert.match(reuse, /Apache-2\.0/);
  assert.match(reuse, /CC-BY-4\.0/);
  assert.match(license, /Apache License/);
});
