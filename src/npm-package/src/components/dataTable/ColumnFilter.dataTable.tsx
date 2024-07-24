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
            container: styles?.input?.container,
            input: `input-input ${styles?.input?.input ?? ""}`,
            label: `input-label ${styles?.input?.label ?? ""}`,
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
          buttonSize="md"
          styles={{
            ...styles?.dropdown,
            container: `dropdown-container ${
              styles?.dropdown?.container ?? ""
            }`,
            button: `dropdown-button ${styles?.dropdown?.button ?? ""}`,
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
  .input-input:disabled {
    border-color: var(--color-secondary, ${colors.secondary});
    /* color: var(--color-text, ${colors.text}); TODO: remove date when All is selected*/
  }
  .input-label {
    filter: brightness(140%);
  }
  .dropdown-container {
    align-self: center;
  }
  .dropdown-button {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }`;

const StyledContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-evenly;
  padding-inline-start: 1.5rem;
  padding-inline-end: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const StyledFilterIcon = styled(FilterIcon)`
  vertical-align: middle;
`;

interface ColumnFilterProps<T> {
  filter: Filter<T> | null;
  setFilters: React.Dispatch<React.SetStateAction<Filter<T>[]>>;
  styles?: FilterStyles;
}

export interface FilterStyles {
  td?: string;
  container?: string;
  input?: InputStyles;
  dropdown?: DropdownStyles;
}
