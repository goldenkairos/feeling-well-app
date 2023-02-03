
import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import Signup from "./components/Signup.js";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import ForgotPassword from "./components/ForgotPassword.js";
import UpdateProfile from "./components/UpdateProfile.js";
import WelcomePage from "./components/WelcomePage.js";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ minWidth: "300px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/" element={<WelcomePage />}></Route>              
              <Route
                path="/"
                element={
                  <PrivateRoute>                    
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
