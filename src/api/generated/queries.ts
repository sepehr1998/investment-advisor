// GraphQL query documents
import { gql } from 'graphql-request';

export const GET_ACTIVE_CONTACTS = gql`
  query GetActiveContacts {
    contacts(status: "A") {
      id
      name
    }
  }
`;

export const GET_PORTFOLIOS_BY_CONTACT = gql`
  query GetPortfoliosByContact($contactId: Long!) {
    contact(id: $contactId) {
      id
      name
      portfolios {
        id
        name
        currency {
          securityCode
        }
        status
        startDate
      }
    }
  }
`;

export const GET_TRANSACTIONS_BY_PORTFOLIO = gql`
  query GetTransactionsByPortfolio($portfolioId: Long!) {
    transactions(portfolioId: $portfolioId) {
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
