import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient2";
import type { User } from "@supabase/supabase-js";
import axios from "axios";

interface UserWithCredits extends User {
  credits: number;
}

export const useUser = (): {
  user: User | null;
} => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user };
};
