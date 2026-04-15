import type { Transaction } from '../../../api/generated';
import { TransactionTypeBadge } from './transaction-type-badge';
import { formatDate, formatPrice } from '../../../lib/formatters';

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const typeCode = transaction.typeCode ?? '';

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="px-4 py-3 text-sm whitespace-nowrap text-slate-700">
        {formatDate(transaction.transactionDate)}
      </td>
      <td className="px-4 py-3">
        <TransactionTypeBadge typeCode={typeCode} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-900">
        {transaction.security?.name ?? transaction.security?.securityCode ?? '—'}
      </td>
      <td className="px-4 py-3 text-sm text-slate-500">
        {transaction.security?.isinCode ?? '—'}
      </td>
      <td className="px-4 py-3 text-right text-sm text-slate-700">
        {formatPrice(transaction.price)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-500">
        {transaction.currency?.securityCode ?? '—'}
      </td>
      <td className="px-4 py-3 text-sm text-slate-500">
        {transaction.status ?? '—'}
      </td>
    </tr>
  );
}
