import { useEffect, useState } from "react";

import BillingPlan from "../components/BillingPlan";
import BillingUsage from "../components/BillingUsage";

import InvoiceHistory from "../components/InvoiceHistory";

import { getInvoices, getUpcomingInvoice } from "../services/billing.service";

import type {
  Invoice,
  UpcomingInvoice as UpcomingInvoiceType,
} from "../types/billing";
import UpcomingInvoice from "../components/UpcomingInvoiceCard";

function BillingPage() {
  const organizationId = 1;

  const [upcomingInvoice, setUpcomingInvoice] =
    useState<UpcomingInvoiceType | null>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBilling() {
      try {
        setLoading(true);
        setError(null);

        const [upcoming, pastInvoices] = await Promise.all([
          getUpcomingInvoice(organizationId),
          getInvoices(organizationId),
        ]);

        setUpcomingInvoice(upcoming);
        setInvoices(pastInvoices);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load billing information.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadBilling();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 rounded bg-slate-200" />
            <div className="h-40 rounded-xl bg-white" />
            <div className="h-40 rounded-xl bg-white" />
            <div className="h-64 rounded-xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h1 className="font-semibold text-red-800">
              Unable to load billing
            </h1>

            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!upcomingInvoice) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">Settings</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Billing
          </h1>

          <p className="mt-2 text-slate-500">
            {upcomingInvoice.organizationName}
          </p>

          <p className="mt-2 text-slate-500">
            View your current plan, usage, and invoices.
          </p>
        </div>

        <div className="space-y-6">
          <BillingPlan invoice={upcomingInvoice} />

          <BillingUsage invoice={upcomingInvoice} />

          <UpcomingInvoice invoice={upcomingInvoice} />

          <InvoiceHistory invoices={invoices} />
        </div>
      </div>
    </main>
  );
}

export default BillingPage;
