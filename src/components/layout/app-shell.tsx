import type { ReactNode } from 'react';
import { TopNav } from './top-nav';
import { Breadcrumb } from '../ui/breadcrumb';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>
      <main className="h-[calc(100vh-7rem)] overflow-auto">{children}</main>
    </div>
  );
}
