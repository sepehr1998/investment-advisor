import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../../auth/protected-route';
import { AppShell } from './app-shell';

export function RootLayout() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Outlet />
      </AppShell>
    </ProtectedRoute>
  );
}
