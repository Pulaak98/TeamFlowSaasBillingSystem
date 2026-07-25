export function calculateInvoice(
  organization: {
    base_price: number | string;
    included_members: number;
    included_credits: number;
    extra_member_price: number | string;
    extra_credit_price: number | string;
  },
  activeMembers: number,
  creditsUsed: number,
) {
  const extraMembers = Math.max(
    0,
    activeMembers - organization.included_members,
  );

  const extraCredits = Math.max(0, creditsUsed - organization.included_credits);

  const extraMemberCost =
    extraMembers * Number(organization.extra_member_price);

  // Extra credits are billed per 1,000-credit block.
  // Partial blocks are rounded up.
  const extraCreditUnits = Math.ceil(extraCredits / 1000);

  const extraCreditCost =
    extraCreditUnits * Number(organization.extra_credit_price);

  const totalAmount =
    Number(organization.base_price) + extraMemberCost + extraCreditCost;

  const breakdown = {
    basePrice: Number(organization.base_price),

    includedMembers: organization.included_members,
    activeMembers,
    extraMembers,
    extraMemberPrice: Number(organization.extra_member_price),
    extraMemberCost,

    includedCredits: organization.included_credits,
    creditsUsed,
    extraCredits,
    extraCreditPrice: Number(organization.extra_credit_price),
    extraCreditUnits,
    extraCreditCost,
  };

  return {
    activeMembers,
    creditsUsed,
    extraMembers,
    extraCredits,
    breakdown,
    totalAmount,
  };
}
