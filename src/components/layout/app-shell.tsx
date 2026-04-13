import type { ReactNode } from 'react';
import { TopNav } from './top-nav';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="h-[calc(100vh-4rem)] overflow-auto">{children}</main>
    </div>
  );
}
