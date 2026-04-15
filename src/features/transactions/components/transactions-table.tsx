import type { Transaction } from '../../../api/generated';
import { TransactionRow } from './transaction-row';

interface TransactionsTableProps {
  transactions: Transaction[];
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

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const sorted = [...transactions].sort((a, b) => {
    if (!a.transactionDate) return 1;
    if (!b.transactionDate) return -1;
    return b.transactionDate.localeCompare(a.transactionDate);
  });

  return (
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
          {sorted.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
