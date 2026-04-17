import { useState } from 'react';
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
  // Draft state: what's currently typed in the sidebar inputs
  const [draftFilters, setDraftFilters] = useState<ContactFiltersState>(EMPTY_FILTERS);
  // Applied state: what was last submitted (drives the query)
  const [appliedFilters, setAppliedFilters] = useState<ContactFiltersState>(EMPTY_FILTERS);
  const [parameters, setParameters] = useState<ContactParametersInput>({});

  const { data: contacts, isLoading, isFetching, isError, refetch } = useContacts(parameters);

  function handleApply() {
    setAppliedFilters(draftFilters);
    setParameters(filtersToParameters(draftFilters));
  }

  function handleClearAll() {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setParameters({});
  }

  function handleRemoveFilter(field: keyof ContactFiltersState) {
    const updated = { ...appliedFilters, [field]: '' };
    setDraftFilters(updated);
    setAppliedFilters(updated);
    setParameters(filtersToParameters(updated));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">{CONTACTS_TITLE}</h1>
          <p className="mt-1 text-sm text-slate-500">Select a contact to view their portfolios</p>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex gap-6">
          {/* Always-visible filters sidebar */}
          <div className="w-72 flex-shrink-0">
            <ContactsFilters
              filters={draftFilters}
              onChange={setDraftFilters}
              onApply={handleApply}
              onClear={handleClearAll}
            />
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Active filter chips */}
            <div className="mb-4">
              <ContactsActiveFilters
                appliedFilters={appliedFilters}
                onRemove={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
            </div>

            {/* Result count */}
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
              <ContactsList contacts={contacts} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
