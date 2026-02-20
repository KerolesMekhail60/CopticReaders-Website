'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';

import type { LoginResponse, ProfileResponse } from '@/types';

import { subscribeTokenRefresh } from '@/utils/token-refresh';

import { getProfileApi } from '@/services/auth-api';

const ACCESS_TOKEN_COOKIE = 'coptic_reader_access_token';
const REFRESH_TOKEN_COOKIE = 'coptic_reader_refresh_token';
const LEGACY_ACCESS_TOKEN_COOKIE = 'access_token';
const LEGACY_REFRESH_TOKEN_COOKIE = 'refresh_token';
const USER_DATA_KEY = 'coptic_reader_user_data';

interface AuthContextType {
  user: LoginResponse | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (userData: LoginResponse) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to merge profile data with login response
  const mergeProfileData = (
    loginData: LoginResponse,
    profileData: ProfileResponse,
  ): LoginResponse => {
    return {
      ...loginData,
      id: profileData.id,
      fullName: profileData.fullName,
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      profilePictureUrl: profileData.profilePictureUrl,
      // Keep token and other auth-related fields from loginData
    };
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);

    if (typeof window !== 'undefined') {
      // Remove cookies (remove with same domain/path options as set)
      const cookieOptions = {
        path: '/',
        sameSite: 'lax' as const,
      };

      // Remove current cookies
      Cookies.remove(ACCESS_TOKEN_COOKIE, cookieOptions);
      Cookies.remove(REFRESH_TOKEN_COOKIE, cookieOptions);

      // Remove legacy cookies (for compatibility with token-refresh.ts)
      Cookies.remove(LEGACY_ACCESS_TOKEN_COOKIE, cookieOptions);
      Cookies.remove(LEGACY_REFRESH_TOKEN_COOKIE, cookieOptions);

      // Also try removing without options (for backwards compatibility)
      Cookies.remove(ACCESS_TOKEN_COOKIE);
      Cookies.remove(REFRESH_TOKEN_COOKIE);
      Cookies.remove(LEGACY_ACCESS_TOKEN_COOKIE);
      Cookies.remove(LEGACY_REFRESH_TOKEN_COOKIE);

      // Remove user data from localStorage
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem('user_data');
      localStorage.removeItem('auth_token');
    }
  }, []);

  // Fetch profile data and update user
  const fetchAndUpdateProfile = useCallback(async (authToken: string) => {
    try {
      const profileData = await getProfileApi(authToken);
      const storedUser = localStorage.getItem(USER_DATA_KEY);
      if (storedUser) {
        const loginData = JSON.parse(storedUser) as LoginResponse;
        const mergedData = mergeProfileData(loginData, profileData);
        setUser(mergedData);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(mergedData));
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Don't logout on profile fetch failure, just log the error
    }
  }, []);

  // Load user data from cookies and localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = Cookies.get(ACCESS_TOKEN_COOKIE);
      const storedRefreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);
      const storedUser = localStorage.getItem(USER_DATA_KEY);

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken || null);
          const parsedUser = JSON.parse(storedUser) as LoginResponse;
          setUser(parsedUser);

          // Fetch fresh profile data
          fetchAndUpdateProfile(storedToken);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          logout();
        }
      }
      setIsLoading(false);
    }
  }, [fetchAndUpdateProfile, logout]);

  // Subscribe to token refresh updates
  useEffect(() => {
    const handleTokenRefresh = (newToken: string) => {
      setToken(newToken);
      // Update user data with new token
      const storedUser = localStorage.getItem(USER_DATA_KEY);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          parsedUser.token = newToken;
          setUser(parsedUser);
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(parsedUser));
        } catch (error) {
          console.error('Failed to update user data:', error);
        }
      }
    };

    subscribeTokenRefresh(handleTokenRefresh);

    return () => {
      // Cleanup function would be here if we had unsubscribe
    };
  }, []);

  const login = async (userData: LoginResponse) => {
    setUser(userData);
    setToken(userData.token);
    setRefreshToken(userData.refreshToken);

    if (typeof window !== 'undefined') {
      // Store tokens in cookies (7 days for refresh token)
      Cookies.set(ACCESS_TOKEN_COOKIE, userData.token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      Cookies.set(REFRESH_TOKEN_COOKIE, userData.refreshToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // Store user data in localStorage (not sensitive info)
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

      // Fetch and merge profile data
      try {
        const profileData = await getProfileApi(userData.token);
        const mergedData = mergeProfileData(userData, profileData);
        setUser(mergedData);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(mergedData));
      } catch (error) {
        console.error('Failed to fetch profile after login:', error);
        // Continue with login even if profile fetch fails
      }
    }
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
