import styled, { createGlobalStyle } from "styled-components";
import { Button } from "../ui/Button.ui";
import { Input } from "../ui/Input.ui";
import { Select } from "../ui/Select.ui";
import { Reload } from "../ui/icons/Reload.icon";

export const Header: React.FC<HeaderProps> = ({
  searchInput,
  setSearchInput,
  rowsPerPage,
  setRowsPerPage,
  refetch,
  options,
  styles,
}) => {
  const handleChangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setSearchInput(value);

  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => setRowsPerPage(+value);

  const handleClickRefetch = () => {
    if (!refetch) return;
    refetch();
  };

  return (
    <StyledContainer className={styles?.container ?? ""}>
      <GlobalStyle />
      {!options?.searchInput?.isDisabled &&
        (options?.searchInput?.component ? (
          <options.searchInput.component
            value={searchInput ?? ""}
            onChange={handleChangeSearch}
            {...options.searchInput.componentProps}
          />
        ) : (
          <Input
            label="Search..."
            value={searchInput ?? ""}
            onChange={handleChangeSearch}
            styles={{
              ...styles?.searchInput,
              container: `data-table-header-search-input ${
                styles?.searchInput?.container ?? ""
              }`,
            }}
          />
        ))}
      {!options?.paginationSelect?.isDisabled &&
        (options?.paginationSelect?.component ? (
          <options.paginationSelect.component
            value={rowsPerPage?.toString()}
            onChange={handleChangeRowsPerPage}
            options={[]}
            {...options.paginationSelect.componentProps}
          />
        ) : (
          <Select
            label="Rows"
            options={[
              { label: "10", value: "10" },
              { label: "25", value: "25" },
              { label: "50", value: "50" },
              { label: "100", value: "100" },
            ]}
            value={rowsPerPage?.toString()}
            onChange={handleChangeRowsPerPage}
            styles={styles?.paginationSelect}
          />
        ))}
      {!options?.reloadButton?.isDisabled &&
        (options?.reloadButton?.component ? (
          <options.reloadButton.component
            {...options.reloadButton.componentProps}
          >
            {options.reloadButton.content}
          </options.reloadButton.component>
        ) : (
          <Button
            className={styles?.reloadButton}
            size="lg"
            variant="secondary"
            outline
            onClick={handleClickRefetch}
          >
            <StyledReload />
          </Button>
        ))}
    </StyledContainer>
  );
};

const GlobalStyle = createGlobalStyle`
  .data-table-header-search-input {
    flex-grow: 1;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: flex-end;
`;

const StyledReload = styled(Reload)`
  stroke-width: 2;
  vertical-align: middle;
`;

interface HeaderProps {
  searchInput: string | null;
  setSearchInput: React.Dispatch<React.SetStateAction<string | null>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  refetch?: () => void;
  options?: {
    searchInput?: SearchInputOptions;
    reloadButton?: ReloadButtonOptions;
    paginationSelect?: PaginationSelectOptions;
  };
  styles?: HeaderStyles;
}

export interface SearchInputOptions {
  component?: React.FC<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
  componentProps?: object;
  isDisabled?: boolean;
}

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { value: string | number; label: string }[];
}

export interface PaginationSelectOptions {
  component?: React.FC<SelectProps>;
  componentProps?: object;
  isDisabled?: boolean;
}

export interface ReloadButtonOptions {
  component?: React.FC<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >;
  componentProps?: object;
  content?: React.ReactElement;
  isDisabled?: boolean;
}

export interface HeaderStyles {
  container?: string;
  searchInput?: {
    container?: string;
    input?: string;
    label?: string;
  };
  paginationSelect?: {
    container?: string;
    select?: string;
    label?: string;
    option?: string;
  };
  reloadButton?: string;
}
