"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import MemeGenerator from "./components/MemeGenerator";
import Navbar from "./components/Navbar";
import type { User } from "@supabase/supabase-js";
import "./App.css";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user);
          setUsername(data.user.user_metadata.username);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          setUsername(session.user.user_metadata.username);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setUsername(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Navbar user={user} username={username} onSignOut={handleSignOut} />
      <div className="pt-20">
        {" "}
        {/* Increased padding to ensure content doesn't get hidden under navbar */}
        <MemeGenerator />
      </div>
    </div>
  );
};

export default App;
