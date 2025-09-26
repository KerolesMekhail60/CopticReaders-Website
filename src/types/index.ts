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

export type BookType = {
  bookId: string;
  id?: string;
  image?: File[];
  file?: File[];
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  author: Author[];
  bookCatogray: Category[];
  publisher: Publisher;
  publisherYear: number;
  status: boolean;
  addDate: string;
};

export type Category = {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
};
export type Publisher = {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  imageUrl?: string;
};
export type Author = {
  id: string;
  name: string;
  nameAr: string;
  imageUrl?: string;
  bio?: string;
  bioAr?: string;
};
