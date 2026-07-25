import type { Invoice } from "../types/billing";

interface InvoiceHistoryProps {
  invoices: Invoice[];
}

function InvoiceHistory({ invoices }: InvoiceHistoryProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900">Past Invoices</h2>
      </div>

      {invoices.length === 0 ? (
        <div className="border-t border-slate-100 p-6 text-sm text-slate-500">
          No invoices yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-t border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-500">
                  Billing period
                </th>
                <th className="px-6 py-3 font-medium text-slate-500">Total</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-6 py-4 text-slate-700">
                    {formatDate(invoice.billing_period_start)}
                    {" – "}
                    {formatDate(invoice.billing_period_end)}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ${Number(invoice.total_amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default InvoiceHistory;
