import type { UpcomingInvoice } from "../types/billing";

interface BillingUsageProps {
  invoice: UpcomingInvoice;
}

function BillingUsage({ invoice }: BillingUsageProps) {
  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      },
    );
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">
        Current Usage
      </h2>

      <div className="mt-5">
        <p className="text-sm text-slate-500">
          Billing period
        </p>

        <p className="mt-1 font-medium text-slate-900">
          {formatDate(invoice.billingPeriodStart)}{" "}
          –{" "}
          {formatDate(invoice.billingPeriodEnd)}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Active members
          </p>

          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {invoice.activeMembers}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {invoice.includedMembers} included
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Credits used
          </p>

          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {invoice.creditsUsed.toLocaleString()}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {invoice.includedCredits.toLocaleString()} included
          </p>
        </div>
      </div>
    </section>
  );
}

export default BillingUsage;