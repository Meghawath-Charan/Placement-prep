/* eslint-disable react-hooks/set-state-in-effect */
import { supabase } from "../services/supabaseClient";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  const SHIFT_MINUTES = 300;
  const SHIFT_SECONDS = SHIFT_MINUTES * 60;

  const [currentSession, setCurrentSession] = useState(null);
  const [lastSession, setLastSession] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [isMarkingFullDay, setIsMarkingFullDay] = useState(false);

  const fetchAttendance = useCallback(async () => {
    if (!session?.user?.id) return;

    const { data: openSession, error: openError } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", session.user.id)
      .is("logout_time", null)
      .order("login_time", { ascending: false })
      .limit(1)
      .single();

    if (openError && openError.code !== "PGRST116") {
      alert(openError.message);
      return;
    }

    if (openSession) {
      setCurrentSession(openSession);
    } else {
      setCurrentSession(null);
      setRemainingSeconds(null);
    }

    const { data: completed, error: completedError } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", session.user.id)
      .not("logout_time", "is", null)
      .order("logout_time", { ascending: false })
      .limit(1)
      .single();

    if (completedError && completedError.code !== "PGRST116") {
      alert(completedError.message);
      return;
    }

    if (completed) {
      setLastSession(completed);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchAttendance();
    }
  }, [session, fetchAttendance]);

  // Initialize countdown once from server login_time
  useEffect(() => {
    if (!currentSession) return;

    const loginTimeMs = new Date(currentSession.login_time).getTime();
    const workedSeconds = Math.max(
      0,
      Math.floor((Date.now() - loginTimeMs) / 1000)
    );
    const initialRemaining = Math.max(0, SHIFT_SECONDS - workedSeconds);

    setRemainingSeconds(initialRemaining);
  }, [currentSession, SHIFT_SECONDS]);

  // Stable local decrement every second
  useEffect(() => {
    if (remainingSeconds === null || remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingSeconds]);

  // Auto-mark full-day once when countdown reaches zero
  useEffect(() => {
    if (!currentSession || remainingSeconds !== 0 || isMarkingFullDay) return;

    const markFullDay = async () => {
      setIsMarkingFullDay(true);
      const { error } = await supabase
        .from("attendance")
        .update({
          duration_minutes: SHIFT_MINUTES,
          attendance_status: "Full Day",
        })
        .eq("id", currentSession.id)
        .is("logout_time", null);

      if (error) {
        alert(error.message);
      }
      setIsMarkingFullDay(false);
    };

    markFullDay();
  }, [remainingSeconds, currentSession, isMarkingFullDay, SHIFT_MINUTES]);

  const formatSeconds = (totalSeconds) => {
    const safe = Math.max(0, totalSeconds || 0);
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleString();
  };

  const formatMinutesToHoursMins = (minutes) => {
    const safe = Math.max(0, minutes || 0);
    const hours = Math.floor(safe / 60);
    const mins = safe % 60;
    return `${hours}h ${mins}m`;
  };

  const handleLogout = async () => {
    if (!currentSession) {
      await supabase.auth.signOut();
      navigate("/");
      return;
    }

    const loginTimeMs = new Date(currentSession.login_time).getTime();
    const workedMinutes = Math.max(
      0,
      Math.floor((Date.now() - loginTimeMs) / 60000)
    );
    const cappedMinutes = Math.min(workedMinutes, SHIFT_MINUTES);
    const status = workedMinutes >= SHIFT_MINUTES ? "Full Day" : "Half Day";

    const { error: updateError } = await supabase
      .from("attendance")
      .update({
        logout_time: new Date().toISOString(),
        duration_minutes: cappedMinutes,
        attendance_status: status,
      })
      .eq("id", currentSession.id);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      alert(signOutError.message);
      return;
    }

    navigate("/");
  };

  const workedMinutesNow =
    remainingSeconds === null
      ? null
      : Math.max(0, SHIFT_MINUTES - Math.ceil(remainingSeconds / 60));

  const workedHoursMinsNow =
    workedMinutesNow === null ? "-" : formatMinutesToHoursMins(workedMinutesNow);

  const isCurrentSessionActive = Boolean(currentSession);

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="border rounded p-4 bg-yellow-50 mb-4">
        <h2 className="font-semibold mb-3">Current Session</h2>
        {isCurrentSessionActive ? (
          <>
            <p>
              <strong>Signed In At:</strong> {formatDateTime(currentSession.login_time)}
            </p>
            <p>
              <strong>Shift Remaining:</strong> {formatSeconds(remainingSeconds)}
            </p>
            <p>
              <strong>How Long Signed In:</strong> {workedHoursMinsNow}
            </p>
          </>
        ) : (
          <p>No active session found.</p>
        )}
      </div>

      <div className="border rounded p-4 bg-blue-50 mb-6">
        <h2 className="font-semibold mb-3">Last Session</h2>
        {lastSession ? (
          <>
            <p>
              <strong>Last Sign In:</strong> {formatDateTime(lastSession.login_time)}
            </p>
            <p>
              <strong>Last Sign Out:</strong> {formatDateTime(lastSession.logout_time)}
            </p>
            <p>
              <strong>Time Signed In:</strong>{" "}
              {formatMinutesToHoursMins(lastSession.duration_minutes)}
            </p>
            <p>
              <strong>Status:</strong> {lastSession.attendance_status || "-"}
            </p>
          </>
        ) : (
          <p>No previous completed session found.</p>
        )}
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
