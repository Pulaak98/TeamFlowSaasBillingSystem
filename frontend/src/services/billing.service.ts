import { api } from "../api/api";
import type {
  Invoice,
  UpcomingInvoice,
} from "../types/billing";

export function getUpcomingInvoice(
  organizationId: number,
) {
  return api<UpcomingInvoice>(
    `/organizations/${organizationId}/billing/upcoming-invoice`,
  );
}

export function getInvoices(
  organizationId: number,
) {
  return api<Invoice[]>(
    `/organizations/${organizationId}/invoices`,
  );
}