import * as billingRepository from "../repositories/billing.repository.js";
import * as invoiceRepository from "../repositories/invoice.repository.js";
import { AppError } from "../utils/AppError.js";

import { calculateInvoice } from "./billing-calculator.js";

export async function generateInvoice(organizationId: number) {
  const organization = await billingRepository.getOrganization(organizationId);

  if (!organization) {
    throw new AppError("Organization not found.", 404);
  }

  const activeMembers =
    await billingRepository.countActiveMembers(organizationId);

  const creditsUsed = await billingRepository.getCreditUsage(organizationId);

  const invoice = calculateInvoice(organization, activeMembers, creditsUsed);

  const billingPeriodStart = new Date(organization.billing_start_date);

  const billingPeriodEnd = new Date(billingPeriodStart);

  billingPeriodEnd.setMonth(billingPeriodEnd.getMonth() + 1);

  billingPeriodEnd.setDate(billingPeriodEnd.getDate() - 1);

  const start = billingPeriodStart.toISOString().split("T")[0];

  const end = billingPeriodEnd.toISOString().split("T")[0];

  const existing = await invoiceRepository.findInvoiceByPeriod(
    organizationId,
    start,
    end,
  );

  if (existing) {
    throw new AppError(
      "Invoice already generated for this billing period.",
      409,
    );
  }

  const created = await invoiceRepository.createInvoice({
    organization_id: organizationId,
    billing_period_start: start,
    billing_period_end: end,
    breakdown: invoice.breakdown,
    total_amount: invoice.totalAmount,
  });

  console.log(`Invoice email would be sent to organization ${organizationId}`);

  return created;
}
