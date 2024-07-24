import { useEffect, useMemo, useState } from "react";
import {
  Header,
  HeaderStyles,
  PaginationSelectOptions,
  ReloadButtonOptions,
  SearchInputOptions,
} from "./Header.dataTable";
import { Footer, FooterStyles } from "./Footer.dataTable";
import { ColumnHeader, ColumnHeaderStyles } from "./ColumnHeader.dataTable";
import { ColumnFilter, FilterStyles } from "./ColumnFilter.dataTable";
import { sortRows } from "../../utils/dataTable/sort";
import { filterRows, searchBarFilter } from "../../utils/dataTable/filter";
import {
  Columns,
  Filter,
  SortingConfig,
} from "../../ts/interfaces/dataTable.interface";
import styled from "styled-components";
import { Row } from "./Row.dataTable";

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
    <StyledContainer className={styles?.container ?? ""}>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        options={options}
        styles={styles?.header}
      />
      <div className={styles?.tableContainer ?? ""}>
        <StyledTable className={styles?.table ?? ""}>
          <thead>
            <tr className={styles?.columnHeaders ?? ""}>
              {columnsToDisplay.map((column, index) => (
                <ColumnHeader
                  key={index}
                  column={column}
                  sort={sort}
                  setSort={setSort}
                  isMultiSortEnabled={options?.isMultiSortEnabled}
                  isSortEnabled={column.options?.sort}
                  styles={styles?.columnHeader}
                />
              ))}
            </tr>
            {columnsToDisplay.some(
              (column) => column?.options?.filter === true
            ) && (
              <tr>
                {columnsToDisplay.map((column, index) => (
                  <ColumnFilter<T>
                    key={index}
                    filter={
                      filters.find((filter) => filter.field === column.field) ||
                      null
                    }
                    setFilters={setFilters}
                    styles={styles?.filter}
                  />
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {(!options?.paginationSelect?.isDisabled
              ? paginatedRows
              : rowsToDisplay
            ).map((row, rowIndex) => (
              <Row
                row={row}
                columns={columns}
                key={rowIndex}
                styles={{
                  tableRow: styles?.tableRow,
                  tableCell: styles?.tableCell,
                }}
              />
            ))}
          </tbody>
        </StyledTable>
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
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-style: hidden;
`;

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
    columnHeaders?: string;
    columnHeader?: ColumnHeaderStyles;
    tableCell?: string;
    tableRow?: string;
    header?: HeaderStyles;
    footer?: FooterStyles;
    filter?: FilterStyles;
  };
}

// TODO: mobile friendly
// TODO: refetch
// TODO: fix footer when table overflows
