import { SortingConfig } from "../../ts/interfaces/dataTable.interface";

export const sortRows = <T>(
  sortingConfig: SortingConfig<T>[],
  field1: T,
  field2: T
) => {
  for (const s of sortingConfig.sort((a, b) => a.index - b.index)) {
    if (!s.sort) continue;
    if (field1[s.field as keyof T] > field2[s.field as keyof T])
      return s.sort === "DESC" ? -1 : 1;
    if (field1[s.field as keyof T] < field2[s.field as keyof T])
      return s.sort === "DESC" ? 1 : -1;
  }
  return 0;
};
