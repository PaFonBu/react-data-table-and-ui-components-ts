import { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownStyles } from "../ui/Dropdown.ui";
import { Input, InputStyles } from "../ui/Input.ui";
import { Filter as FilterIcon } from "../ui/icons/Filter.icon";
import { filterOptionsByType } from "../../utils/dataTable/filter";
import { Filter, FilterOption } from "../../ts/interfaces/dataTable.interface";
import styled, { createGlobalStyle } from "styled-components";
import { colors } from "../../colors";

export const ColumnFilter = <T,>({
  filter,
  setFilters,
  lastColumn,
  styles,
}: ColumnFilterProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filterOption, setFilteredBy] = useState<{
    label: string;
    value: FilterOption;
  }>({ label: "All", value: "ALL" });
  const [isFilterInputDisabled, setIsFilterInputDisabled] = useState(
    ["ALL", "BLANK", "NOT_BLANK", "TRUE", "FALSE"].includes(filterOption.value)
  );

  useEffect(() => {
    if (!filter) return;
    setFilters((values) => {
      if (!values) return values;
      const filterToChange = values.find(
        (value) => value.field === filter.field
      );
      if (!filterToChange) return values;
      filterToChange.filterOption = filterOption.value;
      filterToChange.value = null;
      return [
        ...values.filter((value) => value.field !== filter.field),
        filterToChange,
      ];
    });
  }, [filterOption, setFilters, filter]);

  useEffect(() => {
    setIsFilterInputDisabled(
      ["ALL", "BLANK", "NOT_BLANK", "TRUE", "FALSE"].includes(
        filterOption.value
      )
    );
  }, [filterOption.value]);

  useEffect(() => {
    (async () => {
      // Wait for the filter dropdown to close before focusing the input
      await new Promise((r) => setTimeout(r, 100));
      if (!isFilterInputDisabled) inputRef.current?.focus();
    })();
  }, [isFilterInputDisabled, filterOption.value]);

  if (!filter) return null;
  const handleOnChangeFilter = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((values) => {
      if (!values) return values;
      const filterToChange = values.find(
        (value) => value.field === filter.field
      );
      if (!filterToChange) return values;
      filterToChange.value = value;
      return [
        ...values.filter((value) => value.field !== filter.field),
        filterToChange,
      ];
    });
  };

  return (
    <td className={styles?.td ?? ""}>
      <GlobalStyle />
      <StyledContainer className={styles?.container ?? ""}>
        <Input
          ref={inputRef}
          styles={{
            ...styles?.input,
            container: `data-table-column-filter-input-container ${styles?.input?.container}`,
            input: `data-table-column-filter-input-input ${
              styles?.input?.input ?? ""
            }`,
            label: `data-table-column-filter-input-label ${
              styles?.input?.label ?? ""
            }`,
          }}
          label={filterOption.label}
          onChange={handleOnChangeFilter}
          disabled={isFilterInputDisabled}
          type={
            ["ALL", "BLANK", "NOT_BLANK", "TRUE", "FALSE"].includes(
              filterOption.value
            )
              ? "text"
              : filter.type
          }
          value={filter.value ?? ""}
        />
        <Dropdown
          buttonContent={<StyledFilterIcon />}
          buttonSize="md"
          buttonOutline
          options={filterOptionsByType
            .filter((filterOptionByType) =>
              filterOptionByType.type.includes(filter.type)
            )
            .map((filterOptionByType) => ({
              label: filterOptionByType.label,
              onClick: () =>
                setFilteredBy({
                  label: filterOptionByType.label,
                  value: filterOptionByType.value,
                }),
            }))}
          position={lastColumn ? "bottom-left" : "bottom-right"}
          styles={{
            ...styles?.dropdown,
            container: `data-table-column-filter-dropdown-container ${
              styles?.dropdown?.container ?? ""
            }`,
            button: `data-table-column-filter-dropdown-button ${
              styles?.dropdown?.button ?? ""
            }`,
          }}
        />
      </StyledContainer>
    </td>
  );
};

const GlobalStyle = createGlobalStyle`
  .data-table-column-filter-input-container {
    flex-grow: 1;
  }
  .data-table-column-filter-input-input:disabled {
    border-color: var(--color-secondary, ${colors.secondary});
  }
  .data-table-column-filter-input-label {
    filter: brightness(140%);
  }
  .data-table-column-filter-dropdown-container {
    align-self: center;
  }
  .data-table-column-filter-dropdown-button {
    padding-left: 0.25rem;
    padding-right: 0rem;
    border: 0 !important;
  }`;

const StyledContainer = styled.div`
  display: flex;
  gap: 0rem;
  justify-content: space-between;
  padding-inline-start: 1.5rem;
  padding-inline-end: 0.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const StyledFilterIcon = styled(FilterIcon)`
  vertical-align: middle;
  fill: var(--color-secondary, ${colors.secondary});
`;

interface ColumnFilterProps<T> {
  filter: Filter<T> | null;
  setFilters: React.Dispatch<React.SetStateAction<Filter<T>[]>>;
  lastColumn: boolean;
  styles?: FilterStyles;
}

export interface FilterStyles {
  td?: string;
  container?: string;
  input?: InputStyles;
  dropdown?: DropdownStyles;
}
