import { useQuery } from '@tanstack/react-query';
import client from '../../../api/graphql-client';
import {
  GET_PORTFOLIOS_BY_CONTACT,
  type GetPortfoliosByContactQuery,
  type GetPortfoliosByContactQueryVariables,
} from '../../../api/generated';

export function usePortfolios(contactId: string | null | undefined) {
  return useQuery({
    queryKey: ['portfolios', contactId],
    queryFn: async () => {
      const data = await client.request<
        GetPortfoliosByContactQuery,
        GetPortfoliosByContactQueryVariables
      >(GET_PORTFOLIOS_BY_CONTACT, { contactId: contactId! });
      return data.contact;
    },
    enabled: !!contactId,
  });
}
