import { createContext } from 'react';
import type Keycloak from 'keycloak-js';

interface AuthContextValue {
  keycloak: Keycloak;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
