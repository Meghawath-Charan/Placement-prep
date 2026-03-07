import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // Check if an open attendance session already exists
    const { data: existing, error: existingError } = await supabase
      .from("attendance")
      .select("id")
      .eq("user_id", user.id)
      .is("logout_time", null)
      .single();

    // If "no rows found", create a new login session row
    if (!existing && existingError?.code === "PGRST116") {
      const { error: insertError } = await supabase.from("attendance").insert([
        {
          user_id: user.id,
          login_time: new Date().toISOString(),
          shift_minutes: 300,
          attendance_status: "In Progress",
        },
      ]);

      if (insertError) {
        alert(insertError.message);
        return;
      }
    } else if (existingError && existingError.code !== "PGRST116") {
      alert(existingError.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded">
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
