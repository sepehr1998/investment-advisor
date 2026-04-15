import { useMemo, useState } from 'react';
import { useContacts } from '../features/contacts/hooks/use-contacts';
import { ContactsSearch } from '../features/contacts/components/contacts-search';
import { ContactsList } from '../features/contacts/components/contacts-list';
import { ContactsSkeleton } from '../features/contacts/components/contacts-skeleton';
import { EmptyState } from '../components/ui/empty-state';
import { ErrorState } from '../components/ui/error-state';
import {
  CONTACTS_TITLE,
  CONTACTS_EMPTY_MESSAGE,
  CONTACTS_ERROR_MESSAGE,
} from '../lib/constants';

export function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: contacts, isLoading, isFetching, isError, refetch } = useContacts();

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    if (!searchQuery.trim()) return contacts;
    const query = searchQuery.toLowerCase();
    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">{CONTACTS_TITLE}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Select a contact to view their portfolios
          </p>
        </div>

        <div className="mb-4">
          <ContactsSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {!isLoading && !isFetching && contacts && (
          <p className="mb-4 text-sm text-slate-500">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </p>
        )}

        {isLoading || isFetching ? (
          <ContactsSkeleton />
        ) : isError ? (
          <ErrorState message={CONTACTS_ERROR_MESSAGE} onRetry={refetch} />
        ) : filteredContacts.length === 0 ? (
          <EmptyState message={CONTACTS_EMPTY_MESSAGE} />
        ) : (
          <ContactsList contacts={filteredContacts} />
        )}
      </div>
    </div>
  );
}
