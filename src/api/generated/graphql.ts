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

export interface ContactParametersInput {
  name?: string;
  contactId?: Long;
  extId?: string;
  status?: string;
  address?: string;
  nationalityCode?: string;
  contactTypeCode?: string;
  contactSubTypeCode?: string;
  identityCode?: string;
  classificationCode?: string;
  classificationCode2?: string;
  classificationCode3?: string;
  postcode?: string;
  languageCode?: string;
  portfolioIds?: Long[];
  juridicalCode?: string;
  city?: string;
  lastModifiedStartDate?: string;
  lastModifiedEndDate?: string;
  tags?: string[];
  resultSize?: number;
}

export interface GetContactsByParametersQuery {
  contactsByParameters: Contact[];
}

export interface GetContactsByParametersQueryVariables {
  parameters?: ContactParametersInput;
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

export interface PortfolioParametersInput {
  ids?: string[];
  name?: string;
  extId?: string;
  status?: string;
  typeCode?: string;
  currencyCode?: string;
  ruleSetCode?: string;
  modelPortfolioShortName?: string;
  languageCode?: string;
  juridicalCode?: string;
  countryCode?: string;
  valuationMethod?: string;
  custodyCode?: string;
  bookEntry?: string;
  lastModifiedStartDate?: string;
  lastModifiedEndDate?: string;
  tags?: string[];
}

export interface GetPortfoliosByParametersQuery {
  portfoliosByParameters: Portfolio[];
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

export interface TransactionParametersInput {
  portfolioId?: number;
  typeCode?: string;
  startTrId?: number;
  reference?: string;
  currencyId?: string;
  status?: string;
  securityCode?: string;
  transactionDateStart?: string;
  transactionDateEnd?: string;
  settlementStartDate?: string;
  settlementEndDate?: string;
  tags?: string[];
  lastModifiedStartDate?: string;
  lastModifiedEndDate?: string;
}

export interface GetTransactionsByPortfolioQueryVariables {
  parameters: TransactionParametersInput;
}
