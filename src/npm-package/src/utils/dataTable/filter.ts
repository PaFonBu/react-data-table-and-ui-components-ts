import { DateTime } from "luxon";
import {
  FilterOption,
  Columns,
  Filter,
} from "../../ts/interfaces/dataTable.interface";

export const searchBarFilter = <T>(
  searchInput: string | null,
  row: T,
  columnsToDisplay: Columns<T>[]
) =>
  columnsToDisplay
    .map(({ field }) => {
      if (!searchInput) return true;
      if (!(row[field as keyof T] as string | number | boolean)) return false;
      if (
        (row[field as keyof T] as string | number | boolean)
          .toString()
          .toUpperCase()
          .includes(searchInput.toUpperCase())
      )
        return true;
      return false;
    })
    .some((item) => item);

export const filterOptionsByType: {
  label: string;
  value: FilterOption;
  type: ("string" | "number" | "date" | "boolean")[];
}[] = [
  {
    label: "All",
    value: "ALL",
    type: ["string", "number", "date", "boolean"],
  },
  {
    label: "Contains",
    value: "CONTAINS",
    type: ["string"],
  },
  {
    label: "Does not contains",
    value: "DOES_NOT_CONTAINS",
    type: ["string"],
  },
  {
    label: "Equals",
    value: "EQUALS",
    type: ["string", "number", "date"],
  },
  {
    label: "Does not equals",
    value: "DOES_NOT_EQUALS",
    type: ["string", "number", "date"],
  },
  // {
  //   label: "Begins with",
  //   value: "BEGINS_WITH",
  //   type: ["string"],
  // },
  // {
  //   label: "Ends with",
  //   value: "ENDS_WITH",
  //   type: ["string"],
  // },
  {
    label: "Greater than",
    value: "GREATER_THAN",
    type: ["number", "date"],
  },
  {
    label: "Greater or equal to",
    value: "GREATER_THAN_OR_EQUAL_T0",

    type: ["number", "date"],
  },
  {
    label: "Less than",
    value: "LESS_THAN",
    type: ["number", "date"],
  },
  {
    label: "Less or equal to",
    value: "LESS_THAN_OR_EQUAL_TO",
    type: ["number", "date"],
  },
  {
    label: "True",
    value: "TRUE",
    type: ["boolean"],
  },
  {
    label: "False",
    value: "FALSE",
    type: ["boolean"],
  },
  {
    label: "Blank",
    value: "BLANK",
    type: ["string", "number", "date", "boolean"],
  },
  {
    label: "Not blank",
    value: "NOT_BLANK",
    type: ["string", "number", "date", "boolean"],
  },
];

const filterByOption: {
  [key: string]: (
    filterValue?: string | number | null,
    rowValue?: string | number | boolean
  ) => boolean;
} = {
  ALL: () => true,
  BLANK: (_, rowValue) => {
    if (rowValue === null || rowValue === undefined || rowValue === "")
      return true;
    return false;
  },
  NOT_BLANK: (_, rowValue) => {
    if (!(rowValue === null || rowValue === undefined || rowValue === ""))
      return true;
    return false;
  },
  TRUE: (_, rowValue) => {
    if (rowValue) return true;
    return false;
  },
  FALSE: (_, rowValue) => {
    if (!rowValue) return true;
    return false;
  },
  CONTAINS: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (
      rowValue
        .toString()
        .toUpperCase()
        .includes(filterValue.toString().toUpperCase())
    )
      return true;
    return false;
  },
  DOES_NOT_CONTAINS: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (
      !rowValue
        .toString()
        .toUpperCase()
        .includes(filterValue.toString().toUpperCase())
    )
      return true;
    return false;
  },
  EQUALS: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (
      rowValue.toString().toUpperCase() === filterValue.toString().toUpperCase()
    )
      return true;
    return false;
  },
  DOES_NOT_EQUALS: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (
      rowValue.toString().toUpperCase() !== filterValue.toString().toUpperCase()
    )
      return true;
    return false;
  },
  // BEGINS_WITH: (
  //   filterValue: string | number,
  //   rowValue: string | number | true
  // ) => true,
  // ENDS_WITH: (filterValue: string | number, rowValue: string | number | true) =>
  //   true,
  GREATER_THAN: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (rowValue > filterValue) return true;
    return false;
  },
  GREATER_THAN_OR_EQUAL_T0: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (rowValue >= filterValue) return true;
    return false;
  },
  LESS_THAN: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (rowValue < filterValue) return true;
    return false;
  },
  LESS_THAN_OR_EQUAL_TO: (filterValue, rowValue) => {
    if (!filterValue) return false;
    if (!rowValue) return false;
    if (rowValue <= filterValue) return true;
    return false;
  },
};

export const filterRows = <T>(filters: Filter<T>[], row: T) => {
  // Check if filters are applied
  const appliedFilters = filters.map((filter) => {
    // Check the filter options that do not require a filter value
    if (filter.filterOption === "ALL") return true;
    if (filter.filterOption === "BLANK") return true;
    if (filter.filterOption === "NOT_BLANK") return true;
    if (filter.filterOption === "TRUE") return true;
    if (filter.filterOption === "FALSE") return true;
    // Check the rest that do require a filter value
    return !!filter.value && !!filter.filterOption;
  });
  // If no filters where applied return true
  if (!appliedFilters.some((filter) => filter)) return true;
  // Evaluate filters on each row
  const filteredRow = filters.map(({ field, value, filterOption, type }) => {
    const rowValue = row[field as keyof T] as string | number | boolean;
    if (!filterOption) return false;
    // If the type is a date compare them as iso dates (strings) without time
    if (
      type === "date" &&
      DateTime.fromISO(value?.toString() ?? "").isValid &&
      DateTime.fromISO(rowValue?.toString() ?? "").isValid
    )
      return filterByOption[filterOption](
        DateTime.fromISO(value?.toString() ?? "").toFormat("yyyy-MM-dd"),
        DateTime.fromISO(rowValue?.toString() ?? "").toFormat("yyyy-MM-dd")
      );
    return filterByOption[filterOption](value, rowValue);
  });
  // Check if the row had a filter (this makes no sense, should fix)
  if (filteredRow.toString() === appliedFilters.toString()) return true;
  return false;
};
