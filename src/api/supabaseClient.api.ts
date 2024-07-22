import { createClient } from "@supabase/supabase-js";
import { Database } from "../ts/interfaces/supabase.interface";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
