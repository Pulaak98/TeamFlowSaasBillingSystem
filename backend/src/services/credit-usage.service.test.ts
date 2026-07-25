import { describe, expect, it, vi } from "vitest";

import * as organizationRepository from "../repositories/organization.repository.js";
import * as creditUsageRepository from "../repositories/credit-usage.repository.js";

import { addCreditUsage } from "./credit-usage.service.js";

vi.mock("../repositories/organization.repository.js", () => ({
  findOrganizationById: vi.fn(),
}));

vi.mock("../repositories/credit-usage.repository.js", () => ({
  findByReferenceId: vi.fn(),
  createCreditUsage: vi.fn(),
}));

describe("addCreditUsage", () => {
  it("rejects duplicate referenceId", async () => {
    vi.mocked(
      organizationRepository.findOrganizationById,
    ).mockResolvedValue({
      id: 1,
      name: "Acme Inc.",
    } as never);

    vi.mocked(
      creditUsageRepository.findByReferenceId,
    ).mockResolvedValue({
      id: 1,
      organization_id: 1,
      reference_id: "usage-001",
    } as never);

    await expect(
      addCreditUsage(1, {
        amount: 1000,
        source: "api",
        referenceId: "usage-001",
      }),
    ).rejects.toMatchObject({
      message: "Reference ID already exists.",
      status: 409,
    });

    expect(
      creditUsageRepository.createCreditUsage,
    ).not.toHaveBeenCalled();
  });
});
