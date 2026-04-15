import { http, HttpResponse } from 'msw';
import type { Contact, Portfolio, Transaction } from '../api/generated';

// Mock data
export const mockContacts: Contact[] = [
  { id: '1', name: 'Alice Johnson' },
  { id: '2', name: 'Bob Smith' },
  { id: '3', name: 'Charlie Brown' },
];

export const mockPortfolios: Portfolio[] = [
  {
    id: '101',
    name: 'Growth Portfolio',
    currency: { securityCode: 'EUR' },
    status: 'A',
    startDate: '2020-01-15',
  },
  {
    id: '102',
    name: 'Income Portfolio',
    currency: { securityCode: 'USD' },
    status: 'A',
    startDate: '2019-06-01',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1001',
    type: { typeCode: 'BUY', typeName: 'Buy' },
    security: { name: 'Apple Inc.', securityCode: 'AAPL' },
    tradeDate: '2024-01-15',
    amount: -15000,
    quantity: 100,
    price: 150,
    currency: { securityCode: 'USD' },
  },
  {
    id: '1002',
    type: { typeCode: 'SELL', typeName: 'Sell' },
    security: { name: 'Microsoft Corp', securityCode: 'MSFT' },
    tradeDate: '2024-01-10',
    amount: 20000,
    quantity: 50,
    price: 400,
    currency: { securityCode: 'USD' },
  },
  {
    id: '1003',
    type: { typeCode: 'DIVIDEND', typeName: 'Dividend' },
    security: { name: 'Johnson & Johnson', securityCode: 'JNJ' },
    tradeDate: '2024-01-05',
    amount: 500,
    quantity: null,
    price: null,
    currency: { securityCode: 'USD' },
  },
];

export const handlers = [
  http.post('/api/graphql', async ({ request }) => {
    const body = await request.json() as { query: string; variables?: Record<string, unknown> };
    const { query } = body;

    // Handle GetActiveContacts query
    if (query.includes('GetActiveContacts')) {
      return HttpResponse.json({
        data: {
          contacts: mockContacts,
        },
      });
    }

    // Handle GetPortfoliosByContact query
    if (query.includes('GetPortfoliosByContact')) {
      return HttpResponse.json({
        data: {
          portfolios: mockPortfolios,
        },
      });
    }

    // Handle GetTransactionsByPortfolio query
    if (query.includes('GetTransactionsByPortfolio')) {
      return HttpResponse.json({
        data: {
          transactions: mockTransactions,
        },
      });
    }

    return HttpResponse.json({ errors: [{ message: 'Unknown query' }] }, { status: 400 });
  }),
];
