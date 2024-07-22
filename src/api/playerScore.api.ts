import { Database } from "../ts/interfaces/supabase.interface";
import supabase from "./supabaseClient.api";

export const getPlayersScores = async () => {
  const response = await supabase.from("player_score").select("*");
  if (response.error) throw response;
  return response;
};

export const addPlayerScore = async (
  values: Database["public"]["Tables"]["player_score"]["Insert"]
) => {
  const response = await supabase
    .from("player_score")
    .insert([values])
    .select();
  if (response.error) throw response;
  return response;
};
