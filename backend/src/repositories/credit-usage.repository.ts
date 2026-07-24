import { db } from "../db/database.js";

export async function findByReferenceId(
  organizationId: number,
  referenceId: string,
) {
  return db
    .selectFrom("credit_usage")
    .selectAll()
    .where("organization_id", "=", organizationId)
    .where("reference_id", "=", referenceId)
    .executeTakeFirst();
}

export async function createCreditUsage(data: {
  organization_id: number;
  amount: number;
  source: string;
  reference_id: string;
}) {
  return db
    .insertInto("credit_usage")
    .values(data)
    .returningAll()
    .executeTakeFirstOrThrow();
}