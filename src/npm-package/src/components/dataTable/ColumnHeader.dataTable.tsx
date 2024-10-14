import styled from "styled-components";
import {
  Columns,
  SortingConfig,
} from "../../ts/interfaces/dataTable.interface";
import { SortDown } from "../ui/icons/SortDown.icon";
import { SortUp } from "../ui/icons/SortUp.icon";
import { Unsorted } from "../ui/icons/Unsorted.icon";
import { colors } from "../../colors";

export const ColumnHeader = <T,>({
  column,
  sort,
  setSort,
  isMultiSortEnabled = false,
  isSortEnabled = true,
  styles,
}: TableHeaderProps<T>) => {
  const handleClickSort = () => {
    if (!isSortEnabled) return;
    setSort((values) => [
      ...values
        .filter((value) => value.field !== column.field)
        .map((value) => {
          if (isMultiSortEnabled) return value;
          return { ...value, sort: null };
        }),
      {
        ...values.filter((value) => value.field === column.field)[0],
        sort:
          values.filter((value) => value.field === column.field)[0].sort ===
          null
            ? "DESC"
            : values.filter((value) => value.field === column.field)[0].sort ===
              "DESC"
            ? "ASC"
            : null,
      },
    ]);
  };

  return (
    <StyledTh width={column.options?.width} className={styles?.container ?? ""}>
      <StyledHeader className={styles?.header ?? ""}>
        {column.header}
      </StyledHeader>
      {isSortEnabled && (
        <StyledSort
          className={styles?.iconsContainer ?? ""}
          onClick={() => handleClickSort()}
        >
          {sort.some(
            (item) => item.field === column.field && item.sort === "ASC"
          ) ? (
            <StyledSortUp className={styles?.icon ?? ""} />
          ) : sort.some(
              (item) => item.field === column.field && item.sort === "DESC"
            ) ? (
            <StyledSortDown className={styles?.icon ?? ""} />
          ) : (
            <StyledUnsorted className={styles?.icon ?? ""} />
          )}
        </StyledSort>
      )}
    </StyledTh>
  );
};

const StyledTh = styled.th<{ width: string }>`
  position: relative;
  background-color: var(--primary-color, ${colors.primary});
  width: ${(props) => props.width};
  &:first-child {
    border-top-left-radius: 0.5rem;
  }
  &:last-child {
    border-top-right-radius: 0.5rem;
  }
`;

const StyledHeader = styled.div`
  display: block;
  padding-inline-start: 1.5rem;
  padding-inline-end: 2rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  text-align: start;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--text-color, ${colors.text});
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const StyledSort = styled.div`
  position: absolute;
  top: 0;
  right: 0.25rem;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

const StyledSortUp = styled(SortUp)`
  fill: var(--primary-light-color, ${colors.primaryLight});
`;

const StyledSortDown = styled(SortDown)`
  fill: var(--primary-light-color, ${colors.primaryLight});
`;

const StyledUnsorted = styled(Unsorted)`
  fill: var(--primary-light-color, ${colors.primaryLight});
`;

interface TableHeaderProps<T> {
  column: Columns<T>;
  sort: SortingConfig<T>[];
  setSort: React.Dispatch<React.SetStateAction<SortingConfig<T>[]>>;
  isMultiSortEnabled?: boolean;
  isSortEnabled?: boolean;
  styles?: ColumnHeaderStyles;
}

export interface ColumnHeaderStyles {
  container?: string;
  header?: string;
  iconsContainer?: string;
  icon?: string;
}
