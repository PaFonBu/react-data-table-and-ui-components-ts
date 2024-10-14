export interface Columns<T> {
  header: string;
  field: keyof T;
  type: "string" | "number" | "date" | "boolean";
  hidden?: boolean;
  options?: {
    sort?: boolean;
    filter?: boolean;
    width?: string;
    // TODO: cellFormatter: (cell, row, column, data) => string
    // TODO: headerFormatter: (cell, row, column, data) => string
  };
  filterOption?: FilterOption;
  filterValue?: string;
}

// #region sorting
export interface SortingConfig<T> {
  index: number;
  field: keyof T;
  sort: "ASC" | "DESC" | null;
}
// #endregion sorting

// #region filter
export type FilterOption =
  | "CONTAINS" // for: text, number, date
  | "DOES_NOT_CONTAINS" // for: text
  | "EQUALS" // for: text, number, date
  | "DOES_NOT_EQUALS" // for: text, number, date
  | "BEGINS_WITH" // for: text
  | "ENDS_WITH" // for: text
  | "BLANK" // for: text, number, date, boolean
  | "NOT_BLANK" // for: text, number, date, boolean
  | "GREATER_THAN" // for: number, date
  | "GREATER_THAN_OR_EQUAL_T0" // for: number, date
  | "LESS_THAN" // for: number, date
  | "LESS_THAN_OR_EQUAL_TO" // for: number, date
  | "TRUE" // for: boolean
  | "FALSE" // for: boolean
  | "ALL"; // for: boolean

export interface Filter<T> {
  field: keyof T;
  type: "string" | "number" | "date" | "boolean";
  value: string | number | null;
  filterOption: FilterOption | null;
}
// #endregion filter
