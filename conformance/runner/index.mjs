import { readdir, readFile } from "node:fs/promises";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

export const PROTOCOL_VERSION = "0.1.0-draft.1";

const schemaDirectory = new URL("../../schemas/", import.meta.url);
let registryPromise;

function sanitizeErrors(errors = []) {
  return (errors ?? []).map(({ instancePath, schemaPath, keyword, message }) => ({
    instancePath,
    schemaPath,
    keyword,
    message,
  }));
}

function ruleForFailure(schemaName, errors = []) {
  if (schemaName === "access-grant") return "CRPP-GRANT-001";
  if (schemaName === "portable-projection" && errors.some((error) => error.keyword === "not" || error.keyword === "if")) {
    return "CRPP-PROJECTION-004";
  }
  const fallbacks = {
    attestation: "CRPP-AUDIT-002",
    "audit-event": "CRPP-AUDIT-002",
    "context-agreement": "CRPP-AGREEMENT-003",
    "context-object": "CRPP-CORE-001",
    "joint-context": "CRPP-ESCROW-001",
    revocation: "CRPP-REVOCATION-001",
  };
  return fallbacks[schemaName] ?? "CRPP-CORE-001";
}

async function createRegistry() {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  ajv.addKeyword({ keyword: "x-crpp-rule-ids", schemaType: "array" });

  const names = (await readdir(schemaDirectory)).filter((name) => name.endsWith(".schema.json")).sort();
  const schemas = await Promise.all(names.map(async (name) => JSON.parse(await readFile(new URL(name, schemaDirectory), "utf8"))));
  for (const schema of schemas) ajv.addSchema(schema);

  const publicNames = names.filter((name) => name !== "common.schema.json").map((name) => name.replace(".schema.json", ""));
  const validators = Object.fromEntries(publicNames.map((name) => [
    name,
    ajv.getSchema(`https://crpp.dev/schema/0.1/${name}.schema.json`),
  ]));
  return { publicNames, validators };
}

async function registry() {
  registryPromise ??= createRegistry();
  return registryPromise;
}

export async function validateFixture(fixture) {
  const { publicNames, validators } = await registry();
  if (fixture.operation === "list-schemas") {
    return { protocol_version: PROTOCOL_VERSION, schemas: publicNames };
  }

  const validator = validators[fixture.schema];
  if (!validator) {
    return {
      valid: false,
      protocol_version: PROTOCOL_VERSION,
      rule_ids: ["CRPP-CORE-001"],
      errors: [{ keyword: "unknown-schema", message: "Unknown CRPP schema" }],
    };
  }

  const valid = validator(fixture.data);
  const errors = sanitizeErrors(validator.errors);
  return {
    valid: Boolean(valid),
    protocol_version: PROTOCOL_VERSION,
    rule_ids: valid ? [...(fixture.expected_rule_ids ?? [])] : [ruleForFailure(fixture.schema, errors)],
    errors,
  };
}

function result(decision, ruleIds) {
  return { decision, protocol_version: PROTOCOL_VERSION, rule_ids: ruleIds };
}

export async function decideScenario(input) {
  if (input.context_kind === "projection" && input.projection_checks?.some((status) => status !== "pass")) {
    return result("quarantine", ["CRPP-PROJECTION-004"]);
  }

  if (
    input.context_kind === "projection"
    && input.projection_checks?.length > 0
    && input.projection_checks.every((status) => status === "pass")
    && input.contributors?.length === 1
    && input.contributors[0] === input.requester_id
  ) {
    return result("allow", ["CRPP-DEFAULT-003"]);
  }

  if (input.context_kind === "third_party" && input.third_party_authorized !== true) {
    return result("deny", ["CRPP-THIRD-001"]);
  }

  if (input.grant) {
    if (!input.grant.operations?.includes(input.operation)) {
      return result("deny", ["CRPP-GRANT-003"]);
    }
    const evaluatedAt = Date.parse(input.evaluated_at);
    const startsAt = Date.parse(input.grant.starts_at);
    const expiresAt = Date.parse(input.grant.expires_at);
    if (
      input.grant.revoked === true
      || !Number.isFinite(evaluatedAt)
      || evaluatedAt < startsAt
      || evaluatedAt >= expiresAt
      || input.grant.remaining_uses === 0
    ) {
      return result("deny", ["CRPP-GRANT-002"]);
    }
  }

  if (input.context_kind === "joint") {
    const approvals = new Set(input.approvals ?? []);
    const exposedSensitiveContributor = (input.sensitive_contributors ?? []).some((actorId) => !approvals.has(actorId));
    if (exposedSensitiveContributor) {
      return result("deny", ["CRPP-ESCROW-003"]);
    }
    if (input.agreement == null && input.operation === "copy") {
      return result("deny", ["CRPP-DEFAULT-004"]);
    }
    if (input.operation === "invoke" && input.grant) {
      return result("allow", ["CRPP-GRANT-002", "CRPP-ESCROW-005"]);
    }
  }

  if (input.context_kind === "separable_contribution" && input.contributors?.length === 1 && input.contributors[0] === input.requester_id) {
    if ((input.objections?.length ?? 0) > 0 && (input.provenance_interests?.length ?? 0) === 0) {
      return result("allow", ["CRPP-ESCROW-004"]);
    }
    return result("allow", ["CRPP-DEFAULT-002"]);
  }

  return result("deny", ["CRPP-CORE-001"]);
}
