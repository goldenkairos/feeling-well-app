import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate as useHistory } from "react-router-dom";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";

export default function NavBar({getWords}) {
  const [error, setError] = useState("");
  const { logout,currentUser } = useAuth();

  const history = useHistory();

  async function handleLogout() {
    setError(""); //clearing out the error when user logout
    // const getAllWords = () => getWords()

    try {
      logout();
      history("/");
      window.location.reload();
      getWords();
      // getAllWords()
    } catch {
      setError("Failed to log out");
    }
  };





  // handleLogout.then(()=>{getWords()});

  const logOutVisible = currentUser ? (<Nav.Link onClick={handleLogout}>Log Out</Nav.Link>) : ("");
  const logInVisible = currentUser ? ("") : (<Nav.Link href="login">Login</Nav.Link>);
  const signUpVisible = currentUser ? ("") : (<Nav.Link href="signup">Sign Up</Nav.Link>);
  const updateProfileVisible = currentUser ? (<Nav.Link href="update-profile">Update Profile</Nav.Link>):("");

  return (
    <div>
      <Navbar class="navbar navbar-light bg-light ">
        <Container >
          <Navbar.Brand class="navbar-brand" href="">
            🌻Feeling Well
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Navbar id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">Home</Nav.Link>
              <Nav.Link href="about-us">About Us</Nav.Link>
              {logInVisible}
              {updateProfileVisible}
              {logOutVisible}
              {signUpVisible}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
              </NavDropdown> */}
            </Nav>
          {/* </Navbar.Collapse> */}
          </Navbar>
        </Container>
      </Navbar>
    </div>
  );
}
