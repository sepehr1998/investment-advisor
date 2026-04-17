import { X } from 'lucide-react';
import type { PortfolioParametersInput } from '../../../api/generated';

export interface PortfolioFiltersState {
  ids: string;
  name: string;
  extId: string;
  status: string;
  typeCode: string;
  currencyCode: string;
  ruleSetCode: string;
  modelPortfolioShortName: string;
  languageCode: string;
  juridicalCode: string;
  countryCode: string;
  valuationMethod: string;
  custodyCode: string;
  bookEntry: string;
  lastModifiedStartDate: string;
  lastModifiedEndDate: string;
  tags: string;
}

export const EMPTY_PORTFOLIO_FILTERS: PortfolioFiltersState = {
  ids: '',
  name: '',
  extId: '',
  status: '',
  typeCode: '',
  currencyCode: '',
  ruleSetCode: '',
  modelPortfolioShortName: '',
  languageCode: '',
  juridicalCode: '',
  countryCode: '',
  valuationMethod: '',
  custodyCode: '',
  bookEntry: '',
  lastModifiedStartDate: '',
  lastModifiedEndDate: '',
  tags: '',
};

const FILTER_LABELS: Record<keyof PortfolioFiltersState, string> = {
  ids: 'Portfolio IDs',
  name: 'Name',
  extId: 'Ext. ID',
  status: 'Status',
  typeCode: 'Type',
  currencyCode: 'Currency',
  ruleSetCode: 'Rule set',
  modelPortfolioShortName: 'Model portfolio',
  languageCode: 'Language',
  juridicalCode: 'Juridical',
  countryCode: 'Country',
  valuationMethod: 'Valuation method',
  custodyCode: 'Custody',
  bookEntry: 'Book entry',
  lastModifiedStartDate: 'Modified from',
  lastModifiedEndDate: 'Modified to',
  tags: 'Tags',
};

function displayValue(field: keyof PortfolioFiltersState, value: string): string {
  if (field === 'status') return value === 'A' ? 'Active' : value === 'I' ? 'Inactive' : value;
  return value;
}

export function portfolioFiltersToParameters(
  filters: PortfolioFiltersState
): PortfolioParametersInput {
  const params: PortfolioParametersInput = {};

  if (filters.ids.trim()) {
    params.ids = filters.ids
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (filters.name.trim()) params.name = filters.name.trim();
  if (filters.extId.trim()) params.extId = filters.extId.trim();
  if (filters.status) params.status = filters.status;
  if (filters.typeCode.trim()) params.typeCode = filters.typeCode.trim();
  if (filters.currencyCode.trim()) params.currencyCode = filters.currencyCode.trim();
  if (filters.ruleSetCode.trim()) params.ruleSetCode = filters.ruleSetCode.trim();
  if (filters.modelPortfolioShortName.trim()) params.modelPortfolioShortName = filters.modelPortfolioShortName.trim();
  if (filters.languageCode.trim()) params.languageCode = filters.languageCode.trim();
  if (filters.juridicalCode.trim()) params.juridicalCode = filters.juridicalCode.trim();
  if (filters.countryCode.trim()) params.countryCode = filters.countryCode.trim();
  if (filters.valuationMethod.trim()) params.valuationMethod = filters.valuationMethod.trim();
  if (filters.custodyCode.trim()) params.custodyCode = filters.custodyCode.trim();
  if (filters.bookEntry.trim()) params.bookEntry = filters.bookEntry.trim();
  if (filters.lastModifiedStartDate) params.lastModifiedStartDate = filters.lastModifiedStartDate;
  if (filters.lastModifiedEndDate) params.lastModifiedEndDate = filters.lastModifiedEndDate;
  if (filters.tags.trim()) {
    params.tags = filters.tags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return params;
}

interface PortfoliosActiveFiltersProps {
  appliedFilters: PortfolioFiltersState;
  onRemove: (field: keyof PortfolioFiltersState) => void;
  onClearAll: () => void;
}

export function PortfoliosActiveFilters({
  appliedFilters,
  onRemove,
  onClearAll,
}: PortfoliosActiveFiltersProps) {
  const activeEntries = (
    Object.entries(appliedFilters) as [keyof PortfolioFiltersState, string][]
  ).filter(([, value]) => value !== '');

  if (activeEntries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-500">Active filters:</span>
      {activeEntries.map(([field, value]) => (
        <span
          key={field}
          className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 py-0.5 pl-2.5 pr-1.5 text-xs font-medium text-blue-700"
        >
          <span className="text-blue-500">{FILTER_LABELS[field]}:</span>
          {displayValue(field, value)}
          <button
            onClick={() => onRemove(field)}
            className="ml-0.5 rounded-full p-0.5 transition hover:bg-blue-200"
            aria-label={`Remove ${FILTER_LABELS[field]} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-slate-400 underline-offset-2 transition hover:text-slate-600 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
