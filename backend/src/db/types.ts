import { Generated } from "kysely";

export interface OrganizationTable {
  id: Generated<number>;
  name: string;
  base_price: number;
  included_members: number;
  included_credits: number;
  extra_member_price: number;
  extra_credit_price: number;
  billing_start_date: string;
  created_at: Generated<Date>;
}

export interface OrganizationMemberTable {
  id: Generated<number>;
  organization_id: number;
  full_name: string;
  email: string;
  status: "active" | "inactive";
  created_at: Generated<Date>;
}

export interface CreditUsageTable {
  id: Generated<number>;
  organization_id: number;
  amount: number;
  source: string;
  reference_id: string;
  created_at: Generated<Date>;
}

export interface InvoiceTable {
  id: Generated<number>;
  organization_id: number;
  billing_period_start: string;
  billing_period_end: string;
  breakdown: unknown;
  total_amount: number;
  created_at: Generated<Date>;
}

export interface Database {
  organizations: OrganizationTable;
  organization_members: OrganizationMemberTable;
  credit_usage: CreditUsageTable;
  invoices: InvoiceTable;
}
