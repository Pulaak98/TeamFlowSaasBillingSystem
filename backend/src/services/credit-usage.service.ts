import * as organizationRepository from "../repositories/organization.repository.js";
import * as creditUsageRepository from "../repositories/credit-usage.repository.js";

export async function addCreditUsage(
  organizationId: number,
  body: {
    amount: number;
    source: string;
    referenceId: string;
  },
) {
  const organization =
    await organizationRepository.findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found.");
  }

  const existing =
    await creditUsageRepository.findByReferenceId(
      organizationId,
      body.referenceId,
    );

  if (existing) {
    throw new Error("Reference ID already exists.");
  }

  return creditUsageRepository.createCreditUsage({
    organization_id: organizationId,
    amount: body.amount,
    source: body.source,
    reference_id: body.referenceId,
  });
}