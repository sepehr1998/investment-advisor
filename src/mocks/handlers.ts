import { http, HttpResponse } from 'msw';
import type { Contact, Portfolio, Transaction } from '../api/generated';

const GRAPHQL_URL = 'https://tryme.fasolutions.com/api/graphql';

export const mockContacts: Contact[] = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
];

export const mockPortfolios: Portfolio[] = [
  {
    id: 101,
    name: 'Growth Portfolio',
    currency: { securityCode: 'EUR' },
    status: 'A',
    startDate: '2020-01-15',
  },
  {
    id: 102,
    name: 'Income Portfolio',
    currency: { securityCode: 'USD' },
    status: 'A',
    startDate: '2019-06-01',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 1001,
    transactionDate: '2024-01-15',
    effectiveTransactionDate: '2024-01-17',
    settlementDate: '2024-01-17',
    typeCode: 'BUY',
    reference: 'TXN001',
    status: 'SETTLED',
    security: { id: 1, name: 'Apple Inc.', securityCode: 'AAPL', isinCode: 'US0378331005' },
    currency: { securityCode: 'USD' },
    price: 150.25,
  },
  {
    id: 1002,
    transactionDate: '2024-01-10',
    effectiveTransactionDate: '2024-01-12',
    settlementDate: '2024-01-12',
    typeCode: 'SELL',
    reference: 'TXN002',
    status: 'SETTLED',
    security: { id: 2, name: 'Microsoft Corp', securityCode: 'MSFT', isinCode: 'US5949181045' },
    currency: { securityCode: 'USD' },
    price: 400.5,
  },
  {
    id: 1003,
    transactionDate: '2024-01-05',
    effectiveTransactionDate: '2024-01-05',
    settlementDate: '2024-01-05',
    typeCode: 'DIVIDEND',
    reference: 'TXN003',
    status: 'SETTLED',
    security: { id: 3, name: 'Johnson & Johnson', securityCode: 'JNJ', isinCode: 'US4781601046' },
    currency: { securityCode: 'USD' },
    price: null,
  },
];

export const handlers = [
  http.post(GRAPHQL_URL, async ({ request }) => {
    const body = (await request.json()) as {
      query: string;
      variables?: Record<string, unknown>;
    };
    const { query } = body;

    if (query.includes('contactsByParameters')) {
      return HttpResponse.json({
        data: { contactsByParameters: mockContacts },
      });
    }

    if (query.includes('GetPortfoliosByContact')) {
      return HttpResponse.json({
        data: {
          contact: { id: 1, name: 'Alice Johnson', portfolios: mockPortfolios },
        },
      });
    }

    if (query.includes('transactionsByParameters')) {
      return HttpResponse.json({
        data: { transactionsByParameters: mockTransactions },
      });
    }

    return HttpResponse.json(
      { errors: [{ message: 'Unknown query' }] },
      { status: 400 }
    );
  }),
];
