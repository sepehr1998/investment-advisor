// GraphQL query documents
import { gql } from 'graphql-request';

export const GET_ACTIVE_CONTACTS = gql`
  query GetActiveContacts {
    contactsByParameters(parameters: { status: "A" }) {
      id
      name
    }
  }
`;

export const GET_PORTFOLIOS_BY_CONTACT = gql`
  query GetPortfoliosByContact($contactId: Long!) {
    portfoliosByParameters(parameters: { contactId: $contactId }) {
      id
      name
      currency {
        securityCode
      }
      status
      startDate
    }
  }
`;

export const GET_TRANSACTIONS_BY_PORTFOLIO = gql`
  query GetTransactionsByPortfolio($portfolioId: Long!) {
    transactionsByParameters(parameters: { portfolioId: $portfolioId }) {
      id
      type {
        typeCode
        typeName
      }
      security {
        name
        securityCode
      }
      tradeDate
      amount
      quantity
      price
      currency {
        securityCode
      }
    }
  }
`;
