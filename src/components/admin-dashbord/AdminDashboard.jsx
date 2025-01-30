import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/user").then((res) => setUsers(res.data));
  });

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/user/${id}`).then((res) => {
      setUsers(users.filter((itm) => itm.id !== id));
    });
  };

  return (
    <>
      <div className="p-5"></div>
      <h2>Hello Admin</h2>
      <input
        type="text"
        placeholder="search user"
        value={search}
        className="border p-2 mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {users
          .filter((user) =>
            user.name.toLowercase().includes(search.toLocaleLowerCase())
          )
          .map((itm) => (
            <li key={itm.id} className="flex justify-between p-2 border">
              <span>
                {itm.name} - {itm.email} - {itm.role}
              </span>
              <button className="bg-red text-white">Delete</button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default AdminDashboard;
