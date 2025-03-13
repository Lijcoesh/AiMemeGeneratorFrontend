import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lbvgifbyhkhuvxzodlru.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidmdpZmJ5aGtodXZ4em9kbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTk0MDQsImV4cCI6MjA1NzM5NTQwNH0.yTMUX29c_1YPYYZjppApndq1d0vwUFvOjfSsgd0Kgc0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
