import { useQuery } from '@tanstack/react-query';
import client from '../../../api/graphql-client';
import {
  GET_ACTIVE_CONTACTS,
  type GetActiveContactsQuery,
} from '../../../api/generated';

export function useContacts() {
  return useQuery({
    queryKey: ['contacts', { status: "A" }],
    queryFn: async () => {
      console.log('called')
      const data = await client.request<GetActiveContactsQuery>(GET_ACTIVE_CONTACTS);
      console.log(data);
      return data.contacts;
    },
  });
}
