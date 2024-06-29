import { Columns, SortingConfig } from "../../ts/interfaces/dataTable.interface";
import { SortDown } from "../ui/icons/SortDown.icon";
import { SortUp } from "../ui/icons/SortUp.icon";
import { Unsorted } from "../ui/icons/Unsorted.icon";

export const TableHeader = <T,>({
  column,
  sort,
  setSort,
  isMultiSortEnabled = false,
  isSortEnabled = true,
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
    <>
      <div
        className={`
          block
          ps-6 pe-8 py-3
          text-start text-md text-slate-200
          peer`}
      >
        {column.header}
      </div>
      {isSortEnabled && (
        <div
          className={`
            absolute
            top-0 right-1
            h-full
            flex items-center
            z-10
            cursor-pointer
            select-none`}
          onClick={() => handleClickSort()}
        >
          {sort.some(
            (item) => item.field === column.field && item.sort === "ASC"
          ) ? (
            <SortUp className="fill-red-300" />
          ) : sort.some(
              (item) => item.field === column.field && item.sort === "DESC"
            ) ? (
            <SortDown className="fill-red-300" />
          ) : (
            <Unsorted className="fill-red-300" />
          )}
        </div>
      )}
    </>
  );
};

interface TableHeaderProps<T> {
  column: Columns<T>;
  sort: SortingConfig<T>[];
  setSort: React.Dispatch<React.SetStateAction<SortingConfig<T>[]>>;
  isMultiSortEnabled?: boolean;
  isSortEnabled?: boolean;
}


