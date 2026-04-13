import { useNavigate, useParams } from 'react-router-dom';
import type { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const navigate = useNavigate();
  const { contactId } = useParams<{ contactId: string }>();
  const isSelected = contactId === contact.id;

  const handleClick = () => {
    navigate(`/contacts/${contact.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center justify-between rounded-lg border bg-white p-4 text-left transition-colors hover:bg-gray-50 ${
        isSelected
          ? 'border-blue-500 ring-1 ring-blue-500'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-medium text-gray-900">
          {contact.name ?? 'Unnamed Contact'}
        </p>
        <p className="mt-1 text-sm text-gray-500">ID: {contact.id}</p>
      </div>
      <svg
        className="ml-4 h-5 w-5 flex-shrink-0 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
