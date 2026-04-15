import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import type { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/contacts/${contact.id}`)}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <User className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">
            {contact.name ?? 'Unnamed Contact'}
          </p>
          <p className="text-sm text-slate-500">ID: {contact.id}</p>
        </div>
      </div>
    </div>
  );
}
