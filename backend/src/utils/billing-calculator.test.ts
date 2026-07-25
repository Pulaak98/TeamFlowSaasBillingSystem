import { describe, expect, it } from "vitest";
import { calculateInvoice } from "./billing-calculator.js";

const acmeOrganization = {
  base_price: 99,
  included_members: 5,
  included_credits: 10_000,
  extra_member_price: 10,
  extra_credit_price: 2,
};

describe("calculateInvoice", () => {
  it("calculates extra member charges correctly", () => {
    const result = calculateInvoice(acmeOrganization, 8, 10_000);

    expect(result.extraMembers).toBe(3);
    expect(result.breakdown.extraMemberCost).toBe(30);
  });

  it("calculates extra credit charges using the round-up rule", () => {
    const result = calculateInvoice(acmeOrganization, 5, 15_001);

    expect(result.extraCredits).toBe(5_001);

    // 5,001 extra credits = 6 billable 1,000-credit blocks
    expect(result.breakdown.extraCreditUnits).toBe(6);
    expect(result.breakdown.extraCreditCost).toBe(12);
  });

  it("calculates the complete Acme invoice correctly", () => {
    const result = calculateInvoice(acmeOrganization, 8, 15_000);

    expect(result.breakdown.basePrice).toBe(99);
    expect(result.breakdown.extraMemberCost).toBe(30);
    expect(result.breakdown.extraCreditCost).toBe(10);
    expect(result.totalAmount).toBe(139);
  });

  it("does not charge overage when usage is within included limits", () => {
    const result = calculateInvoice(acmeOrganization, 5, 10_000);

    expect(result.extraMembers).toBe(0);
    expect(result.extraCredits).toBe(0);
    expect(result.breakdown.extraMemberCost).toBe(0);
    expect(result.breakdown.extraCreditCost).toBe(0);
    expect(result.totalAmount).toBe(99);
  });
});
