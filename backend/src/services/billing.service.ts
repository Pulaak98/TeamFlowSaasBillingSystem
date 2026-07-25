import * as billingRepository from "../repositories/billing.repository.js";
import { AppError } from "../utils/AppError.js";
import { calculateInvoice } from "../utils/billing-calculator.js";

function getDateParts(date: Date | string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new AppError("Invalid billing start date.", 400);
  }

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

  const invoice = calculateInvoice(
    organization,
    activeMembers,
    credits,
  );

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

    // Keep these top-level fields because the frontend uses them.
    activeMembers,
    includedMembers: organization.included_members,

    creditsUsed: credits,
    includedCredits: organization.included_credits,

    extraMembers: invoice.extraMembers,
    extraCredits: invoice.extraCredits,

    breakdown: invoice.breakdown,

    totalAmount: invoice.totalAmount,
  };
}

export async function getInvoices(organizationId: number) {
  return billingRepository.getInvoices(organizationId);
}