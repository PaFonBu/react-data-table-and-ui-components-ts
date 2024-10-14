import styled from "styled-components";
import { Columns } from "../../ts/interfaces/dataTable.interface";

export const Cell = <T,>({
  row,
  field,
  type,
  columnOptions,
  styles,
}: CellProps<T>) => (
  <StyledDataTd width={columnOptions?.width} className={styles ?? ""}>
    {type === "boolean"
      ? (row[field as keyof T] as boolean)
        ? "true"
        : "false"
      : (row[field as keyof T] as string | number)}
  </StyledDataTd>
);

const StyledDataTd = styled.td<{ width?: string }>`
  padding: 1rem 1.5rem;
  width: ${(props) => props.width};
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
