import * as memberRepository from "../repositories/member.repository.js";
import * as organizationRepository from "../repositories/organization.repository.js";
import { AppError } from "../utils/AppError.js";

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
    throw new AppError("Organization not found.", 404);
  }

  return await memberRepository.createMember({
    organization_id: organizationId,
    full_name: body.fullName,
    email: body.email,
    status: body.status,
  });
}

export async function updateMemberStatus(
  organizationId: number,
  memberId: number,
  status: "active" | "inactive",
) {
  const organization =
    await organizationRepository.findOrganizationById(organizationId);

  if (!organization) {
    throw new Error("Organization not found.");
  }

  const member = await memberRepository.findMemberById(
    organizationId,
    memberId,
  );

  if (!member) {
    throw new AppError("Member not found.", 404);
  }

  return await memberRepository.updateMemberStatus(
    organizationId,
    memberId,
    status,
  );
}
