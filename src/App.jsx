import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PasswordList from "./components/PasswordList";
import AddPasswordForm from "./components/AddPasswordForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

const App = () => {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/add"
            element={<ProtectedRoute element={<AddPasswordForm />} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <>
                    <PasswordList />{" "}
                    <Logout />
                  </>
                }
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
