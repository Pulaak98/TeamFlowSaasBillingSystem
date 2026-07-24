import { db } from "../db/database.js";

export async function findOrganizationById(id: number) {
  return db
    .selectFrom("organizations")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
}