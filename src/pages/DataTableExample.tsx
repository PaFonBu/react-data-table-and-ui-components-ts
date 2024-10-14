import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Columns } from "../npm-package/src/ts/interfaces/dataTable.interface";
import { Database } from "../ts/interfaces/supabase.interface";
import { getPlayersScores } from "../api/playerScore.api";
import { DataTable } from "../npm-package/src/components/dataTable/DataTable.dataTable";

export const DataTableExample: React.FC = () => {
  const {
    data: playersScores,
    isFetching: isFetchingGetPlayersScores,
    refetch: refetchGetPlayerScores,
  } = useQuery({
    queryKey: ["HighScores", "getPlayerScores"],
    queryFn: () => getPlayersScores(),
    select: ({ data }) =>
      data.map((item, index) => ({
        index,
        ...item,
      })),
  });

  const columnDefinition: Columns<
    Database["public"]["Tables"]["player_score"]["Row"]
  >[] = [
    {
      header: "Name",
      field: "name",
      type: "string",
      options: { filter: true, width: "20%" },
    },
    {
      header: "Time (seconds)",
      field: "time",
      type: "number",
      options: { filter: true, width: "10%" },
    },
    {
      header: "Moves",
      field: "moves",
      type: "number",
      options: { filter: true, width: "10%" },
    },
    {
      header: "Difficulty",
      field: "difficulty",
      type: "string",
      options: { filter: true, width: "10%" },
      // hidden: true,
    },
    {
      header: "Number of cards",
      field: "number_cards_custom_difficulty",
      type: "number",
      options: { filter: true, width: "10%" },
    },
    {
      header: "Date",
      field: "created_at",
      type: "date",
      options: { filter: true, width: "20%" },
      // hidden: true,
    },
    {
      header: "Colors",
      field: "use_colors",
      type: "boolean",
      options: { filter: true, width: "10%" },
      // hidden: true,
    },
  ];
  return (
    <StyledUI>
      <h2 className="center">Data table</h2>
      <DataTable<Database["public"]["Tables"]["player_score"]["Row"]>
        columns={columnDefinition}
        rows={playersScores ?? []}
        // options={{}}
        // styles={{}}
        refetch={refetchGetPlayerScores}
        isDataLoading={isFetchingGetPlayersScores}
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
