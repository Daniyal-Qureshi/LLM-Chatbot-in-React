import { createClient } from "@supabase/supabase-js";

import OpenAI from "openai";

export const supabase = createClient(
  process.env.REACT_APP_PUBLIC_SUPABASE_URL!,
  process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY!
);
export type ToastType = "error" | "success" | "default";

export const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});
