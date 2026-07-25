import * as billingRepository from "../repositories/billing.repository.js";
import { AppError } from "../utils/AppError.js";

function getDateParts(date: Date | string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new AppError("Invalid billing start date.", 400);
  }

  // PostgreSQL DATE is being returned as a JS Date.
  // Use local date parts so 2026-06-30T18:00:00.000Z
  // becomes July 1 in Bangladesh/local timezone.
  return {
    year: parsedDate.getFullYear(),
    month: parsedDate.getMonth(),
    day: parsedDate.getDate(),
  };
}

function formatDate(
  year: number,
  month: number,
  day: number,
) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day,
  ).padStart(2, "0")}`;
}

export async function getUpcomingInvoice(organizationId: number) {
  const organization =
    await billingRepository.getOrganization(organizationId);

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  const activeMembers =
    await billingRepository.countActiveMembers(organizationId);

  const credits =
    await billingRepository.getCreditUsage(organizationId);

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

  const {
    year,
    month,
    day,
  } = getDateParts(organization.billing_start_date);

  const billingPeriodStart = formatDate(
    year,
    month,
    day,
  );

  // Last day of the billing month
  const endDate = new Date(
    year,
    month + 1,
    0,
  );

  const billingPeriodEnd = formatDate(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );

  return {
    organizationId,
    organizationName: organization.name,

    billingPeriodStart,
    billingPeriodEnd,

    activeMembers,
    includedMembers: organization.included_members,

    extraMembers,

    creditsUsed: credits,
    includedCredits: organization.included_credits,

    extraCredits,

    breakdown: {
      basePrice: Number(organization.base_price),

      includedMembers: organization.included_members,
      activeMembers,
      extraMembers,
      extraMemberPrice: Number(
        organization.extra_member_price,
      ),
      extraMemberCost,

      includedCredits: organization.included_credits,
      creditsUsed: credits,
      extraCredits,
      extraCreditPrice: Number(
        organization.extra_credit_price,
      ),
      extraCreditCost,
    },

    totalAmount: total,
  };
}

export async function getInvoices(organizationId: number) {
  return billingRepository.getInvoices(organizationId);
}