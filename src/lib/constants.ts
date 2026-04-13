// Application
export const APP_NAME = 'FA Platform';

// Auth
export const AUTH_LOADING_MESSAGE = 'Initializing authentication...';
export const AUTH_ERROR_MESSAGE = 'Authentication failed. Please try again.';

// Contacts
export const CONTACTS_TITLE = 'Contacts';
export const CONTACTS_EMPTY_MESSAGE = 'No active contacts found.';
export const CONTACTS_ERROR_MESSAGE = 'Failed to load contacts.';
export const CONTACTS_SEARCH_PLACEHOLDER = 'Search contacts...';

// Portfolios
export const PORTFOLIOS_TITLE = 'Portfolios';
export const PORTFOLIOS_EMPTY_MESSAGE = 'No portfolios found for this contact.';
export const PORTFOLIOS_ERROR_MESSAGE = 'Failed to load portfolios.';

// Transactions
export const TRANSACTIONS_TITLE = 'Transactions';
export const TRANSACTIONS_EMPTY_MESSAGE = 'No transactions found for this portfolio.';
export const TRANSACTIONS_ERROR_MESSAGE = 'Failed to load transactions.';

// Transaction types
export const TRANSACTION_TYPES = {
  BUY: 'BUY',
  SELL: 'SELL',
  DIVIDEND: 'DIVIDEND',
  COUPON: 'COUPON',
} as const;

export const TRANSACTION_TYPE_LABELS: Record<string, string> = {
  BUY: 'Buy',
  SELL: 'Sell',
  DIVIDEND: 'Dividend',
  COUPON: 'Coupon',
};

// Filter options
export const TRANSACTION_FILTER_OPTIONS = [
  { value: 'ALL', label: 'All' },
  { value: 'BUY', label: 'Buy' },
  { value: 'SELL', label: 'Sell' },
  { value: 'DIVIDEND', label: 'Dividend' },
  { value: 'COUPON', label: 'Coupon' },
] as const;

// UI
export const TRY_AGAIN_BUTTON = 'Try again';
export const LOGOUT_BUTTON = 'Log out';
export const RELOAD_PAGE_BUTTON = 'Reload page';
