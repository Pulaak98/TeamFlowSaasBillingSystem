import * as organizationRepository from "../repositories/organization.repository.js";
import * as creditUsageRepository from "../repositories/credit-usage.repository.js";
import { AppError } from "../utils/AppError.js";

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
    throw new AppError("Organization not found.", 404);
  }

  const existing = await creditUsageRepository.findByReferenceId(
    organizationId,
    body.referenceId,
  );

  if (existing) {
    throw new AppError("Reference ID already exists.", 409);
  }

  return creditUsageRepository.createCreditUsage({
    organization_id: organizationId,
    amount: body.amount,
    source: body.source,
    reference_id: body.referenceId,
  });
}
