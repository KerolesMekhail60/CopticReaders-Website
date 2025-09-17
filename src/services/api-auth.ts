import Cookies from 'js-cookie';

import { LoginParams } from '@/types';

import { getAllData, postData } from '@/utils';

import { REFRESH_TOKEN, TOKEN } from '@/constants';

export async function getCurrentUser() {
  const token = Cookies.get(TOKEN);

  const { result } = await getAllData('Users/userData', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}

export async function loginApi({ email, password }: LoginParams) {
  const res = await postData('Account/adminLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res.result;
}

export async function refreshTokenApi() {
  const token = Cookies.get(TOKEN);
  const refreshToken = Cookies.get(REFRESH_TOKEN);

  const res = await postData('Account/refreshToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      accessToken: token,
      refreshToken: refreshToken,
    }),
  });

  const options = {
    expires: new Date(res.refreshTokenExpiryTime),
  };

  Cookies.set(TOKEN, res.accessToken, options);
  Cookies.set(REFRESH_TOKEN, res.refreshToken, options);
  return res;
}

export async function forgetPasswordApi({ email }: { email: string }) {
  await postData(`Account/sendForgetPasswordOtp?emailOrPhoneNumber=${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return email;
}

export async function otpApi({ otp, email }: { otp: string; email: string }) {
  await postData(`Account/validateOtp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      otp,
      EmailOrPhoneNumber: email,
    }),
  });

  return { otp, email };
}

export async function resetPasswordApi({
  password,
  email,
  otp,
}: {
  password: string;
  email: string;
  otp: string;
}) {
  await postData('Account/forgetPassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newPassword: password,
      otp,
      emailOrPhoneNumber: email,
    }),
  });
}
