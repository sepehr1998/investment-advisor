import { Link, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { CONTACTS_TITLE } from '../../lib/constants';
import type { Portfolio } from '../../api/generated';

export function Breadcrumb() {
  const { contactId, portfolioId } = useParams<{
    contactId?: string;
    portfolioId?: string;
  }>();
  const queryClient = useQueryClient();

  // Contact name comes from the portfolios cache (contact query includes name)
  const contactData = queryClient.getQueryData<{
    id: number;
    name: string | null;
    portfolios: Portfolio[];
  }>(['portfolios', contactId]);
  const contactName = contactData?.name ?? `Contact ${contactId}`;

  // Portfolio name from the nested portfolios array in that same cache entry
  const portfolio = contactData?.portfolios?.find((p) => String(p.id) === portfolioId);
  const portfolioName = portfolio?.name ?? `Portfolio ${portfolioId}`;

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {!contactId ? (
        <span className="font-medium text-gray-900">{CONTACTS_TITLE}</span>
      ) : (
        <>
          <Link
            to="/contacts"
            className="text-gray-500 hover:text-gray-700 hover:underline"
          >
            {CONTACTS_TITLE}
          </Link>
          <ChevronIcon />
          {!portfolioId ? (
            <span className="font-medium text-gray-900">{contactName}</span>
          ) : (
            <>
              <Link
                to={`/contacts/${contactId}`}
                className="text-gray-500 hover:text-gray-700 hover:underline"
              >
                {contactName}
              </Link>
              <ChevronIcon />
              <span className="font-medium text-gray-900">{portfolioName}</span>
            </>
          )}
        </>
      )}
    </nav>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="h-4 w-4 flex-shrink-0 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
