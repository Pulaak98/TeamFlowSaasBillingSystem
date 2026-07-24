import * as billingRepository from "../repositories/billing.repository.js";

export async function getUpcomingInvoice(
  organizationId: number,
) {
  const organization =
    await billingRepository.getOrganization(organizationId);

  if (!organization) {
    throw new Error("Organization not found.");
  }

  const activeMembers =
    await billingRepository.countActiveMembers(
      organizationId,
    );

  const credits =
    await billingRepository.getCreditUsage(
      organizationId,
    );

  const extraMembers = Math.max(
    0,
    activeMembers - organization.included_members,
  );

  const extraCredits = Math.max(
    0,
    credits - organization.included_credits,
  );

  const extraMemberCost =
    extraMembers * Number(organization.extra_member_price);

  const extraCreditCost =
    extraCredits * Number(organization.extra_credit_price);

  const total =
    Number(organization.base_price) +
    extraMemberCost +
    extraCreditCost;

  return {
    organizationId,

    billingPeriodStart:
      organization.billing_start_date,

    activeMembers,

    includedMembers:
      organization.included_members,

    extraMembers,

    creditsUsed: credits,

    includedCredits:
      organization.included_credits,

    extraCredits,

    breakdown: {
      basePrice: Number(
        organization.base_price,
      ),

      extraMemberCost,

      extraCreditCost,
    },

    totalAmount: total,
  };
}

export async function getInvoices(
  organizationId: number,
) {
  return billingRepository.getInvoices(
    organizationId,
  );
}