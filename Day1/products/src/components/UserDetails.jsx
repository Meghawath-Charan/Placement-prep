import { useState } from "react";
import UserDashboard from "./UserDashboard";

function UserDetails() {
  const [usersList, setUsersList] = useState([
    { id: 1, username: "Santhu", role: "Junior Developer" },
    { id: 2, username: "Sai", role: "Junior Developer" },
    { id: 3, username: "Anadh", role: "Junior Developer" },
  ]);

  const handlePromote = (id) => {
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: "Senior Developer" } : user
      )
    );
  };

  return (
    <div className="grid">
      {usersList.map((user) => (
        <UserDashboard
          key={user.id}
          username={user.username}
          role={user.role}
          onPromote={() => handlePromote(user.id)}
        />
      ))}
    </div>
  );
}

export default UserDetails;
