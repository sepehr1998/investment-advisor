import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTransactions } from '../features/transactions/hooks/use-transactions';
import { usePortfolios } from '../features/portfolios/hooks/use-portfolios';
import { TransactionsSummary } from '../features/transactions/components/transactions-summary';
import { TransactionsFilters } from '../features/transactions/components/transactions-filters';
import { TransactionsTable } from '../features/transactions/components/transactions-table';
import { TransactionsSkeleton } from '../features/transactions/components/transactions-skeleton';
import { EmptyState } from '../components/ui/empty-state';
import { ErrorState } from '../components/ui/error-state';
import { Breadcrumb } from '../components/ui/breadcrumb';
import {
  TRANSACTIONS_EMPTY_MESSAGE,
  TRANSACTIONS_ERROR_MESSAGE,
} from '../lib/constants';

export function TransactionsPage() {
  const { contactId, portfolioId } = useParams<{ contactId: string; portfolioId: string }>();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const { data: transactions, isLoading, isError, refetch } = useTransactions(portfolioId);
  console.log(transactions)
  console.log(portfolioId)
  const { data: contact } = usePortfolios(contactId);
  const portfolio = contact?.portfolios?.find((p) => String(p.id) === portfolioId);
  const filteredTransactions =
    transactions?.filter(
      (t) => activeFilter === 'ALL' || t.typeCode === activeFilter
    ) ?? [];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb />

        <div className="mt-6 mb-8">
          <TransactionsSummary
            portfolioName={portfolio?.name}
            currency={portfolio?.currency?.securityCode}
            transactions={transactions ?? []}
          />
        </div>

        <div className="mb-6">
          <TransactionsFilters activeFilter={activeFilter} onChange={setActiveFilter} />
        </div>

        {isLoading ? (
          <TransactionsSkeleton />
        ) : isError ? (
          <ErrorState message={TRANSACTIONS_ERROR_MESSAGE} onRetry={refetch} />
        ) : filteredTransactions.length === 0 ? (
          <EmptyState message={TRANSACTIONS_EMPTY_MESSAGE} />
        ) : (
          <TransactionsTable transactions={filteredTransactions} />
        )}
      </div>
    </div>
  );
}
