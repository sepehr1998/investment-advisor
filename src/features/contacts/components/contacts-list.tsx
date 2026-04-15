import type { Contact } from '../types';
import { ContactCard } from './contact-card';

interface ContactsListProps {
  contacts: Contact[];
}

export function ContactsList({ contacts }: ContactsListProps) {
  const sortedContacts = [...contacts].sort((a, b) =>
    (a.name ?? '').localeCompare(b.name ?? '')
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
