import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { usePortfolios } from '../features/portfolios/hooks/use-portfolios';
import { PortfoliosList } from '../features/portfolios/components/portfolios-list';
import { PortfolioSummary } from '../features/portfolios/components/portfolio-summary';
import { PortfoliosSkeleton } from '../features/portfolios/components/portfolios-skeleton';
import { EmptyState } from '../components/ui/empty-state';
import { ErrorState } from '../components/ui/error-state';
import { Breadcrumb } from '../components/ui/breadcrumb';
import {
  PORTFOLIOS_TITLE,
  PORTFOLIOS_EMPTY_MESSAGE,
  PORTFOLIOS_ERROR_MESSAGE,
} from '../lib/constants';

export function PortfoliosPage() {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: contact, isLoading, isError, refetch } = usePortfolios(contactId);
  const portfolios = contact?.portfolios;

  const filteredPortfolios = useMemo(() => {
    if (!portfolios) return [];
    if (!searchQuery.trim()) return portfolios;
    const query = searchQuery.toLowerCase();
    return portfolios.filter((p) => p.name?.toLowerCase().includes(query));
  }, [portfolios, searchQuery]);

  // Auto-select if exactly one portfolio
  useEffect(() => {
    if (portfolios && portfolios.length === 1) {
      navigate(`/contacts/${contactId}/portfolios/${portfolios[0].id}`, {
        replace: true,
      });
    }
  }, [portfolios, contactId, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb />

        {contactId && (
          <div className="mt-6 mb-8">
            <PortfolioSummary
              contactName={contact?.name}
              contactId={contactId}
              portfolioCount={portfolios?.length ?? 0}
            />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">{PORTFOLIOS_TITLE}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a portfolio to view its transaction history
          </p>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by portfolio name..."
              className="h-9 w-full rounded-md border border-slate-200 bg-white py-1 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {!isLoading && portfolios && (
          <p className="mb-4 text-sm text-slate-500">
            Showing {filteredPortfolios.length} of {portfolios.length} portfolios
          </p>
        )}

        {isLoading ? (
          <PortfoliosSkeleton />
        ) : isError ? (
          <ErrorState message={PORTFOLIOS_ERROR_MESSAGE} onRetry={refetch} />
        ) : filteredPortfolios.length === 0 ? (
          <EmptyState message={PORTFOLIOS_EMPTY_MESSAGE} />
        ) : (
          <PortfoliosList portfolios={filteredPortfolios} />
        )}
      </div>
    </div>
  );
}
