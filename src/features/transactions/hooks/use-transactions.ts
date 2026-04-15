import { useQuery } from '@tanstack/react-query';
import client from '../../../api/graphql-client';
import {
  GET_TRANSACTIONS_BY_PORTFOLIO,
  type GetTransactionsByPortfolioQuery,
  type GetTransactionsByPortfolioQueryVariables,
} from '../../../api/generated';

export function useTransactions(portfolioId: string | null | undefined) {
  return useQuery({
    queryKey: ['transactions', portfolioId],
    queryFn: async () => {
      const data = await client.request<
        GetTransactionsByPortfolioQuery,
        GetTransactionsByPortfolioQueryVariables
      >(GET_TRANSACTIONS_BY_PORTFOLIO, { portfolioId: portfolioId! });
      return data.transactions;
    },
    enabled: !!portfolioId,
  });
}
