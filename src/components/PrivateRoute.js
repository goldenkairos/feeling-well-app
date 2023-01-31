
import React from "react";

import {  Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";


/* replace with below due to change in ReactV6 */
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}