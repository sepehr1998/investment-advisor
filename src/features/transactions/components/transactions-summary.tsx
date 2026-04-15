import { Briefcase } from 'lucide-react';
import type { Transaction } from '../../../api/generated';
import { formatDate } from '../../../lib/formatters';
import { TRANSACTION_TYPE_LABELS } from '../../../lib/constants';

interface TransactionsSummaryProps {
  portfolioName: string | null | undefined;
  currency: string | null | undefined;
  transactions: Transaction[];
}

export function TransactionsSummary({
  portfolioName,
  currency,
  transactions,
}: TransactionsSummaryProps) {
  const typeCounts: Record<string, number> = {};
  for (const t of transactions) {
    const code = t.typeCode ?? 'OTHER';
    typeCounts[code] = (typeCounts[code] ?? 0) + 1;
  }
  const typeBreakdown = Object.entries(typeCounts)
    .map(([code, count]) => {
      const label = (TRANSACTION_TYPE_LABELS[code] ?? code).toLowerCase();
      return `${count} ${label}${count !== 1 ? 's' : ''}`;
    })
    .join(', ');

  const dates = transactions
    .map((t) => t.transactionDate ?? t.effectiveTransactionDate)
    .filter((d): d is string => d != null)
    .sort();
  const dateRange =
    dates.length > 0
      ? `${formatDate(dates[0])} – ${formatDate(dates[dates.length - 1])}`
      : '—';

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Briefcase className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {portfolioName ?? 'Unnamed Portfolio'}
          </h2>
          <p className="text-sm text-slate-500">{currency ?? '—'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 border-t border-slate-100 px-6 py-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-slate-400">Transactions</p>
          <p className="mt-1 font-medium text-slate-900">{transactions.length}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Breakdown</p>
          <p className="mt-1 font-medium text-slate-900">{typeBreakdown || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Date Range</p>
          <p className="mt-1 font-medium text-slate-900">{dateRange}</p>
        </div>
      </div>
    </div>
  );
}
