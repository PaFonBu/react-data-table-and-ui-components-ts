import styled from "styled-components";
import { Columns } from "../../ts/interfaces/dataTable.interface";

export const Cell = <T,>({
  row,
  field,
  type,
  columnOptions,
  styles,
}: CellProps<T>) => (
  <StyledDataTd columnWidth={columnOptions?.width} className={styles ?? ""}>
    {type === "boolean"
      ? (row[field as keyof T] as boolean)
        ? "true"
        : "false"
      : (row[field as keyof T] as string | number)}
  </StyledDataTd>
);

const StyledDataTd = styled.td<{ columnWidth?: string }>`
  padding: 1rem 1.5rem;
  width: ${(props) => props.columnWidth};
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

interface CellProps<T> {
  row: T;
  field: string | number | symbol;
  type: Columns<T>["type"];
  columnOptions: Columns<T>["options"];
  styles?: string;
}
