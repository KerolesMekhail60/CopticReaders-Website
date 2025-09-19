import { ColumnDef } from '@tanstack/react-table';

//? Shared
export type SelectItem = {
  label: string;
  value: string;
};

export type Item = {
  id: string;
  nameEn: string;
  nameIt: string;
};

export type Image = {
  id: string;
  imageUrl: string;
  imageName: string | null;
};

//? Table
export type TableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  totalCount: number;
};

//? Auth Pages
export type LoginParams = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  token: string;
  refreshToken: string;
  expiresOn: string;
  roleId: string;
  roleNameEn: string;
  roleNameIt: string;
  isSuspended: boolean;
};

export type BookStatus = 'Active' | 'Inactive';

export interface Book {
  id: string;
  bookName: string;
  publishYear: number;
  authors: string; // single string, not array
  category: string;
  addedDate: string; // ISO format yyyy-mm-dd
  status: BookStatus;
}
