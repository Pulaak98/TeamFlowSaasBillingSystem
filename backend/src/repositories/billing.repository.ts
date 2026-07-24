import { db } from "../db/database.js";

export async function getOrganization(id: number) {
  return db
    .selectFrom("organizations")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
}

export async function countActiveMembers(organizationId: number) {
  const result = await db
    .selectFrom("organization_members")
    .select(({ fn }) => [
      fn.count("id").as("count"),
    ])
    .where("organization_id", "=", organizationId)
    .where("status", "=", "active")
    .executeTakeFirst();

  return Number(result?.count ?? 0);
}

export async function getCreditUsage(organizationId: number) {
  const result = await db
    .selectFrom("credit_usage")
    .select(({ fn }) => [
      fn.sum<number>("amount").as("total"),
    ])
    .where("organization_id", "=", organizationId)
    .executeTakeFirst();

  return Number(result?.total ?? 0);
}

export async function getInvoices(organizationId: number) {
  return db
    .selectFrom("invoices")
    .selectAll()
    .where("organization_id", "=", organizationId)
    .orderBy("created_at", "desc")
    .execute();
}