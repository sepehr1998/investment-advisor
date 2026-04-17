import { useState } from 'react';
import { X, RotateCcw, Search } from 'lucide-react';
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

interface ContactsFiltersProps {
  onApply: (parameters: ContactParametersInput) => void;
  onClose: () => void;
}

const inputClass =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const selectClass =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

const labelClass = 'block text-xs font-medium text-slate-600 mb-1';

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export function ContactsFilters({ onApply, onClose }: ContactsFiltersProps) {
  const [filters, setFilters] = useState<ContactFiltersState>(EMPTY_FILTERS);

  function set(field: keyof ContactFiltersState, value: string) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  function handleApply() {
    onApply(filtersToParameters(filters));
  }

  function handleClear() {
    setFilters(EMPTY_FILTERS);
    onApply({});
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <span className="text-sm font-semibold text-slate-900">Filters</span>
        <button
          onClick={onClose}
          className="rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close filters"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable fields */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <FilterField label="Contact name">
          <input
            type="text"
            value={filters.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. John Doe"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Contact ID">
          <input
            type="number"
            value={filters.contactId}
            onChange={(e) => set('contactId', e.target.value)}
            placeholder="e.g. 12345"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="External ID">
          <input
            type="text"
            value={filters.extId}
            onChange={(e) => set('extId', e.target.value)}
            placeholder="External identifier"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Status">
          <select
            value={filters.status}
            onChange={(e) => set('status', e.target.value)}
            className={selectClass}
          >
            <option value="">All</option>
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </FilterField>

        <FilterField label="Contact address">
          <input
            type="text"
            value={filters.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder="Address"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="City">
          <input
            type="text"
            value={filters.city}
            onChange={(e) => set('city', e.target.value)}
            placeholder="City"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Postal code">
          <input
            type="text"
            value={filters.postcode}
            onChange={(e) => set('postcode', e.target.value)}
            placeholder="Postal / ZIP"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Nationality code">
          <input
            type="text"
            value={filters.nationalityCode}
            onChange={(e) => set('nationalityCode', e.target.value)}
            placeholder="e.g. FI, SE, US"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Language">
          <input
            type="text"
            value={filters.languageCode}
            onChange={(e) => set('languageCode', e.target.value)}
            placeholder="e.g. en, fi, sv"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Contact type code">
          <input
            type="text"
            value={filters.contactTypeCode}
            onChange={(e) => set('contactTypeCode', e.target.value)}
            placeholder="Contact type"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Contact subtype code">
          <input
            type="text"
            value={filters.contactSubTypeCode}
            onChange={(e) => set('contactSubTypeCode', e.target.value)}
            placeholder="Contact subtype"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Identity code">
          <input
            type="text"
            value={filters.identityCode}
            onChange={(e) => set('identityCode', e.target.value)}
            placeholder="Identity code"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Juridical code">
          <input
            type="text"
            value={filters.juridicalCode}
            onChange={(e) => set('juridicalCode', e.target.value)}
            placeholder="Juridical / customer type"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Classification">
          <input
            type="text"
            value={filters.classificationCode}
            onChange={(e) => set('classificationCode', e.target.value)}
            placeholder="Classification code"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Classification 2">
          <input
            type="text"
            value={filters.classificationCode2}
            onChange={(e) => set('classificationCode2', e.target.value)}
            placeholder="Classification code 2"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Classification 3">
          <input
            type="text"
            value={filters.classificationCode3}
            onChange={(e) => set('classificationCode3', e.target.value)}
            placeholder="Classification code 3"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Portfolio IDs (comma-separated)">
          <input
            type="text"
            value={filters.portfolioIds}
            onChange={(e) => set('portfolioIds', e.target.value)}
            placeholder="e.g. 101, 205, 310"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Tags (comma-separated)">
          <input
            type="text"
            value={filters.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="e.g. vip, prospect"
            className={inputClass}
          />
        </FilterField>

        <FilterField label="Modified from">
          <input
            type="date"
            value={filters.lastModifiedStartDate}
            onChange={(e) => set('lastModifiedStartDate', e.target.value)}
            className={inputClass}
          />
        </FilterField>
      </div>

      {/* Footer actions */}
      <div className="flex gap-2 border-t border-slate-200 px-4 py-3">
        <button
          onClick={handleClear}
          disabled={!hasActiveFilters}
          className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" />
          Clear
        </button>
        <button
          onClick={handleApply}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
        >
          <Search className="h-3 w-3" />
          Apply filters
        </button>
      </div>
    </aside>
  );
}
