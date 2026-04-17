import { useState } from 'react';
import type { Contact } from '../types';
import { ContactCard } from './contact-card';
import { Pagination } from '../../../components/ui/pagination';

interface ContactsListProps {
  contacts: Contact[];
}

const PAGE_SIZE = 12;

export function ContactsList({ contacts }: ContactsListProps) {
  const [page, setPage] = useState(1);

  const sorted = [...contacts].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handlePageChange(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
