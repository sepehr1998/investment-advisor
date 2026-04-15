import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/layout/root-layout';
import { ContactsPage } from '../pages/contacts-page';
import { PortfoliosPage } from '../pages/portfolios-page';
import { TransactionsPage } from '../pages/transactions-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/contacts" replace />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
      {
        path: 'contacts/:contactId',
        element: <PortfoliosPage />,
      },
      {
        path: 'contacts/:contactId/portfolios/:portfolioId',
        element: <TransactionsPage />,
      },
    ],
  },
]);
