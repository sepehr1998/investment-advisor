import { useMemo, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePortfolios } from '../features/portfolios/hooks/use-portfolios';
import { usePortfoliosByParameters } from '../features/portfolios/hooks/use-portfolios-by-parameters';
import { PortfoliosList } from '../features/portfolios/components/portfolios-list';
import { PortfolioSummary } from '../features/portfolios/components/portfolio-summary';
import { PortfoliosSkeleton } from '../features/portfolios/components/portfolios-skeleton';
import { PortfoliosFilters } from '../features/portfolios/components/portfolios-filters';
import {
  PortfoliosActiveFilters,
  EMPTY_PORTFOLIO_FILTERS,
  portfolioFiltersToParameters,
} from '../features/portfolios/components/portfolios-active-filters';
import { EmptyState } from '../components/ui/empty-state';
import { ErrorState } from '../components/ui/error-state';
import type { PortfolioFiltersState } from '../features/portfolios/components/portfolios-active-filters';
import type { PortfolioParametersInput } from '../api/generated';
import {
  PORTFOLIOS_TITLE,
  PORTFOLIOS_EMPTY_MESSAGE,
  PORTFOLIOS_ERROR_MESSAGE,
} from '../lib/constants';

export function PortfoliosPage() {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();

  const [draftFilters, setDraftFilters] = useState<PortfolioFiltersState>(EMPTY_PORTFOLIO_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<PortfolioFiltersState>(EMPTY_PORTFOLIO_FILTERS);
  const [userParameters, setUserParameters] = useState<PortfolioParametersInput | null>(null);

  // Contact info + default portfolio IDs (used when no user filters are active)
  const { data: contact, isLoading: isContactLoading } = usePortfolios(contactId);
  const contactPortfolioIds = useMemo(
    () => contact?.portfolios?.map((p) => String(p.id)) ?? [],
    [contact]
  );

  const hasUserFilters = userParameters !== null;

  // When filters are active: ask the server to filter within the contact's portfolio IDs.
  // When no filters: use the portfolios already returned by the contact query — no second request.
  const filteredParameters = useMemo<PortfolioParametersInput>(() => {
    return { ...userParameters, ids: contactPortfolioIds };
  }, [userParameters, contactPortfolioIds]);

  const {
    data: filteredPortfolios,
    isLoading: isFiltering,
    isFetching,
    isError,
    refetch,
  } = usePortfoliosByParameters(filteredParameters, {
    enabled: hasUserFilters && contactPortfolioIds.length > 0,
  });

  const portfolios = (hasUserFilters ? filteredPortfolios : contact?.portfolios) ?? [];

  const handleApply = useCallback(() => {
    const params = portfolioFiltersToParameters(draftFilters);
    setAppliedFilters(draftFilters);
    setUserParameters(params);
  }, [draftFilters]);

  const handleClearAll = useCallback(() => {
    setDraftFilters(EMPTY_PORTFOLIO_FILTERS);
    setAppliedFilters(EMPTY_PORTFOLIO_FILTERS);
    setUserParameters(null);
  }, []);

  const handleRemoveFilter = useCallback((field: keyof PortfolioFiltersState) => {
    const updated = { ...appliedFilters, [field]: '' };
    setDraftFilters(updated);
    setAppliedFilters(updated);
    const params = portfolioFiltersToParameters(updated);
    setUserParameters(Object.keys(params).length > 0 ? params : null);
  }, [appliedFilters]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate('/contacts')}
          className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Contacts
        </button>

        {/* Contact summary */}
        {contactId && (
          <div className="mb-6">
            <PortfolioSummary
              contactName={contact?.name}
              contactId={contactId}
              portfolioCount={portfolios?.length ?? 0}
            />
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">{PORTFOLIOS_TITLE}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a portfolio to view its transaction history
          </p>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex gap-6">
          <div className="w-72 flex-shrink-0">
            <PortfoliosFilters
              filters={draftFilters}
              onChange={setDraftFilters}
              onApply={handleApply}
              onClear={handleClearAll}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-4">
              <PortfoliosActiveFilters
                appliedFilters={appliedFilters}
                onRemove={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
            </div>

            {!isContactLoading && !isFetching && portfolios.length > 0 && (
              <p className="mb-4 text-sm text-slate-500">
                {portfolios.length} portfolio{portfolios.length !== 1 ? 's' : ''} found
              </p>
            )}

            {isContactLoading || (hasUserFilters && isFiltering) || isFetching ? (
              <PortfoliosSkeleton />
            ) : isError ? (
              <ErrorState message={PORTFOLIOS_ERROR_MESSAGE} onRetry={refetch} />
            ) : portfolios.length === 0 ? (
              <EmptyState message={PORTFOLIOS_EMPTY_MESSAGE} />
            ) : (
              <PortfoliosList portfolios={portfolios} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
