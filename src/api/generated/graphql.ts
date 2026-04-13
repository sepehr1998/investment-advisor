// Generated types based on GraphQL queries
// Note: These types are manually defined since the schema requires authentication

// Scalar types
export type Long = string;

// Contact types
export interface Contact {
  id: Long;
  name: string | null;
}

export interface GetActiveContactsQuery {
  contactsByParameters: Contact[];
}

// Portfolio types
export interface Currency {
  securityCode: string | null;
}

export interface Portfolio {
  id: Long;
  name: string | null;
  currency: Currency | null;
  status: string | null;
  startDate: string | null;
}

export interface GetPortfoliosByContactQuery {
  portfoliosByParameters: Portfolio[];
}

export interface GetPortfoliosByContactQueryVariables {
  contactId: Long;
}

// Transaction types
export interface TransactionType {
  typeCode: string | null;
  typeName: string | null;
}

export interface Security {
  name: string | null;
  securityCode: string | null;
}

export interface Transaction {
  id: Long;
  type: TransactionType | null;
  security: Security | null;
  tradeDate: string | null;
  amount: number | null;
  quantity: number | null;
  price: number | null;
  currency: Currency | null;
}

export interface GetTransactionsByPortfolioQuery {
  transactionsByParameters: Transaction[];
}

export interface GetTransactionsByPortfolioQueryVariables {
  portfolioId: Long;
}
