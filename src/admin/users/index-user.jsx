import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PanelMainLayout from "../../layout/PanelMainLayout";
import AdminLoader from "../../components/AdminLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://abiola3on-blog-backend.onrender.com";

const ManageUser = function () {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true });
    }
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Users:", data);
        setUsers(data.users.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [location.state]);
  console.log(users);

  return (
    <PanelMainLayout>
      <div className="button-group">
        <h4>Manage Users</h4>
        <Link to="/admin-panel/create-user" className="link-btn">
          Add User
        </Link>
      </div>

      <div className="content">
        <table>
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td data-label="S/N">{index + 1}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{user.user_metadata?.role || "User"}</td>
                <td data-label="Status">
                  {user.confirmed_at ? "Active" : "Inactive"}
                </td>
                <td data-label="Action">
                  <a href="#" className="delete">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </PanelMainLayout>
  );
};

export default ManageUser;
