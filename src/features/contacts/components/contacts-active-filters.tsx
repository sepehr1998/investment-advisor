import { X } from 'lucide-react';
import type { ContactParametersInput } from '../../../api/generated';

export interface ContactFiltersState {
  name: string;
  contactId: string;
  extId: string;
  status: string;
  address: string;
  nationalityCode: string;
  contactTypeCode: string;
  contactSubTypeCode: string;
  identityCode: string;
  classificationCode: string;
  classificationCode2: string;
  classificationCode3: string;
  postcode: string;
  languageCode: string;
  portfolioIds: string;
  juridicalCode: string;
  city: string;
  lastModifiedStartDate: string;
  tags: string;
}

export const EMPTY_FILTERS: ContactFiltersState = {
  name: '',
  contactId: '',
  extId: '',
  status: '',
  address: '',
  nationalityCode: '',
  contactTypeCode: '',
  contactSubTypeCode: '',
  identityCode: '',
  classificationCode: '',
  classificationCode2: '',
  classificationCode3: '',
  postcode: '',
  languageCode: '',
  portfolioIds: '',
  juridicalCode: '',
  city: '',
  lastModifiedStartDate: '',
  tags: '',
};

const FILTER_LABELS: Record<keyof ContactFiltersState, string> = {
  name: 'Name',
  contactId: 'Contact ID',
  extId: 'Ext. ID',
  status: 'Status',
  address: 'Address',
  nationalityCode: 'Nationality',
  contactTypeCode: 'Type',
  contactSubTypeCode: 'Subtype',
  identityCode: 'Identity',
  classificationCode: 'Classification',
  classificationCode2: 'Classification 2',
  classificationCode3: 'Classification 3',
  postcode: 'Postal code',
  languageCode: 'Language',
  portfolioIds: 'Portfolio IDs',
  juridicalCode: 'Juridical',
  city: 'City',
  lastModifiedStartDate: 'Modified from',
  tags: 'Tags',
};

function displayValue(field: keyof ContactFiltersState, value: string): string {
  if (field === 'status') return value === 'A' ? 'Active' : value === 'I' ? 'Inactive' : value;
  return value;
}

export function filtersToParameters(filters: ContactFiltersState): ContactParametersInput {
  const params: ContactParametersInput = {};
  if (filters.name.trim()) params.name = filters.name.trim();
  if (filters.contactId.trim()) params.contactId = Number(filters.contactId.trim());
  if (filters.extId.trim()) params.extId = filters.extId.trim();
  if (filters.status) params.status = filters.status;
  if (filters.address.trim()) params.address = filters.address.trim();
  if (filters.nationalityCode.trim()) params.nationalityCode = filters.nationalityCode.trim();
  if (filters.contactTypeCode.trim()) params.contactTypeCode = filters.contactTypeCode.trim();
  if (filters.contactSubTypeCode.trim()) params.contactSubTypeCode = filters.contactSubTypeCode.trim();
  if (filters.identityCode.trim()) params.identityCode = filters.identityCode.trim();
  if (filters.classificationCode.trim()) params.classificationCode = filters.classificationCode.trim();
  if (filters.classificationCode2.trim()) params.classificationCode2 = filters.classificationCode2.trim();
  if (filters.classificationCode3.trim()) params.classificationCode3 = filters.classificationCode3.trim();
  if (filters.postcode.trim()) params.postcode = filters.postcode.trim();
  if (filters.languageCode.trim()) params.languageCode = filters.languageCode.trim();
  if (filters.portfolioIds.trim()) {
    params.portfolioIds = filters.portfolioIds
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);
  }
  if (filters.juridicalCode.trim()) params.juridicalCode = filters.juridicalCode.trim();
  if (filters.city.trim()) params.city = filters.city.trim();
  if (filters.lastModifiedStartDate) params.lastModifiedStartDate = filters.lastModifiedStartDate;
  if (filters.tags.trim()) {
    params.tags = filters.tags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return params;
}

interface ContactsActiveFiltersProps {
  appliedFilters: ContactFiltersState;
  onRemove: (field: keyof ContactFiltersState) => void;
  onClearAll: () => void;
}

export function ContactsActiveFilters({
  appliedFilters,
  onRemove,
  onClearAll,
}: ContactsActiveFiltersProps) {
  const activeEntries = (
    Object.entries(appliedFilters) as [keyof ContactFiltersState, string][]
  ).filter(([, value]) => value !== '');

  if (activeEntries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-500">Active filters:</span>
      {activeEntries.map(([field, value]) => (
        <span
          key={field}
          className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 py-0.5 pl-2.5 pr-1.5 text-xs font-medium text-blue-700"
        >
          <span className="text-blue-500">{FILTER_LABELS[field]}:</span>
          {displayValue(field, value)}
          <button
            onClick={() => onRemove(field)}
            className="ml-0.5 rounded-full p-0.5 transition hover:bg-blue-200"
            aria-label={`Remove ${FILTER_LABELS[field]} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-slate-400 underline-offset-2 transition hover:text-slate-600 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
