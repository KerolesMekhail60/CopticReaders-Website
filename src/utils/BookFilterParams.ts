// utils/bookFilters.ts
export interface BookFilterParams {
  pageNumber?: string;
  pageSize?: string;
  searchTerm?: string;
  isAvailable?: string;
  authorId?: string;
  categoryId?: string;
  publishedId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const buildBookQueryString = (
  searchParams: BookFilterParams = {},
): string => {
  const params = new URLSearchParams();

  const {
    pageNumber = '1',
    pageSize = '12',
    searchTerm,
    isAvailable,
    authorId,
    categoryId,
    publishedId,
    dateFrom,
    dateTo,
  } = searchParams;

  params.append('PageNumber', pageNumber);
  params.append('PageSize', pageSize);

  // Add optional filters only if they exist
  if (searchTerm) params.append('Search', searchTerm);
  if (isAvailable) params.append('IsAvailable', isAvailable);
  if (authorId) params.append('AuthorId', authorId);
  if (categoryId) params.append('CategoryIds', categoryId);
  if (publishedId) params.append('PublishedId', publishedId);
  if (dateFrom) params.append('DateFrom', dateFrom);
  if (dateTo) params.append('DateTo', dateTo);

  return params.toString();
};
