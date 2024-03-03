import React, { useState, useEffect } from "react";
import "./UsersTable.css";
import axios from "axios";

export default function UsersTable() {
  const [userData, setUserData] = useState([]);

  const imgUrl = 'http://localhost:5000/uploads'; 

  const fetchUsers = async () => {
    const apiUrl = 'http://localhost:5000/getallUsers';

    try {
      const response = await axios.get(apiUrl);
      setUserData(response.data.users);
    } catch (error) {
      console.log("Failed to fetch Users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <div className="UserTablePage">
      <h1>Users</h1>
      <div className="table-container">
        {/* <div className="usertable"> */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Profile Picture</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    <img src={`${imgUrl}/${user.avatar}`} alt={`${user.username}`} className="profile-picture" />
                  </td>
                  <td>{user.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        {/* </div> */}
      </div>
    </div>
  );
}
