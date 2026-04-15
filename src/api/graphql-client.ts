import { GraphQLClient } from 'graphql-request';
import keycloak from '../auth/keycloak';

const graphqlUrl = new URL(import.meta.env.VITE_GRAPHQL_URL, window.location.origin).href;

const client = new GraphQLClient(graphqlUrl, {
  headers: () => ({
    Authorization: `Bearer ${keycloak.token}`,
  }),
});

export default client;
