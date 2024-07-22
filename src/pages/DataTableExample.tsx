import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Columns } from "../npm-package/src/ts/interfaces/dataTable.interface";
import { Database } from "../ts/interfaces/supabase.interface";
import { getPlayersScores } from "../api/playerScore.api";
import { Spinner } from "../npm-package/src/components/ui/Spinner.ui";
import { DataTable } from "../npm-package/src/components/dataTable/DataTable.dataTable";

export const DataTableExample: React.FC = () => {
  const {
    data: playersScores,
    isFetching: isFetchingGetPlayersScores,
    // refetch: refetchGetPlayerScores,
  } = useQuery({
    queryKey: ["HighScores", "getPlayerScores"],
    queryFn: () => getPlayersScores(),
    select: ({ data }) =>
      data.map((item, index) => ({
        index,
        ...item,
      })),
  });

  if (isFetchingGetPlayersScores)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  const columnDefinition: Columns<
    Database["public"]["Tables"]["player_score"]["Row"]
  >[] = [
    {
      header: "Name",
      field: "name",
      type: "string",
      options: { filter: true },
    },
    {
      header: "Time (seconds)",
      field: "time",
      type: "number",
    },
    {
      header: "Moves",
      field: "moves",
      type: "number",
    },
    {
      header: "Difficulty",
      field: "difficulty",
      type: "string",
      // hidden: true,
    },
    {
      header: "Number of cards",
      field: "number_cards_custom_difficulty",
      type: "number",
    },
    {
      header: "Date",
      field: "created_at",
      type: "date",
      // hidden: true,
    },
    {
      header: "Colors",
      field: "use_colors",
      type: "boolean",
      // hidden: true,
    },
  ];
  return (
    <StyledUI>
      <h2 className="center">Data table</h2>
      <DataTable<Database["public"]["Tables"]["player_score"]["Row"]>
        columns={columnDefinition}
        rows={playersScores ?? []}
        // options={{ isMultiSortEnabled: true }}
        styles={{
          tableHeader: "bg-red-400",
        }}
      />
    </StyledUI>
  );
};

const StyledUI = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .center {
    align-self: center;
  }
  .m-0 {
    margin: 0;
  }
`;
