import { GraphQLClient } from 'graphql-request';
import keycloak from '../auth/keycloak';

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
  headers: () => ({
    Authorization: `Bearer ${keycloak.token}`,
  }),
});

export default client;
