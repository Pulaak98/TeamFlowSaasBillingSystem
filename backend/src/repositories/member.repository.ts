import { db } from "../db/database.js";

export async function getMembersByOrganizationId(
  organizationId: number
) {
  return await db
    .selectFrom("organization_members")
    .selectAll()
    .where("organization_id", "=", organizationId)
    .execute();
}

export async function createMember(data: {
  organization_id: number;
  full_name: string;
  email: string;
  status: "active" | "inactive";
}) {
  return await db
    .insertInto("organization_members")
    .values(data)
    .returningAll()
    .executeTakeFirst();
}

export async function findMemberById(
  organizationId: number,
  memberId: number,
) {
  return db
    .selectFrom("organization_members")
    .selectAll()
    .where("id", "=", memberId)
    .where("organization_id", "=", organizationId)
    .executeTakeFirst();
}

export async function updateMemberStatus(
  organizationId: number,
  memberId: number,
  status: "active" | "inactive",
) {
  return db
    .updateTable("organization_members")
    .set({
      status,
    })
    .where("id", "=", memberId)
    .where("organization_id", "=", organizationId)
    .returningAll()
    .executeTakeFirst();
}