/* eslint-disable @typescript-eslint/no-explicit-any */
import { claimTypesConstants } from '@/constants/claimTypes';
import type { UserInfo } from '@/stores/user/userInfo';
import { jwtDecode } from 'jwt-decode';

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export class TokenService {
  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
  }

  setTokens(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);

    if (tokens.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    }
  }

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  hasAccessToken(): boolean {
    return Boolean(this.getAccessToken());
  }

  isAccessTokenExpired(): boolean {
    const user = this.getUserInfo();

    if (!user?.exp) {
      return false;
    }

    return user.exp * 1000 <= Date.now();
  }

  getCurrentRoles(): string[] {
    const user = this.getUserInfo();
    const roles = user?.roles ?? [];

    return Array.isArray(roles) ? roles : [roles];
  }

  getUserInfo(): UserInfo | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const claims = jwtDecode<any>(token);
      const rawRoles = claims[claimTypesConstants.roles];
      const roles = Array.isArray(rawRoles)
        ? rawRoles
        : rawRoles
          ? [rawRoles]
          : [];

      const user: UserInfo = {
        nameid: claims[claimTypesConstants.id],
        fullName: claims[claimTypesConstants.fullName],
        email: claims[claimTypesConstants.email],
        roles,
        exp: claims[claimTypesConstants.exp],
      };
      return user;
    } catch (error) {
      console.error('Decode token failed', error);
      return null;
    }
  }
}

export const tokenService = new TokenService();
