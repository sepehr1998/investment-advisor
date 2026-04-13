import type { Contact } from '../types';
import { ContactCard } from './contact-card';

interface ContactsListProps {
  contacts: Contact[];
}

export function ContactsList({ contacts }: ContactsListProps) {
  // Sort contacts alphabetically by name (A to Z)
  const sortedContacts = [...contacts].sort((a, b) => {
    const nameA = a.name ?? '';
    const nameB = b.name ?? '';
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="space-y-3">
      {sortedContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
