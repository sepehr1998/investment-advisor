import { useMemo, memo, useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { Transaction } from '../../../api/generated';
import { TransactionRow } from './transaction-row';
import { Pagination } from '../../../components/ui/pagination';

interface TransactionsTableProps {
  transactions: Transaction[];
  page: number;
  onPageChange: (page: number) => void;
}

type SortColumn = 'date' | 'type' | 'security' | 'isin' | 'price' | 'currency' | 'status';
type SortDirection = 'asc' | 'desc';

interface Column {
  label: string;
  key: SortColumn;
  align: 'left' | 'right';
}

const COLUMNS: Column[] = [
  { label: 'Date', key: 'date', align: 'left' },
  { label: 'Type', key: 'type', align: 'left' },
  { label: 'Security', key: 'security', align: 'left' },
  { label: 'ISIN', key: 'isin', align: 'left' },
  { label: 'Price', key: 'price', align: 'right' },
  { label: 'Currency', key: 'currency', align: 'left' },
  { label: 'Status', key: 'status', align: 'left' },
];

const PAGE_SIZE = 20;

function getValue(t: Transaction, col: SortColumn): string | number | null {
  switch (col) {
    case 'date': return t.transactionDate ?? null;
    case 'type': return t.typeCode ?? null;
    case 'security': return t.security?.name ?? t.security?.securityCode ?? null;
    case 'isin': return t.security?.isinCode ?? null;
    case 'price': return t.price ?? null;
    case 'currency': return t.currency?.securityCode ?? null;
    case 'status': return t.status ?? null;
  }
}

function compareRows(a: Transaction, b: Transaction, col: SortColumn, dir: SortDirection): number {
  const av = getValue(a, col);
  const bv = getValue(b, col);

  if (av === null && bv === null) return 0;
  if (av === null) return 1;
  if (bv === null) return -1;

  let result: number;
  if (typeof av === 'number' && typeof bv === 'number') {
    result = av - bv;
  } else {
    result = String(av).localeCompare(String(bv));
  }

  return dir === 'asc' ? result : -result;
}

export const TransactionsTable = memo(function TransactionsTable({
  transactions,
  page,
  onPageChange,
}: TransactionsTableProps) {
  const [sortCol, setSortCol] = useState<SortColumn>('date');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  function handleSort(col: SortColumn) {
    if (col === sortCol) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
    onPageChange(1);
  }

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => compareRows(a, b, sortCol, sortDir)),
    [transactions, sortCol, sortDir]
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
              {COLUMNS.map(({ label, key, align }) => {
                const isActive = sortCol === key;
                return (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className={`cursor-pointer select-none px-4 py-3 text-xs font-semibold uppercase tracking-wide transition hover:bg-slate-100 text-${align} ${isActive ? 'text-blue-600' : 'text-slate-500'}`}
                  >
                    <span className={`inline-flex items-center gap-1 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
                      {label}
                      {isActive ? (
                        sortDir === 'asc' ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-30" />
                      )}
                    </span>
                  </th>
                );
              })}
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
