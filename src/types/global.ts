//? Filter Form
export type FormFilterFields = {
  AuthorId?: string;
  CategoryId?: string;
  Search?: string;
  // date: { DateFrom: Date; DateTo: Date };
};

//? Filter Query Params
export type QueryParams = {
  AuthorId?: string;
  CategoryIds?: string;
  Search?: string;
  // DateFrom: string;
  // DateTo: string;
  // PageNumber?: string;
  // PageSize?: string;
};
