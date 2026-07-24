import * as billingRepository from "../repositories/billing.repository.js";
import { AppError } from "../utils/AppError.js";
import { calculateInvoice } from "./billing-calculator.js";

export async function getUpcomingInvoice(organizationId: number) {
  const organization = await billingRepository.getOrganization(organizationId);

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  const activeMembers =
    await billingRepository.countActiveMembers(organizationId);

  const creditsUsed = await billingRepository.getCreditUsage(organizationId);

  const invoice = calculateInvoice(organization, activeMembers, creditsUsed);

  return {
    organizationId,

    billingPeriodStart: organization.billing_start_date,

    activeMembers: invoice.activeMembers,

    includedMembers: organization.included_members,

    extraMembers: invoice.extraMembers,

    creditsUsed: invoice.creditsUsed,

    includedCredits: organization.included_credits,

    extraCredits: invoice.extraCredits,

    breakdown: invoice.breakdown,

    totalAmount: invoice.totalAmount,
  };
}

export async function getInvoices(organizationId: number) {
  return billingRepository.getInvoices(organizationId);
}
