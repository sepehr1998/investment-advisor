import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
import type { Contact } from '../api/generated';

export function PortfoliosPage() {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: portfolios, isLoading, isError, refetch } = usePortfolios(contactId);

  // Get contact name from cache
  const contacts = queryClient.getQueryData<Contact[]>(['contacts', { status: 'A' }]);
  const contact = contacts?.find((c) => c.id === contactId);

  // Auto-select if exactly one portfolio
  useEffect(() => {
    if (portfolios && portfolios.length === 1) {
      navigate(`/contacts/${contactId}/portfolios/${portfolios[0].id}`, {
        replace: true,
      });
    }
  }, [portfolios, contactId, navigate]);

  return (
    <div className="p-6">
      <Breadcrumb />

      <h2 className="mt-4 text-lg font-semibold text-gray-900">{PORTFOLIOS_TITLE}</h2>

      {contactId && (
        <div className="mt-4">
          <PortfolioSummary
            contactName={contact?.name}
            contactId={contactId}
            portfolioCount={portfolios?.length ?? 0}
          />
        </div>
      )}

      <div className="mt-4">
        {isLoading ? (
          <PortfoliosSkeleton />
        ) : isError ? (
          <ErrorState message={PORTFOLIOS_ERROR_MESSAGE} onRetry={refetch} />
        ) : !portfolios || portfolios.length === 0 ? (
          <EmptyState message={PORTFOLIOS_EMPTY_MESSAGE} />
        ) : (
          <PortfoliosList portfolios={portfolios} />
        )}
      </div>
    </div>
  );
}
