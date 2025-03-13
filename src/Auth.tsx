import { useState } from "react";
import { supabase } from "./supabaseClient";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Wachtwoord"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Registreren</button>
      <button onClick={handleSignIn}>Inloggen</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Auth;
