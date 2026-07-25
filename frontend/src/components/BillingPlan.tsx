import type { UpcomingInvoice } from "../types/billing";

interface BillingPlanProps {
  invoice: UpcomingInvoice;
}

function BillingPlan({ invoice }: BillingPlanProps) {
  const { breakdown } = invoice;

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">
        Current Plan
      </h2>

      <div className="mt-4">
        <p className="text-3xl font-bold text-slate-900">
          ${breakdown.basePrice.toFixed(2)}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Base monthly price
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Included members
          </p>
          <p className="mt-1 text-xl font-semibold">
            {breakdown.includedMembers}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Included credits
          </p>
          <p className="mt-1 text-xl font-semibold">
            {breakdown.includedCredits.toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
}

export default BillingPlan;