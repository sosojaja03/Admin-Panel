import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ROLE_KEY,
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cHNjZXlvdmNybXV4cnJxaWdhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjEyOTU5MywiZXhwIjoyMDQ3NzA1NTkzfQ.WQoBZaiVPT9jJy_O2_6uPluzoxJpwNsu6dSi_6xlXJo",

  // import.meta.env.VITE_SUPABASE_ANON_KEY,
  // import.meta.env.VITE_SUPABASE_ROLE_KEY,
);
