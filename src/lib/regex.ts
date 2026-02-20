import { z } from 'zod';

export const namePattern = /^[A-Za-z\s]+$/;
export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const phonePattern =
  /^(?:\+39\s?|0039\s?|39\s?)?(?:3\d{2}|\d{2,4})\s?\d{6,8}$/;
export const egyptPhonePattern =
  /^\+?(20)?\s?(?:01[0125]\d{8}|0[2-9]\d{8}|1[0-9]{9})$/;
export const filePattern = /\.(doc|docx|pdf)$/i;
export const passwordPattern = new RegExp(
  /^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
);
export const passwordSchema = z.string().regex(passwordPattern, {
  message:
    'Password must contain at least 8 characters including uppercase, lowercase, number and special character',
});
