export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
