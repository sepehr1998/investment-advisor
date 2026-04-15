import { User } from 'lucide-react';

interface PortfolioSummaryProps {
  contactName: string | null | undefined;
  contactId: string;
  portfolioCount: number;
}

export function PortfolioSummary({
  contactName,
  contactId,
  portfolioCount,
}: PortfolioSummaryProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {contactName ?? 'Unnamed Contact'}
            </h2>
            <p className="text-sm text-slate-500">ID: {contactId}</p>
          </div>
        </div>
        <span className="rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
          Active
        </span>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <div>
          <p className="text-xs text-slate-500">Number of Portfolios</p>
          <p className="mt-1 font-medium text-slate-900">{portfolioCount}</p>
        </div>
      </div>
    </div>
  );
}
