import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useContacts } from '../features/contacts/hooks/use-contacts';
import { ContactsList } from '../features/contacts/components/contacts-list';
import { ContactsSkeleton } from '../features/contacts/components/contacts-skeleton';
import { ContactsFilters } from '../features/contacts/components/contacts-filters';
import { EmptyState } from '../components/ui/empty-state';
import { ErrorState } from '../components/ui/error-state';
import type { ContactParametersInput } from '../api/generated';
import {
  CONTACTS_TITLE,
  CONTACTS_EMPTY_MESSAGE,
  CONTACTS_ERROR_MESSAGE,
} from '../lib/constants';

export function ContactsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [parameters, setParameters] = useState<ContactParametersInput>({});

  const { data: contacts, isLoading, isFetching, isError, refetch } = useContacts(parameters);
  console.log(useContacts())
  const activeFilterCount = Object.keys(parameters).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{CONTACTS_TITLE}</h1>
            <p className="mt-1 text-sm text-slate-500">Select a contact to view their portfolios</p>
          </div>

          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
              sidebarOpen || activeFilterCount > 0
                ? 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex gap-6">
          {sidebarOpen && (
            <div className="w-72 flex-shrink-0">
              <ContactsFilters
                onApply={(params) => setParameters(params)}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
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
