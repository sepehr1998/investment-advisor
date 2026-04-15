import { useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import keycloak from './keycloak';
import { AuthContext } from './auth-context';
import { AUTH_LOADING_MESSAGE } from '../lib/constants';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const initStarted = useRef(false);

  const logout = useCallback(() => {
    keycloak.logout();
  }, []);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initStarted.current) {
      return;
    }
    initStarted.current = true;

    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        });

        setIsAuthenticated(authenticated);
        setIsInitialized(true);
      } catch (error) {
        console.error('Keycloak initialization failed:', error);
        sessionStorage.clear();
        keycloak.logout();
      }
    };

    initKeycloak();
  }, []);

  // Token refresh interval
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const refreshInterval = setInterval(() => {
      keycloak
        .updateToken(60)
        .then((refreshed) => {
          if (refreshed) {
            console.debug('Token refreshed');
          }
        })
        .catch(() => {
          console.error('Token refresh failed');
          logout();
        });
    }, 30000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [isAuthenticated, logout]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          <p className="mt-4 text-sm text-gray-600">{AUTH_LOADING_MESSAGE}</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ keycloak, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
