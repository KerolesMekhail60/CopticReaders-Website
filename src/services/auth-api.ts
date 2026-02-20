import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from '@/types';

import { getAllData, postData } from '@/utils/api';

export async function registerApi(data: RegisterRequest) {
  const res = await postData('accounts/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    },
    body: JSON.stringify(data),
  });

  return res;
}

export async function verifyOtpApi(data: VerifyOtpRequest) {
  const res = await postData('accounts/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    },
    body: JSON.stringify(data),
  });

  return res.result as LoginResponse;
}

export async function resendOtpApi(email: string) {
  const res = await postData('accounts/resend-reset-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    },
    body: JSON.stringify(email),
  });

  return res;
}

export async function validateResetOtpApi(data: {
  email: string;
  otp: string;
}) {
  const res = await postData('accounts/validate-reset-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    },
    body: JSON.stringify(data),
  });

  return res;
}

export async function loginApi(data: LoginRequest) {
  const res = await postData('accounts/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    },
    body: JSON.stringify(data),
  });

  return res.result as LoginResponse;
}

export async function logoutApi(token: string) {
  const res = await postData('accounts/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return res;
}

export async function forgotPasswordApi(
  data: ForgotPasswordRequest,
  token?: string,
) {
  const res = await postData('accounts/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ email: data.email }),
  });

  return res;
}

export async function resetPasswordApi(
  data: ResetPasswordRequest,
  token: string,
) {
  const res = await postData('accounts/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/plain',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: data.email,
      otp: data.otp,
      newPassword: data.newPassword,
    }),
  });

  return res;
}

export async function changePasswordApi(
  data: ChangePasswordRequest,
  token: string,
) {
  const res = await postData('accounts/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }),
  });

  return res;
}

export async function refreshTokenApi(refreshToken: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/refresh-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'text/plain',
      },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  if (data?.isError) {
    throw new Error(data?.message);
  }

  return data.result;
}

export async function getProfileApi(token: string) {
  const res = await getAllData('accounts/profile', {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.result as ProfileResponse;
}

export type UpdateProfileRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cityId?: string;
  areaId?: string;
  churchId?: string;
  profilePictureUrl?: File | string;
  message?: string;
  isError?: boolean;
};

export async function updateProfileApi(
  data: UpdateProfileRequest,
  token: string,
  locale: string = 'en',
) {
  const formData = new FormData();

  // Append all fields to FormData
  formData.append('FirstName', data.firstName);
  formData.append('LastName', data.lastName);
  formData.append('PhoneNumber', data.phoneNumber);

  // Append optional fields only if they have values
  if (data.cityId) {
    formData.append('CityId', data.cityId);
  }
  if (data.areaId) {
    formData.append('AreaId', data.areaId);
  }
  if (data.churchId) {
    formData.append('ChurchId', data.churchId);
  }
  if (data.profilePictureUrl instanceof File) {
    formData.append('ProfilePictureUrl', data.profilePictureUrl);
  } else if (
    typeof data.profilePictureUrl === 'string' &&
    data.profilePictureUrl
  ) {
    // If it's a URL string, you might want to handle it differently
    // depending on the backend requirements
    formData.append('ProfilePictureUrl', data.profilePictureUrl);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/accounts/profile`, {
    method: 'PUT',
    headers: {
      // Don't set Content-Type when sending FormData - browser will set it with correct boundary
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Accept-Language': locale,
    },
    body: formData,
  });

  const responseData = await res.json();

  // Return the full response object including isError and message
  return responseData;
}

export async function googleAuthApi(externalToken?: string) {
  if (!externalToken) {
    throw new Error('External token is required for Google authentication');
  }

  const res = await getAllData(`ExternalAuth/google/login`, {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${externalToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();

  if (data?.isError) {
    throw new Error(data?.message || 'Google login failed');
  }

  return data.result as LoginResponse;
}
