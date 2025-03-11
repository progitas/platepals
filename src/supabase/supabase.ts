import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mvfgovwbkpojurkplimu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmdvdndia3BvanVya3BsaW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzEzODYsImV4cCI6MjA1NzAwNzM4Nn0.NrKBQt1tWNh7seAZjbBmdcWzV-dVhwx6A1XVFOIXjgo";
export const supabase = createClient(supabaseUrl, supabaseKey);
