import { useState, useCallback } from 'react';
import { useContacts } from '../features/contacts/hooks/use-contacts';
import { ContactsList } from '../features/contacts/components/contacts-list';
import { ContactsSkeleton } from '../features/contacts/components/contacts-skeleton';
import { ContactsFilters, EMPTY_FILTERS, filtersToParameters } from '../features/contacts/components/contacts-filters';
import { ContactsActiveFilters } from '../features/contacts/components/contacts-active-filters';
import { EmptyState } from '../components/ui/empty-state';
import { ErrorState } from '../components/ui/error-state';
import type { ContactFiltersState } from '../features/contacts/components/contacts-active-filters';
import type { ContactParametersInput } from '../api/generated';
import {
  CONTACTS_TITLE,
  CONTACTS_EMPTY_MESSAGE,
  CONTACTS_ERROR_MESSAGE,
} from '../lib/constants';

export function ContactsPage() {
  const [draftFilters, setDraftFilters] = useState<ContactFiltersState>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<ContactFiltersState>(EMPTY_FILTERS);
  const [parameters, setParameters] = useState<ContactParametersInput>({});
  const [page, setPage] = useState(1);

  const { data: contacts, isLoading, isFetching, isError, refetch } = useContacts(parameters);

  const handleApply = useCallback(() => {
    setAppliedFilters(draftFilters);
    setParameters(filtersToParameters(draftFilters));
    setPage(1);
  }, [draftFilters]);

  const handleClearAll = useCallback(() => {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setParameters({});
    setPage(1);
  }, []);

  const handleRemoveFilter = useCallback((field: keyof ContactFiltersState) => {
    const updated = { ...appliedFilters, [field]: '' };
    setDraftFilters(updated);
    setAppliedFilters(updated);
    setParameters(filtersToParameters(updated));
    setPage(1);
  }, [appliedFilters]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">{CONTACTS_TITLE}</h1>
          <p className="mt-1 text-sm text-slate-500">Select a contact to view their portfolios</p>
        </div>

        <div className="flex gap-6">
          <div className="w-72 flex-shrink-0">
            <ContactsFilters
              filters={draftFilters}
              onChange={setDraftFilters}
              onApply={handleApply}
              onClear={handleClearAll}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-4">
              <ContactsActiveFilters
                appliedFilters={appliedFilters}
                onRemove={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
            </div>

            {!isLoading && !isFetching && contacts && (
              <p className="mb-4 text-sm text-slate-500">
                {contacts.length} contact{contacts.length !== 1 ? 's' : ''} found
              </p>
            )}

            {isLoading || isFetching ? (
              <ContactsSkeleton />
            ) : isError ? (
              <ErrorState message={CONTACTS_ERROR_MESSAGE} onRetry={refetch} />
            ) : contacts && contacts.length === 0 ? (
              <EmptyState message={CONTACTS_EMPTY_MESSAGE} />
            ) : contacts ? (
              <ContactsList contacts={contacts} page={page} onPageChange={setPage} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
