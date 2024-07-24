import styled from "styled-components";
import { Columns } from "../../ts/interfaces/dataTable.interface";

export const Cell = <T,>({ row, field, type, styles }: CellProps<T>) => (
  <StyledDataTd className={styles ?? ""}>
    {type === "boolean"
      ? (row[field as keyof T] as boolean)
        ? "true"
        : "false"
      : (row[field as keyof T] as string | number)}
  </StyledDataTd>
);

const StyledDataTd = styled.td`
  padding: 1rem 1.5rem;
`;

interface CellProps<T> {
  row: T;
  field: string | number | symbol;
  type: Columns<T>["type"];
  styles?: string;
}
