import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate as useHistory } from "react-router-dom";
import "./Dashboard.css";
import React, { useState } from "react";

export default function NavBar() {
  const [error, setError] = useState("");
  const { logout } = useAuth();

  const history = useHistory();

  async function handleLogout() {
    setError(""); //clearing out the error when user logout

    try {
      logout();
      history("/");
      //getWords();
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <Navbar class="navbar navbar-light bg-light ">
        <Container>
          <Navbar.Brand class="navbar-brand" href="">
            Feeling Well
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">Home</Nav.Link>
              <Nav.Link href="about-us">About Us</Nav.Link>
              <Nav.Link href="credit">Credit</Nav.Link>
              <Nav.Link href="update-profile">Update Profile</Nav.Link>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="signup">Sign Up</Nav.Link>
              <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
