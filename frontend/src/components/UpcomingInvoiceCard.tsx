import type { UpcomingInvoice } from "../types/billing";

interface UpcomingInvoiceCardProps {
  invoice: UpcomingInvoice;
}

function UpcomingInvoiceCard({
  invoice,
}: UpcomingInvoiceCardProps) {
  const { breakdown } = invoice;

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Upcoming Invoice
        </h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Preview
        </span>
      </div>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            Base price
          </span>

          <span className="font-medium">
            ${breakdown.basePrice.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            Extra members ({breakdown.extraMembers})
          </span>

          <span className="font-medium">
            ${breakdown.extraMemberCost.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            Extra credits (
            {breakdown.extraCredits.toLocaleString()}
            )
          </span>

          <span className="font-medium">
            ${breakdown.extraCreditCost.toFixed(2)}
          </span>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-900">
              Estimated total
            </span>

            <span className="text-xl font-bold text-slate-900">
              ${invoice.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingInvoiceCard;