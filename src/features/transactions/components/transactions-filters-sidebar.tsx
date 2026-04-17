import { RotateCcw, Search } from 'lucide-react';
import type { TransactionFiltersState } from './transactions-active-filters';

interface TransactionsFiltersSidebarProps {
  filters: TransactionFiltersState;
  onChange: (filters: TransactionFiltersState) => void;
  onApply: () => void;
  onClear: () => void;
}

const inputClass =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const selectClass =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const labelClass = 'block text-xs font-medium text-slate-600 mb-1';

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export function TransactionsFiltersSidebar({
  filters,
  onChange,
  onApply,
  onClear,
}: TransactionsFiltersSidebarProps) {
  function set(field: keyof TransactionFiltersState, value: string) {
    onChange({ ...filters, [field]: value });
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') onApply();
  }

  return (
    <aside className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <span className="text-sm font-semibold text-slate-900">Filters</span>
      </div>

      <div className="space-y-3 px-4 py-4" onKeyDown={handleKeyDown}>
        <FilterField label="Type">
          <select
            value={filters.typeCode}
            onChange={(e) => set('typeCode', e.target.value)}
            className={selectClass}
          >
            <option value="">All</option>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
            <option value="DIVIDEND">Dividend</option>
            <option value="COUPON">Coupon</option>
          </select>
        </FilterField>

        <FilterField label="No.">
          <input
            type="number"
            value={filters.startTrId}
            onChange={(e) => set('startTrId', e.target.value)}
            placeholder="Transaction number"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Reference">
          <input
            type="text"
            value={filters.reference}
            onChange={(e) => set('reference', e.target.value)}
            placeholder="Transaction reference"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Currency">
          <input
            type="text"
            value={filters.currencyId}
            onChange={(e) => set('currencyId', e.target.value)}
            placeholder="e.g. EUR, USD"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Status">
          <select
            value={filters.status}
            onChange={(e) => set('status', e.target.value)}
            className={selectClass}
          >
            <option value="">All</option>
            <option value="SETTLED">Settled</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </FilterField>

        <FilterField label="Security">
          <input
            type="text"
            value={filters.securityCode}
            onChange={(e) => set('securityCode', e.target.value)}
            placeholder="Security code"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Trade date from">
          <input
            type="date"
            value={filters.transactionDateStart}
            onChange={(e) => set('transactionDateStart', e.target.value)}
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Trade date to">
          <input
            type="date"
            value={filters.transactionDateEnd}
            onChange={(e) => set('transactionDateEnd', e.target.value)}
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Settlement date from">
          <input
            type="date"
            value={filters.settlementStartDate}
            onChange={(e) => set('settlementStartDate', e.target.value)}
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Settlement date to">
          <input
            type="date"
            value={filters.settlementEndDate}
            onChange={(e) => set('settlementEndDate', e.target.value)}
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Tags (comma-separated)">
          <input
            type="text"
            value={filters.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="e.g. urgent, reviewed"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Modified from">
          <input
            type="date"
            value={filters.lastModifiedStartDate}
            onChange={(e) => set('lastModifiedStartDate', e.target.value)}
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Modified to">
          <input
            type="date"
            value={filters.lastModifiedEndDate}
            onChange={(e) => set('lastModifiedEndDate', e.target.value)}
            className={inputClass}
          />
        </FilterField>
      </div>

      <div className="flex gap-2 border-t border-slate-200 px-4 py-3">
        <button
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" />
          Clear
        </button>
        <button
          onClick={onApply}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
        >
          <Search className="h-3 w-3" />
          Apply filters
        </button>
      </div>
    </aside>
  );
}
