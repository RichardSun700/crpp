import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const ignored = new Set([".git", "node_modules", "coverage", "dist"]);
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

const files = await walk(root);
const textFiles = files.filter((file) => /\.(?:json|md|mjs|yml|yaml)$/.test(file) || /(?:LICENSE|NOTICE|CODEOWNERS)$/.test(file));

for (const file of textFiles) {
  const relative = path.relative(root, file);
  const content = await readFile(file, "utf8");
  if (/\/Users\/[A-Za-z0-9._-]+\//.test(content)) failures.push(`${relative}: local absolute path`);
  if (/-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/.test(content)) failures.push(`${relative}: private key material`);
  if (/(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}/.test(content)) failures.push(`${relative}: GitHub credential pattern`);
  if (/\b(?:sk-[A-Za-z0-9_-]{20,})\b/.test(content)) failures.push(`${relative}: API credential pattern`);
  if (/\r/.test(content)) failures.push(`${relative}: CRLF line ending`);
  if (file.endsWith(".json")) {
    try { JSON.parse(content); } catch (error) { failures.push(`${relative}: invalid JSON: ${error.message}`); }
  }
}

const [english, chinese] = await Promise.all([
  readFile(path.join(root, "SPEC.md"), "utf8"),
  readFile(path.join(root, "SPEC.zh-CN.md"), "utf8"),
]);
const rulePattern = /CRPP-[A-Z]+-\d{3}/g;
const englishRules = english.match(rulePattern) ?? [];
const chineseRules = chinese.match(rulePattern) ?? [];
if (JSON.stringify(englishRules) !== JSON.stringify(chineseRules)) failures.push("SPEC.md and SPEC.zh-CN.md rule IDs differ");

for (const file of files.filter((candidate) => candidate.endsWith(".md"))) {
  const content = await readFile(file, "utf8");
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  for (const link of links) {
    if (/^(?:https?:|mailto:|#)/.test(link)) continue;
    const target = path.resolve(path.dirname(file), link.split("#", 1)[0]);
    try { await readFile(target); } catch { failures.push(`${path.relative(root, file)}: missing local link ${link}`); }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`CRPP lint passed: ${files.length} files, ${englishRules.length} aligned rule references.`);
}
