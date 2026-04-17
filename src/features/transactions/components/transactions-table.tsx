import { useMemo, memo } from 'react';
import type { Transaction } from '../../../api/generated';
import { TransactionRow } from './transaction-row';
import { Pagination } from '../../../components/ui/pagination';

interface TransactionsTableProps {
  transactions: Transaction[];
  page: number;
  onPageChange: (page: number) => void;
}

const HEADERS: { label: string; align: 'left' | 'right' }[] = [
  { label: 'Date', align: 'left' },
  { label: 'Type', align: 'left' },
  { label: 'Security', align: 'left' },
  { label: 'ISIN', align: 'left' },
  { label: 'Price', align: 'right' },
  { label: 'Currency', align: 'left' },
  { label: 'Status', align: 'left' },
];

const PAGE_SIZE = 20;

export const TransactionsTable = memo(function TransactionsTable({
  transactions,
  page,
  onPageChange,
}: TransactionsTableProps) {
  const sorted = useMemo(
    () =>
      [...transactions].sort((a, b) => {
        if (!a.transactionDate) return 1;
        if (!b.transactionDate) return -1;
        return b.transactionDate.localeCompare(a.transactionDate);
      }),
    [transactions]
  );

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handlePageChange(p: number) {
    onPageChange(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {HEADERS.map(({ label, align }) => (
                <th
                  key={label}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-${align}`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
});
