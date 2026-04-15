import { TRANSACTION_FILTER_OPTIONS } from '../../../lib/constants';

interface TransactionsFiltersProps {
  activeFilter: string;
  onChange: (filter: string) => void;
}

export function TransactionsFilters({ activeFilter, onChange }: TransactionsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TRANSACTION_FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeFilter === option.value
              ? 'bg-blue-600 text-white'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
