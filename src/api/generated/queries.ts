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
  query GetTransactionsByPortfolio($parameters: transactionParametersInput) {
    transactionsByParameters(parameters: $parameters) {
      id
      transactionDate
      effectiveTransactionDate
      settlementDate
      typeCode
      reference
      status
      security {
        id
        name
        securityCode
        isinCode
      }
      currency {
        securityCode
      }
      price
    }
  }
`;
