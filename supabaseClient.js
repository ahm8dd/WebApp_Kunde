import { createClient } from "@supabase/supabase-js";

// Gehe in Supabase auf: Project Settings (Zahnrad) -> API
// Kopiere "Project URL" und "anon public key" hier rein:

const supabaseUrl = "https://pysfzfexptfxgcpokxae.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5c2Z6ZmV4cHRmeGdjcG9reGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODIwMDYsImV4cCI6MjA3OTE1ODAwNn0.vN-LkidS1k9as5wi1_sI2T64XcoqJR-GZpQtgjdB3-Y";

export const supabase = createClient(supabaseUrl, supabaseKey);
