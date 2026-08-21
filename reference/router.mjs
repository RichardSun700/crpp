// SPDX-FileCopyrightText: 2026 CRPP contributors
// SPDX-License-Identifier: Apache-2.0

import { createHash } from "node:crypto";

export const PROTOCOL_VERSION = "0.1.0-draft.1";

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

function commitment(value) {
  const canonicalJson = JSON.stringify(canonicalize(value));
  return `sha256:${createHash("sha256").update(canonicalJson).digest("hex")}`;
}

function requireNonEmptyString(value, field) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${field} must be a non-empty string`);
  }
  return value;
}

function requireStringArray(value, field, minimum = 1) {
  if (!Array.isArray(value) || value.length < minimum || value.some((item) => typeof item !== "string" || item.length === 0)) {
    throw new TypeError(`${field} must contain at least ${minimum} string value(s)`);
  }
  if (new Set(value).size !== value.length) throw new TypeError(`${field} must not contain duplicates`);
  return value;
}

function ensurePortableContentIsSeparated(capabilities, restrictedMarkers) {
  const serialized = JSON.stringify(capabilities).toLocaleLowerCase("en-US");
  for (const marker of restrictedMarkers) {
    if (marker.length > 0 && serialized.includes(marker.toLocaleLowerCase("en-US"))) {
      throw new Error(`portable capability contains a restricted marker: ${marker}`);
    }
  }
}

function auditEvent({ eventId, eventType, actorId, objectIds, decision, ruleIds, occurredAt, previousEventCommitment }) {
  const body = {
    event_id: eventId,
    protocol_version: PROTOCOL_VERSION,
    event_type: eventType,
    actor_id: actorId,
    object_ids: objectIds,
    decision,
    rule_ids: ruleIds,
    occurred_at: occurredAt,
    previous_event_commitment: previousEventCommitment,
  };
  return { ...body, event_commitment: commitment(body) };
}

export function routeSyntheticWorkEvent(input) {
  if (input?.synthetic !== true) {
    throw new Error("The public reference router accepts synthetic input only");
  }

  const eventId = requireNonEmptyString(input.event_id, "event_id");
  const agreementId = requireNonEmptyString(input.agreement_id, "agreement_id");
  const occurredAt = requireNonEmptyString(input.occurred_at, "occurred_at");
  const organizationId = requireNonEmptyString(input.organization_id, "organization_id");
  const creatorId = requireNonEmptyString(input.creator_id, "creator_id");
  const contributors = requireStringArray(input.contributor_ids, "joint context contributors", 2);
  const purpose = requireNonEmptyString(input.purpose, "purpose");
  const escrowControllerId = requireNonEmptyString(input.escrow_controller_id, "escrow_controller_id");

  if (input.company_facts === null || typeof input.company_facts !== "object" || Array.isArray(input.company_facts)) {
    throw new TypeError("company_facts must be an object");
  }
  if (!Array.isArray(input.portable_capabilities) || input.portable_capabilities.length === 0) {
    throw new Error("At least one portable capability is required");
  }

  const restrictedMarkers = requireStringArray(input.restricted_markers, "restricted_markers");
  ensurePortableContentIsSeparated(input.portable_capabilities, restrictedMarkers);

  const companyObjectId = `company:${eventId}`;
  const companyRecord = {
    object_id: companyObjectId,
    revision: 1,
    protocol_version: PROTOCOL_VERSION,
    content_commitment: commitment(input.company_facts),
    authority_domains: ["company"],
    purpose,
    creator_id: creatorId,
    contributor_ids: contributors,
    affected_contributor_ids: contributors,
    agreement_basis: { agreement_id: agreementId },
    permitted_operations: ["read", "copy", "invoke"],
    created_at: occurredAt,
    extensions: {
      synthetic: true,
      organization_id: organizationId,
      synthetic_payload: input.company_facts,
    },
  };

  const sourceCommitment = commitment({ event_id: eventId, company_facts: input.company_facts });
  const portableProjections = input.portable_capabilities.map((capability, index) => {
    const beneficiaryId = requireNonEmptyString(capability?.beneficiary_id, "portable capability beneficiary_id");
    if (!contributors.includes(beneficiaryId)) {
      throw new Error(`portable capability beneficiary is not a contributor: ${beneficiaryId}`);
    }
    return {
      projection_id: `projection:${eventId}:${String(index + 1).padStart(2, "0")}`,
      protocol_version: PROTOCOL_VERSION,
      beneficiary_id: beneficiaryId,
      capability_category: requireNonEmptyString(capability.capability_category, "portable capability category"),
      content: requireNonEmptyString(capability.content, "portable capability content"),
      source_commitment: sourceCommitment,
      generated_at: occurredAt,
      policy_version: "crpp-reference-projection-0.1",
      state: "approved",
      checks: [
        { check_id: "synthetic-input", status: "pass" },
        { check_id: "restricted-marker", status: "pass" },
        { check_id: "beneficiary-is-contributor", status: "pass" },
        { check_id: "capability-field-present", status: "pass" },
      ],
      allowed_operations: ["read", "project", "invoke"],
      extensions: { synthetic: true },
    };
  });

  const jointContext = {
    joint_context_id: `joint:${eventId}`,
    protocol_version: PROTOCOL_VERSION,
    object_ids: [companyObjectId],
    affected_contributor_ids: contributors,
    escrow_controller_id: escrowControllerId,
    default_policy: "deny-raw-copy",
    allowed_output_operations: ["read", "invoke", "project"],
    created_at: occurredAt,
    extensions: {
      synthetic: true,
      summary: requireNonEmptyString(input.joint_context_summary, "joint_context_summary"),
    },
  };

  const classificationEvent = auditEvent({
    eventId: `audit:${eventId}:01`,
    eventType: "classify",
    actorId: organizationId,
    objectIds: [companyObjectId],
    decision: "record",
    ruleIds: ["CRPP-CORE-001"],
    occurredAt,
    previousEventCommitment: null,
  });
  const projectionEvent = auditEvent({
    eventId: `audit:${eventId}:02`,
    eventType: "project",
    actorId: organizationId,
    objectIds: portableProjections.map(({ projection_id: projectionId }) => projectionId),
    decision: "allow",
    ruleIds: ["CRPP-PROJECTION-004"],
    occurredAt,
    previousEventCommitment: classificationEvent.event_commitment,
  });
  const escrowEvent = auditEvent({
    eventId: `audit:${eventId}:03`,
    eventType: "create",
    actorId: escrowControllerId,
    objectIds: [jointContext.joint_context_id],
    decision: "record",
    ruleIds: ["CRPP-ESCROW-001"],
    occurredAt,
    previousEventCommitment: projectionEvent.event_commitment,
  });

  return {
    protocol_version: PROTOCOL_VERSION,
    synthetic: true,
    company_record: companyRecord,
    portable_projections: portableProjections,
    joint_context: jointContext,
    audit_events: [classificationEvent, projectionEvent, escrowEvent],
  };
}
