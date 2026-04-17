import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../../auth/protected-route';
import { AppShell } from './app-shell';
import { ErrorBoundary } from '../ui/error-boundary';

export function RootLayout() {
  return (
    <ProtectedRoute>
      <AppShell>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </AppShell>
    </ProtectedRoute>
  );
}
