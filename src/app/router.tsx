import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/layout/root-layout';
import { Spinner } from '../components/ui/spinner';

const ContactsPage = lazy(() =>
  import('../pages/contacts-page').then((m) => ({ default: m.ContactsPage }))
);
const PortfoliosPage = lazy(() =>
  import('../pages/portfolios-page').then((m) => ({ default: m.PortfoliosPage }))
);
const TransactionsPage = lazy(() =>
  import('../pages/transactions-page').then((m) => ({ default: m.TransactionsPage }))
);

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
