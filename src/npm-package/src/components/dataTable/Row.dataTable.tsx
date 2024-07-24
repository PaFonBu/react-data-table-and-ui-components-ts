import styled from "styled-components";
import { Columns } from "../../ts/interfaces/dataTable.interface";
import { colors } from "../../colors";
import { Cell } from "./Cell.dataTable";

export const Row = <T,>({ row, columns, styles }: RowProps<T>) => (
  <StyledDataTr className={styles?.tableRow ?? ""}>
    {!!row &&
      columns
        .filter((column) => !column.hidden)
        .map(({ field, type }, propIndex) => (
          <Cell
            row={row}
            field={field}
            type={type}
            styles={styles?.tableCell}
            key={propIndex}
          />
        ))}
  </StyledDataTr>
);

const StyledDataTr = styled.tr`
  background-color: var(--color-background, ${colors.background});
  &:nth-child(odd) {
    background-color: var(--color-background-light, ${colors.backgroundLight});
  }
`;

interface RowProps<T> {
  row: T;
  columns: Columns<T>[];
  styles?: { tableRow?: string; tableCell?: string };
}
