import { useEffect, useMemo, useState } from "react";
import {
  Header,
  HeaderStyles,
  PaginationSelectOptions,
  ReloadButtonOptions,
  SearchInputOptions,
} from "./Header.dataTable";
import { Footer, FooterStyles } from "./Footer.dataTable";
import { TableHeader } from "./TableHeader.dataTable";
import { ColumnFilter } from "./ColumnFilter.dataTable";
import { sortRows } from "../../utils/dataTable/sort";
import { filterRows, searchBarFilter } from "../../utils/dataTable/filter";
import {
  Columns,
  Filter,
  SortingConfig,
} from "../../ts/interfaces/dataTable.interface";

export const DataTable = <T,>({
  columns,
  rows,
  options,
  styles,
}: DataTableProps<T>) => {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sort, setSort] = useState<SortingConfig<T>[]>(
    columns.map((column, index) => ({ index, field: column.field, sort: null }))
  );

  const [filters, setFilters] = useState<Filter<T>[]>(
    columns.map((column) => ({
      field: column.field,
      type: column.type,
      value: null,
      filterOption: null,
    }))
  );

  const columnsToDisplay = useMemo(
    () => columns.filter((column) => !column.hidden),
    [columns]
  );

  const rowsToDisplay = useMemo(
    () =>
      rows
        .filter((row) => filterRows(filters, row))
        .filter((row) => searchBarFilter(searchInput, row, columnsToDisplay))
        .sort((a, b) => sortRows(sort, a, b)),
    [rows, columnsToDisplay, searchInput, sort, filters]
  );

  const numberOfPages = useMemo(
    () =>
      Math.ceil(rowsToDisplay.length ? rowsToDisplay.length / rowsPerPage : 0),
    [rowsPerPage, rowsToDisplay]
  );

  const paginatedRows = useMemo(
    () =>
      rowsToDisplay.slice(
        currentPage * rowsPerPage - rowsPerPage,
        currentPage * rowsPerPage
      ),
    [rowsToDisplay, currentPage, rowsPerPage]
  );

  useEffect(() => setCurrentPage(1), [searchInput]);

  return (
    <div className={`flex flex-col gap-1 ${styles?.container ?? ""}`}>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        options={options}
        styles={styles?.header}
      />
      <div className={styles?.tableContainer ?? ""}>
        <table className={`w-full border-hidden ${styles?.table ?? ""}`}>
          <thead>
            <tr className={styles?.tableHeaders ?? ""}>
              {columnsToDisplay.map((column, index) => (
                <th
                  className={`
                    relative
                    last:rounded-tr-lg first:rounded-tl-lg
                    ${styles?.tableHeader ?? ""}`}
                  key={index}
                >
                  <TableHeader
                    column={column}
                    sort={sort}
                    setSort={setSort}
                    isMultiSortEnabled={options?.isMultiSortEnabled}
                    isSortEnabled={column.options?.sort}
                  />
                </th>
              ))}
            </tr>
            {columnsToDisplay.some(
              (column) => column?.options?.filter === true
            ) && (
              <tr>
                {columnsToDisplay.map((column, index) => (
                  <td
                    className={`bg-red-300 ${styles?.filter ?? ""}`}
                    key={index}
                  >
                    <ColumnFilter<T>
                      filter={
                        filters.find(
                          (filter) => filter.field === column.field
                        ) || null
                      }
                      setFilters={setFilters}
                    />
                    {
                      filters.find((filter) => filter.field === column.field)
                        ?.value
                    }
                  </td>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {(!options?.paginationSelect?.isDisabled
              ? paginatedRows
              : rowsToDisplay
            ).map((row, rowIndex) => (
              <tr
                className={`bg-slate-700 odd:bg-slate-600 ${
                  styles?.tableRow ?? ""
                }`}
                key={rowIndex}
              >
                {!!row &&
                  columns
                    .filter((column) => !column.hidden)
                    // .map((column) => column.field)
                    .map(({ field, type }, propIndex) => (
                      <td
                        className={`px-6 py-4 ${styles?.tableCell ?? ""}`}
                        key={propIndex}
                      >
                        {type === "boolean"
                          ? (row[field as keyof T] as boolean)
                            ? "true"
                            : "false"
                          : (row[field as keyof T] as string | number)}
                      </td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!options?.paginationSelect?.isDisabled && (
          <Footer
            numberOfRows={rowsToDisplay.length}
            rowsPerPage={rowsPerPage}
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            styles={styles?.footer}
          />
        )}
      </div>
    </div>
  );
};

interface DataTableProps<T> {
  columns: Columns<T>[];
  rows: T[];
  options?: {
    searchInput?: SearchInputOptions;
    reloadButton?: ReloadButtonOptions;
    paginationSelect?: PaginationSelectOptions;
    isMultiSortEnabled?: boolean;
    // TODO: exportCsv?: boolean;
    // TODO: exportXlsx?: boolean;
    // TODO: backendPagination?: boolean
  };
  styles?: {
    container?: string;
    table?: string;
    tableContainer?: string;
    tableHeaders?: string;
    tableHeader?: string;
    tableCell?: string;
    tableRow?: string;
    header?: HeaderStyles;
    footer?: FooterStyles;
    filter?: string;
  };
}

// TODO: mobile friendly
// TODO: refetch
// TODO: fix footer when table overflows
