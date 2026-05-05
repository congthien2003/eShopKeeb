import type { User } from '@/models/user/entity/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContext';
import { authService } from '@/services/authService';
import { tokenService } from '@/utils/tokenService';

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitializing: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const resetAuthState = useCallback(() => {
    tokenService.clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    const response = await authService.getProfile();

    if (!response.isSuccess) {
      resetAuthState();
      return;
    }

    setUser(response.data);
    setIsAuthenticated(true);
  }, [resetAuthState]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (
          !tokenService.hasAccessToken() ||
          tokenService.isAccessTokenExpired()
        ) {
          resetAuthState();
          return;
        }

        await refreshProfile();
      } catch {
        resetAuthState();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [refreshProfile, resetAuthState]);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authService.login({ email, password });

      if (response.tokens) {
        tokenService.setTokens(response.tokens);
      }
      await refreshProfile();
    },
    [refreshProfile],
  );

  const logout = useCallback(async () => {
    try {
      if (tokenService.hasAccessToken()) {
        await authService.logout();
      }
    } finally {
      resetAuthState();
    }
  }, [resetAuthState]);

  const hasRole = useCallback(
    (roles: string | string[]) => {
      const rolesToCheck = Array.isArray(roles) ? roles : [roles];
      const currentRoles = user?.roles ?? tokenService.getCurrentRoles();

      return rolesToCheck.some((role) => currentRoles.includes(role));
    },
    [user?.roles],
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      isInitializing,
      user,
      login,
      logout,
      refreshProfile,
      hasRole,
    }),
    [
      hasRole,
      isAuthenticated,
      isInitializing,
      login,
      logout,
      refreshProfile,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
