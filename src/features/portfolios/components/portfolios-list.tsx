import type { Portfolio } from '../types';
import { PortfolioCard } from './portfolio-card';

interface PortfoliosListProps {
  portfolios: Portfolio[];
}

export function PortfoliosList({ portfolios }: PortfoliosListProps) {
  const sortedPortfolios = [...portfolios].sort((a, b) => {
    const nameA = a.name ?? '';
    const nameB = b.name ?? '';
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="space-y-3">
      {sortedPortfolios.map((portfolio) => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  );
}
