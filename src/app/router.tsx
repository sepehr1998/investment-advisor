import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../auth/protected-route';
import { AppShell } from '../components/layout/app-shell';
import { ContactsPage } from '../pages/contacts-page';

function PortfoliosPage() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900">Portfolios</h2>
      <p className="mt-2 text-sm text-gray-600">Portfolios page</p>
    </div>
  );
}

function TransactionsPage() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900">Transactions</h2>
      <p className="mt-2 text-sm text-gray-600">
        Transactions page
      </p>
    </div>
  );
}

function RootLayout() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Outlet />
      </AppShell>
    </ProtectedRoute>
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
