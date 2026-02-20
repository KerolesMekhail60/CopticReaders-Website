export type Params = Promise<{ locale: string }>;

//? Shared
export type SelectItem = {
  label: string;
  value: string;
};

export type Item = {
  id: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
};

export type Image = {
  id: string;
  imageUrl: string;
  imageName: string | null;
};

//? Table

//? Auth Pages
export type LoginParams = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  message: string;
  isAuthenticated: boolean;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  token: string;
  expiresOn: string;
  accountType: number;
  refreshToken: string;
  imageUrl: string | null;
  profilePictureUrl?: string;
  refreshTokenExpiration: string;
  role: string;
};

//? Addresses
export type City = {
  id: string;
  name: string;
  createdOn: string;
};

export type Area = {
  id: string;
  name: string;
  createdOn: string;
};

export type Country = {
  id: string;
  name: string;
  createdOn: string;
};
export type Church = {
  id: string;
  name: string;
  areaId: string;
  areaName: string;
  cityId: string;
  cityName: string;
  createdOn: string;
  createdOnFormatted: string;
};

export type PaginatedAddressResponse<T> = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  result: T[];
  totalPages: number;
};

export type PaginatedChurchResponse = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  result: Church[];
  totalPages: number;
};

//? Authentication
export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  cityId?: string;
  areaId?: string;
  churchId?: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  message: string;
  isAuthenticated: boolean;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  token: string;
  expiresOn: string;
  accountType: number;
  refreshToken: string;
  imageUrl: string | null;
  refreshTokenExpiration: string;
  profilePictureUrl?: string;
  role: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  otp: string;
  newPassword: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type ProfileResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl?: string;
  countryId?: string;
  cityId: string;
  areaId: string;
  churchId: string;
  emailConfirmed: boolean;
  message: string;
  isError: boolean;
};

export type BookStatus = 'Active' | 'Inactive';

export type BookType = {
  bookId: string;
  id?: string;
  image?: File[];
  fileUrl?: string;
  title?: string;
  titleEn?: string;
  titleAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  bookAuthors?: Author[];
  firstAuthor?: Author;
  bookCategories?: Category[];
  publisher?: Publisher;
  publishYear?: number;
  isAvailable?: boolean;
  createdOn?: string;
  pagesCount?: number;
  cover?: string;
  coverUrl?: string;
  isFavorite?: boolean;
  categories?: Category[];
};

export type PaginatedBooksResponse = {
  result?: BookType[];
  totalCount?: number;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
};

export type Category = {
  id?: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  subCategoryIds?: SubCategory[] | string[];
  subCategories?: SubCategory[];
};

export type SubCategory = {
  id?: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
};

export type Publisher = {
  id?: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;

  bio?: string;
  bioEn?: string;
  bioAr?: string;

  image?: string | File | File[];
  profilePictureUrl?: string;
};

export type Author = {
  id?: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
  bio?: string;
  bioEn?: string;
  bioAr?: string;
  image?: string | File | File[];
  imageUrl?: string;
  profilePictureUrl?: string;
};

export type PageLink = {
  labelEn: string;
  labelAr: string;
  href: string;
};

export type QuoteItem = {
  id: string;
  status: number;
  quote: string;
  author: string;
  reference: string;
};

export type QuotesResult = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  result: QuoteItem[];
  totalPages: number;
};

export type About = {
  title: string;
  description: string;
  imageUrl: string;
};
export type Vision = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};
export type SocialMediaItem = {
  id: string | number;
  url: string;
  nameEn: string;
  nameAr: string;
  iconUrl: string;
};
