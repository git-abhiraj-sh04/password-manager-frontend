import React, { useEffect, useState } from "react";
import { fetchPasswords } from "../api.js";
import { useNavigate } from "react-router-dom";
import "./PasswordList.css";

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/passwords/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Example for token-based auth
        },
      });
      setPasswords((prevPasswords) =>
        prevPasswords.filter((password) => password._id !== id)
      );
    } catch (error) {
      console.error("Error deleting password", error);
      setError("Failed to delete password. Please try again.");
    }
  };

  useEffect(() => {
    const getPasswords = async () => {
      try {
        const { data } = await fetchPasswords();
        setPasswords(data);
      } catch (error) {
        console.error("Error fetching passwords", error);
        setError("Failed to fetch passwords. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getPasswords();
  }, []);

  return (
    <div className="container">
      <h2>Password List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="password-list">
        {passwords.map((password) => (
          <li key={password._id} className="password-item">
            <div className="password-item-content">
              <h3>{password.title}</h3>
              <p>
                <strong>Username:</strong> {password.username}
              </p>
              <p>
                <strong>Password:</strong>
                {password.showPassword ? password.password : "••••••••"}
              </p>
              <button
                onClick={() => handleDelete(password._id)}
                className="delete-btn"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setPasswords((prevPasswords) =>
                    prevPasswords.map((p) =>
                      p._id === password._id
                        ? { ...p, showPassword: !p.showPassword }
                        : p
                    )
                  );
                }}
                className="toggle-password-btn"
              >
                {password.showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/add")} className="add-button">
        + Add More
      </button>
    </div>
  );
};

export default PasswordList;
