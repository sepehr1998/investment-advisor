import { X } from 'lucide-react';
import type { TransactionParametersInput } from '../../../api/generated';

export interface TransactionFiltersState {
  typeCode: string;
  startTrId: string;
  reference: string;
  currencyId: string;
  status: string;
  securityCode: string;
  transactionDateStart: string;
  transactionDateEnd: string;
  settlementStartDate: string;
  settlementEndDate: string;
  tags: string;
  lastModifiedStartDate: string;
  lastModifiedEndDate: string;
}

export const EMPTY_TRANSACTION_FILTERS: TransactionFiltersState = {
  typeCode: '',
  startTrId: '',
  reference: '',
  currencyId: '',
  status: '',
  securityCode: '',
  transactionDateStart: '',
  transactionDateEnd: '',
  settlementStartDate: '',
  settlementEndDate: '',
  tags: '',
  lastModifiedStartDate: '',
  lastModifiedEndDate: '',
};

const FILTER_LABELS: Record<keyof TransactionFiltersState, string> = {
  typeCode: 'Type',
  startTrId: 'No.',
  reference: 'Reference',
  currencyId: 'Currency',
  status: 'Status',
  securityCode: 'Security',
  transactionDateStart: 'Trade date from',
  transactionDateEnd: 'Trade date to',
  settlementStartDate: 'Settlement from',
  settlementEndDate: 'Settlement to',
  tags: 'Tags',
  lastModifiedStartDate: 'Modified from',
  lastModifiedEndDate: 'Modified to',
};

export function transactionFiltersToParameters(
  filters: TransactionFiltersState
): Omit<TransactionParametersInput, 'portfolioId'> {
  const params: Omit<TransactionParametersInput, 'portfolioId'> = {};

  if (filters.typeCode) params.typeCode = filters.typeCode;
  if (filters.startTrId.trim()) params.startTrId = Number(filters.startTrId.trim());
  if (filters.reference.trim()) params.reference = filters.reference.trim();
  if (filters.currencyId.trim()) params.currencyId = filters.currencyId.trim();
  if (filters.status) params.status = filters.status;
  if (filters.securityCode.trim()) params.securityCode = filters.securityCode.trim();
  if (filters.transactionDateStart) params.transactionDateStart = filters.transactionDateStart;
  if (filters.transactionDateEnd) params.transactionDateEnd = filters.transactionDateEnd;
  if (filters.settlementStartDate) params.settlementStartDate = filters.settlementStartDate;
  if (filters.settlementEndDate) params.settlementEndDate = filters.settlementEndDate;
  if (filters.tags.trim()) {
    params.tags = filters.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (filters.lastModifiedStartDate) params.lastModifiedStartDate = filters.lastModifiedStartDate;
  if (filters.lastModifiedEndDate) params.lastModifiedEndDate = filters.lastModifiedEndDate;

  return params;
}

interface TransactionsActiveFiltersProps {
  appliedFilters: TransactionFiltersState;
  onRemove: (field: keyof TransactionFiltersState) => void;
  onClearAll: () => void;
}

export function TransactionsActiveFilters({
  appliedFilters,
  onRemove,
  onClearAll,
}: TransactionsActiveFiltersProps) {
  const activeEntries = (
    Object.entries(appliedFilters) as [keyof TransactionFiltersState, string][]
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
          {value}
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
