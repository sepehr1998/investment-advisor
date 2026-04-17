import { useNavigate } from 'react-router-dom';
import { User, Mail } from 'lucide-react';
import type { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const navigate = useNavigate();
  console.log(contact)
  return (
    <div
      onClick={() => navigate(`/contacts/${contact.id}`)}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <User className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-slate-900">
            {contact.name ?? 'Unnamed Contact'}
          </p>
          <p className="text-sm text-slate-500">ID: {contact.id}</p>
          {contact.address?.email && (
            <div className="mt-2 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
              <span className="truncate text-xs text-slate-500">{contact.address.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
