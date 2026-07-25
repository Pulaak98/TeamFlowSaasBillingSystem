export interface BillingBreakdown {
  basePrice: number;

  includedMembers: number;
  activeMembers: number;
  extraMembers: number;
  extraMemberPrice: number;
  extraMemberCost: number;

  includedCredits: number;
  creditsUsed: number;
  extraCredits: number;
  extraCreditPrice: number;
  extraCreditCost: number;
}

export interface UpcomingInvoice {
  organizationId: number;
  organizationName: string;

  billingPeriodStart: string;
  billingPeriodEnd: string;

  activeMembers: number;
  includedMembers: number;
  extraMembers: number;

  creditsUsed: number;
  includedCredits: number;
  extraCredits: number;

  breakdown: BillingBreakdown;

  totalAmount: number;
}
export interface Invoice {
  id: number;
  organization_id: number;
  billing_period_start: string;
  billing_period_end: string;
  breakdown: BillingBreakdown;
  total_amount: string;
  created_at: string;
}