import { db } from "../db/database.js";

export async function findInvoiceByPeriod(
  organizationId: number,
  billingPeriodStart: string,
  billingPeriodEnd: string,
) {
  return db
    .selectFrom("invoices")
    .selectAll()
    .where("organization_id", "=", organizationId)
    .where("billing_period_start", "=", billingPeriodStart)
    .where("billing_period_end", "=", billingPeriodEnd)
    .executeTakeFirst();
}

export async function createInvoice(data: {
  organization_id: number;
  billing_period_start: string;
  billing_period_end: string;
  breakdown: unknown;
  total_amount: number;
}) {
  return db
    .insertInto("invoices")
    .values(data)
    .returningAll()
    .executeTakeFirstOrThrow();
}