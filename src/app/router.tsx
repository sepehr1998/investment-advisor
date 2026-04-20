import {Suspense} from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/layout/root-layout';
import { Spinner } from '../components/ui/spinner';
import { ContactsPage } from "../pages/contacts-page.tsx";
import { PortfoliosPage } from "../pages/portfolios-page.tsx";
import { TransactionsPage } from "../pages/transactions-page.tsx";

function PageFallback() {
  return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
  );
}

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
        element: (
            <Suspense fallback={<PageFallback />}>
              <ContactsPage />
            </Suspense>
        ),
      },
      {
        path: 'contacts/:contactId',
        element: (
            <Suspense fallback={<PageFallback />}>
              <PortfoliosPage />
            </Suspense>
        ),
      },
      {
        path: 'contacts/:contactId/portfolios/:portfolioId',
        element: (
            <Suspense fallback={<PageFallback />}>
              <TransactionsPage />
            </Suspense>
        ),
      },
    ],
  },
]);
