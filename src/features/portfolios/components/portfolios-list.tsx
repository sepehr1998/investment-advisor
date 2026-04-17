import { useMemo, memo } from 'react';
import type { Portfolio } from '../types';
import { PortfolioCard } from './portfolio-card';

interface PortfoliosListProps {
  portfolios: Portfolio[];
}

export const PortfoliosList = memo(function PortfoliosList({ portfolios }: PortfoliosListProps) {
  const sorted = useMemo(
    () => [...portfolios].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '')),
    [portfolios]
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sorted.map((portfolio) => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  );
});
