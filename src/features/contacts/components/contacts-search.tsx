import { Search } from 'lucide-react';
import { CONTACTS_SEARCH_PLACEHOLDER } from '../../../lib/constants';

interface ContactsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContactsSearch({ value, onChange }: ContactsSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={CONTACTS_SEARCH_PLACEHOLDER}
        className="h-9 w-full rounded-md border border-slate-200 bg-white py-1 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}
