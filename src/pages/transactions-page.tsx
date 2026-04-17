import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTransactions } from '../features/transactions/hooks/use-transactions';
import { usePortfolios } from '../features/portfolios/hooks/use-portfolios';
import { TransactionsSummary } from '../features/transactions/components/transactions-summary';
import { TransactionsTable } from '../features/transactions/components/transactions-table';
import { TransactionsSkeleton } from '../features/transactions/components/transactions-skeleton';
import { EmptyState } from '../components/ui/empty-state';
import { ErrorState } from '../components/ui/error-state';
import {
  TransactionsFiltersSidebar,
} from '../features/transactions/components/transactions-filters-sidebar';
import {
  TransactionsActiveFilters,
  EMPTY_TRANSACTION_FILTERS,
  transactionFiltersToParameters,
  type TransactionFiltersState,
} from '../features/transactions/components/transactions-active-filters';
import {
  TRANSACTIONS_EMPTY_MESSAGE,
  TRANSACTIONS_ERROR_MESSAGE,
} from '../lib/constants';

export function TransactionsPage() {
  const { contactId, portfolioId } = useParams<{ contactId: string; portfolioId: string }>();

  const [draftFilters, setDraftFilters] = useState<TransactionFiltersState>(EMPTY_TRANSACTION_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<TransactionFiltersState>(EMPTY_TRANSACTION_FILTERS);

  const extraParams = useMemo(() => transactionFiltersToParameters(appliedFilters), [appliedFilters]);

  const { data: transactions, isLoading, isError, refetch } = useTransactions(portfolioId, extraParams);
  const { data: contact } = usePortfolios(contactId);
  const portfolio = contact?.portfolios?.find((p) => String(p.id) === portfolioId);

  function handleApply() {
    setAppliedFilters(draftFilters);
  }

  function handleClearAll() {
    setDraftFilters(EMPTY_TRANSACTION_FILTERS);
    setAppliedFilters(EMPTY_TRANSACTION_FILTERS);
  }

  function handleRemoveFilter(field: keyof TransactionFiltersState) {
    const updated = { ...appliedFilters, [field]: '' };
    setAppliedFilters(updated);
    setDraftFilters(updated);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <TransactionsSummary
            portfolioName={portfolio?.name}
            currency={portfolio?.currency?.securityCode}
            transactions={transactions ?? []}
          />
        </div>

        <div className="flex gap-6">
          <div className="w-72 flex-shrink-0">
            <TransactionsFiltersSidebar
              filters={draftFilters}
              onChange={setDraftFilters}
              onApply={handleApply}
              onClear={handleClearAll}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-4">
              <TransactionsActiveFilters
                appliedFilters={appliedFilters}
                onRemove={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
            </div>

            {isLoading ? (
              <TransactionsSkeleton />
            ) : isError ? (
              <ErrorState message={TRANSACTIONS_ERROR_MESSAGE} onRetry={refetch} />
            ) : !transactions || transactions.length === 0 ? (
              <EmptyState message={TRANSACTIONS_EMPTY_MESSAGE} />
            ) : (
              <TransactionsTable transactions={transactions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
