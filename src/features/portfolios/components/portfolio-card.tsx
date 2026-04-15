import { useNavigate, useParams } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import type { Portfolio } from '../types';
import { formatDate } from '../../../lib/formatters';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const navigate = useNavigate();
  const { contactId, portfolioId } = useParams<{
    contactId: string;
    portfolioId?: string;
  }>();
  const isSelected = portfolioId === String(portfolio.id);

  return (
    <div
      onClick={() => navigate(`/contacts/${contactId}/portfolios/${portfolio.id}`)}
      className={`cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        isSelected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Briefcase className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-slate-900">
            {portfolio.name ?? 'Unnamed Portfolio'}
          </p>
          <p className="mt-0.5 text-sm text-slate-500">ID: {portfolio.id}</p>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <div>
              <p className="text-xs text-slate-400">Currency</p>
              <p className="text-sm text-slate-700">
                {portfolio.currency?.securityCode ?? '—'}
              </p>
            </div>
            {portfolio.startDate && (
              <div className="text-right">
                <p className="text-xs text-slate-400">Start Date</p>
                <p className="text-sm text-slate-700">{formatDate(portfolio.startDate)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
