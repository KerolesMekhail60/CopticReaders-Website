import Cookies from 'js-cookie';

import { refreshTokenApi } from '@/services/auth-api';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * Add subscriber to be notified when token is refreshed
 */
export function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

/**
 * Remove subscriber from token refresh notifications
 */
export function unsubscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers = refreshSubscribers.filter(
    (subscriber) => subscriber !== cb,
  );
}

/**
 * Notify all subscribers with new token
 */
function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(): Promise<string | null> {
  // Prevent multiple simultaneous refresh attempts
  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh((token) => resolve(token));
    });
  }

  const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);

  if (!refreshToken) {
    return null;
  }

  isRefreshing = true;

  try {
    const response = await refreshTokenApi(refreshToken);

    // Update cookies with new tokens
    Cookies.set(ACCESS_TOKEN_COOKIE, response.token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    if (response.refreshToken) {
      Cookies.set(REFRESH_TOKEN_COOKIE, response.refreshToken, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    // Update localStorage user data with new token
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      parsedUser.token = response.token;
      parsedUser.refreshToken = response.refreshToken;
      localStorage.setItem('user_data', JSON.stringify(parsedUser));
    }

    // Notify all subscribers
    onTokenRefreshed(response.token);

    return response.token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    // Clear tokens on refresh failure
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);
    localStorage.removeItem('user_data');
    return null;
  } finally {
    isRefreshing = false;
  }
}
