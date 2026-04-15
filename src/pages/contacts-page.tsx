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
  console.log(useContacts());
  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    if (!searchQuery.trim()) return contacts;

    const query = searchQuery.toLowerCase();
    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900">{CONTACTS_TITLE}</h2>

      <div className="mt-4">
        <ContactsSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="mt-4">
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
