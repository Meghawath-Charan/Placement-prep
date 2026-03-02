function UserDashboard({ username, role, onPromote }) {
  const isSenior = role === "Senior Developer";

  return (
    <article className="card">
      <h3>{username}</h3>
      <p>{role}</p>
      <button onClick={onPromote} disabled={isSenior}>
        {isSenior ? "Already Promoted" : "Promote"}
      </button>
    </article>
  );
}

export default UserDashboard;
