interface PortfolioSummaryProps {
  contactName: string | null | undefined;
  contactId: string;
  portfolioCount: number;
}

export function PortfolioSummary({
  contactName,
  contactId,
  portfolioCount,
}: PortfolioSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-base font-semibold text-gray-900">
        {contactName ?? 'Unnamed Contact'}
      </p>
      <p className="mt-1 text-sm text-gray-500">ID: {contactId}</p>
      <p className="mt-1 text-sm text-gray-500">
        {portfolioCount} {portfolioCount === 1 ? 'portfolio' : 'portfolios'}
      </p>
    </div>
  );
}
