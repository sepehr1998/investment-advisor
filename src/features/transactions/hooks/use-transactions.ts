import { useQuery, keepPreviousData } from '@tanstack/react-query';
import client from '../../../api/graphql-client';
import {
  GET_TRANSACTIONS_BY_PORTFOLIO,
  type GetTransactionsByPortfolioQuery,
  type GetTransactionsByPortfolioQueryVariables,
  type TransactionParametersInput,
} from '../../../api/generated';

export function useTransactions(
  portfolioId: string | null | undefined,
  extraParams: Omit<TransactionParametersInput, 'portfolioId'> = {}
) {
  const parameters = { resultSize: 500, ...extraParams, portfolioId: Number(portfolioId) };
  return useQuery({
    queryKey: ['transactions', portfolioId, extraParams],
    queryFn: async () => {
      const data = await client.request<
        GetTransactionsByPortfolioQuery,
        GetTransactionsByPortfolioQueryVariables
      >(GET_TRANSACTIONS_BY_PORTFOLIO, {
        parameters,
      });
      return data.transactionsByParameters;
    },
    enabled: !!portfolioId,
    placeholderData: keepPreviousData,
  });
}
