import { useEffect, useState } from "react";
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
  const [filterOption, setFilteredBy] = useState<{
    label: string;
    value: FilterOption;
  }>({ label: "All", value: "ALL" });

  useEffect(() => {
    if (!filter) return;
    setFilters((values) => {
      if (!values) return values;
      const filterToChange = values.find(
        (value) => value.field === filter.field
      );
      if (!filterToChange) return values;
      filterToChange.filterOption = filterOption.value;
      if (
        ["ALL", "BLANK", "NOT_BLANK", "TRUE", "FALSE"].includes(
          filterOption.value
        )
      )
        filterToChange.value = null;
      return [
        ...values.filter((value) => value.field !== filter.field),
        filterToChange,
      ];
    });
  }, [filterOption, setFilters, filter]);

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
    <StyledTd className={styles?.td ?? ""}>
      <GlobalStyle />
      <StyledContainer className={styles?.container ?? ""}>
        <Input
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
          disabled={["ALL", "BLANK", "NOT_BLANK", "TRUE", "FALSE"].includes(
            filterOption.value
          )}
          type={filter.type}
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
    </StyledTd>
  );
};

const StyledTd = styled.td`
  background-color: var(--color-primary-light, ${colors.primaryLight});
`;

const GlobalStyle = createGlobalStyle`
  .data-table-column-filter-input-container {
    flex-grow: 1;
  }
  .data-table-column-filter-input-input:disabled {
    border-color: var(--color-secondary, ${colors.secondary});
    /* color: var(--color-text, ${colors.text}); TODO: remove date when All is selected*/
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
