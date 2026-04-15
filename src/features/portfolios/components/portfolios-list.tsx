import type { Portfolio } from '../types';
import { PortfolioCard } from './portfolio-card';

interface PortfoliosListProps {
  portfolios: Portfolio[];
}

export function PortfoliosList({ portfolios }: PortfoliosListProps) {
  const sortedPortfolios = [...portfolios].sort((a, b) =>
    (a.name ?? '').localeCompare(b.name ?? '')
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sortedPortfolios.map((portfolio) => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  );
}
