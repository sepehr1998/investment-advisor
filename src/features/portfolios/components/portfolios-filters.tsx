import { RotateCcw, Search } from 'lucide-react';
import type { PortfolioFiltersState } from './portfolios-active-filters';

interface PortfoliosFiltersProps {
  filters: PortfolioFiltersState;
  onChange: (filters: PortfolioFiltersState) => void;
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

export function PortfoliosFilters({ filters, onChange, onApply, onClear }: PortfoliosFiltersProps) {
  function set(field: keyof PortfolioFiltersState, value: string) {
    onChange({ ...filters, [field]: value });
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') onApply();
  }

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-3">
        <span className="text-sm font-semibold text-slate-900">Filters</span>
      </div>

      {/* Scrollable fields */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" onKeyDown={handleKeyDown}>
        <FilterField label="Portfolio IDs (comma-separated)">
          <input
            type="text"
            value={filters.ids}
            onChange={(e) => set('ids', e.target.value)}
            placeholder="e.g. 101, 205, 310"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Portfolio name">
          <input
            type="text"
            value={filters.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Growth Fund"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="External ID">
          <input
            type="text"
            value={filters.extId}
            onChange={(e) => set('extId', e.target.value)}
            placeholder="External identifier"
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
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </FilterField>

        <FilterField label="Type">
          <input
            type="text"
            value={filters.typeCode}
            onChange={(e) => set('typeCode', e.target.value)}
            placeholder="Portfolio type code"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Currency">
          <input
            type="text"
            value={filters.currencyCode}
            onChange={(e) => set('currencyCode', e.target.value)}
            placeholder="e.g. EUR, USD, SEK"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Rule set">
          <input
            type="text"
            value={filters.ruleSetCode}
            onChange={(e) => set('ruleSetCode', e.target.value)}
            placeholder="Posting rule set code"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Model portfolio">
          <input
            type="text"
            value={filters.modelPortfolioShortName}
            onChange={(e) => set('modelPortfolioShortName', e.target.value)}
            placeholder="Model portfolio short name"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Language">
          <input
            type="text"
            value={filters.languageCode}
            onChange={(e) => set('languageCode', e.target.value)}
            placeholder="e.g. en, fi, sv"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Juridical">
          <input
            type="text"
            value={filters.juridicalCode}
            onChange={(e) => set('juridicalCode', e.target.value)}
            placeholder="Juridical code"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Tax country">
          <input
            type="text"
            value={filters.countryCode}
            onChange={(e) => set('countryCode', e.target.value)}
            placeholder="e.g. FI, SE, US"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Valuation method">
          <input
            type="text"
            value={filters.valuationMethod}
            onChange={(e) => set('valuationMethod', e.target.value)}
            placeholder="Valuation method"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Custody">
          <input
            type="text"
            value={filters.custodyCode}
            onChange={(e) => set('custodyCode', e.target.value)}
            placeholder="Custody code"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Book entry">
          <input
            type="text"
            value={filters.bookEntry}
            onChange={(e) => set('bookEntry', e.target.value)}
            placeholder="Book entry"
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

        <FilterField label="Tags (comma-separated)">
          <input
            type="text"
            value={filters.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="e.g. vip, growth"
            className={inputClass}
          />
        </FilterField>
      </div>

      {/* Footer actions */}
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
