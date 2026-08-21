#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 CRPP contributors
// SPDX-License-Identifier: Apache-2.0

import { readFile } from "node:fs/promises";
import process from "node:process";
import { routeSyntheticWorkEvent } from "./router.mjs";

const inputPath = process.argv[2] ?? "demo/employee-exit/input.json";

try {
  const input = JSON.parse(await readFile(inputPath, "utf8"));
  const output = routeSyntheticWorkEvent(input);
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown reference-flow error";
  process.stderr.write(`CRPP demo failed: ${message}\n`);
  process.exitCode = 1;
}
