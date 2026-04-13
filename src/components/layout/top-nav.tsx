import { useAuth } from '../../auth/use-auth';
import { APP_NAME, LOGOUT_BUTTON } from '../../lib/constants';

export function TopNav() {
  const { keycloak, logout } = useAuth();

  const userName =
    keycloak.tokenParsed?.name ||
    keycloak.tokenParsed?.preferred_username ||
    'User';

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">{APP_NAME}</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">{userName}</span>
          <button
            onClick={logout}
            className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {LOGOUT_BUTTON}
          </button>
        </div>
      </div>
    </header>
  );
}
