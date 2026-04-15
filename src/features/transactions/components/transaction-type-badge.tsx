interface TransactionTypeBadgeProps {
  typeCode: string | null | undefined;
}

const TYPE_STYLES: Record<string, string> = {
  BUY: 'bg-green-100 text-green-800',
  SELL: 'bg-red-100 text-red-800',
  DIVIDEND: 'bg-amber-100 text-amber-800',
  COUPON: 'bg-blue-100 text-blue-800',
};

const TYPE_LABELS: Record<string, string> = {
  BUY: 'Buy',
  SELL: 'Sell',
  DIVIDEND: 'Dividend',
  COUPON: 'Coupon',
};

export function TransactionTypeBadge({ typeCode }: TransactionTypeBadgeProps) {
  const code = typeCode ?? '';
  const styles = TYPE_STYLES[code] ?? 'bg-gray-100 text-gray-700';
  const label = TYPE_LABELS[code] ?? code;

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>
      {label}
    </span>
  );
}
