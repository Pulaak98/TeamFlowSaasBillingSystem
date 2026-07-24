import * as memberRepository from "../repositories/member.repository.js";
import * as organizationRepository from "../repositories/organization.repository.js";

export async function getMembers(organizationId: number) {
  return await memberRepository.getMembersByOrganizationId(organizationId);
}

export async function addMember(
  organizationId: number,
  body: {
    fullName: string;
    email: string;
    status: "active" | "inactive";
  },
) {
  const organization =
    await organizationRepository.findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found.");
  }
  return await memberRepository.createMember({
    organization_id: organizationId,
    full_name: body.fullName,
    email: body.email,
    status: body.status,
  });
}
