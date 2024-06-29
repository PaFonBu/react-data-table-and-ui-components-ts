import { useEffect, useState } from "react";
import { Dropdown } from "../ui/Dropdown.ui";
import { Input } from "../ui/Input.ui";
// import { Select } from "../ui/Select.ui";
import { Filter as FilterIcon } from "../ui/icons/Filter.icon";
import { filterOptionsByType } from "../../utils/dataTable/filter";
import { Filter, FilterOption } from "../../ts/interfaces/dataTable.interface";

export const ColumnFilter = <T,>({
  filter,
  setFilters,
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
    <>
      <div
        className={`
          flex gap-2 content-evenly
          ps-6 pe-2 py-1`}
      >
        <Input
          styles={{
            container: `bg-slate-200 rounded-lg`,
            input: "!text-slate-800 !border-slate-200",
            label: "!text-slate-400",
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
          buttonContent={<FilterIcon className="p-0 m-0" />}
          options={filterOptionsByType
            .filter((filterOptioByType) =>
              filterOptioByType.type.includes(filter.type)
            )
            .map((filterOptioByType) => ({
              label: filterOptioByType.label,
              onClick: () =>
                setFilteredBy({
                  label: filterOptioByType.label,
                  value: filterOptioByType.value,
                }),
            }))}
          buttonSize="md"
          styles={{
            container: "self-center",
            button: "!px-2",
          }}
        />
      </div>
    </>
  );
};

interface ColumnFilterProps<T> {
  filter: Filter<T> | null;
  setFilters: React.Dispatch<React.SetStateAction<Filter<T>[]>>;
}
