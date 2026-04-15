// Generated types based on GraphQL queries
// Note: These types are manually defined since the schema requires authentication

// Scalar types
export type Long = number;

// Contact types
export interface Contact {
  id: Long;
  name: string | null;
}

export interface GetActiveContactsQuery {
  contacts: Contact[];
}

// Portfolio types
export interface PortfolioCurrency {
  securityCode: string | null;
}

export interface Portfolio {
  id: Long;
  name: string | null;
  currency: PortfolioCurrency | null;
  status: string | null;
  startDate: string | null;
}

export interface GetPortfoliosByContactQuery {
  contact: {
    id: Long;
    name: string | null;
    portfolios: Portfolio[];
  };
}

export interface GetPortfoliosByContactQueryVariables {
  contactId: Long;
}

// Transaction types
export interface TransactionSecurity {
  id: Long;
  name: string | null;
  securityCode: string | null;
  isinCode: string | null;
}

export interface TransactionCurrency {
  securityCode: string | null;
}

export interface Transaction {
  id: Long;
  transactionDate: string | null;
  effectiveTransactionDate: string | null;
  settlementDate: string | null;
  typeCode: string | null;
  reference: string | null;
  status: string | null;
  security: TransactionSecurity | null;
  currency: TransactionCurrency | null;
  price: number | null;
}

export interface GetTransactionsByPortfolioQuery {
  transactionsByParameters: Transaction[];
}

export interface GetTransactionsByPortfolioQueryVariables {
  parameters: { portfolioId: number };
}
