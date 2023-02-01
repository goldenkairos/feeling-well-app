// import React, { useState} from 'react'
import { Card, Button, Alert,Container,Nav,NavDropdown,Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate as useHistory } from "react-router-dom";
// import React from "react";
// import "./src/App.css";

// import NewWordForm from "./components/NewWordForm.js";
import "./Dashboard.css";
import NewWordForm from "./NewWordForm.js";
import WordCloud from "./wordCloud.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import WordList from "./WordList.js";
import Sunburst from "./SunBurst.js";
import RemoveWordForm from "./RemoveWordForm.js";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError(""); //clearing out the error when user logout

    try {
      await logout();
      history("/");
    } catch {
      setError("Failed to log out");
    }
  }

  // return (
  //   <>
  //     <Card>
  //   <Card.Body>
  //   <h2 className="text-center mb-4">Profile</h2>
  //   {error && <Alert variant="danger">{error}</Alert>}
  //   <strong>Email:</strong> { currentUser.email }
  //   <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
  //   </Card.Body>
  //     </Card>
  //     <div className="w-100 text-canter mt-2">
  //      <Button variant="link" onClick ={handleLogout}>Log Out</Button>
  //     </div>
  //   </>
  // )

  const [wordsFreq, setWordsFreq] = useState({});
  // const [selected, setSelected] = useState(null);

  // const onClickSelect = () => {
  //   setSelected("word")
  // }

  const getWords = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/words`)
      .then((response) => {
        setWordsFreq(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addWord = (newWordInfo) => {
    console.log("Happy New Year!");
    console.log("We made huge progress today");
    console.log("addWord is called here");
    console.log("Happy new Year!");

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/words`, newWordInfo)
      .then((response) => {
        console.log(response.data);
        getWords();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitDeleteWord = (deleteWordInfo) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/words/${deleteWordInfo}`)
      .then((response) => {
        console.log(response.data);
        getWords();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getWords, []);

  return (
    
    <div>
      <React.StrictMode>
        <header>
        <Navbar class="navbar navbar-light bg-light">
      <Container>
        <Navbar.Brand class="navbar-brand" href="">
        Feeling Well</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="about-us">About Us</Nav.Link>
            <Nav.Link href="source-code">Source Code</Nav.Link>
            <Nav.Link href="update-profile">Update Profile</Nav.Link>
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
        <h2 className="w-100 expand text-center mt-2">😌Hello there, how are you today?☀️</h2>

      </React.StrictMode>
      <section className="visualization">
        <React.StrictMode>
          {/* <aside className='wordTable'>
            <div>
              <WordList submitNewWord={addWord} />
            </div>
          </aside> */}
        <div className="feelWheel">
          <Sunburst clickSubmitNewWord={addWord} />
        </div>
          <div className="forms">
            <aside>
              <NewWordForm createNewWordForm={addWord} />
            </aside>
            <aside>
              <RemoveWordForm submitDeleteWord={submitDeleteWord} />
            </aside>
            {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete all words?')) this.onCancel() } }>DELETE</div> */}
          </div>
          <main>
            <div className="wordCloud">
              <WordCloud wordsFreq={wordsFreq} />
            </div>
          </main>
        </React.StrictMode>
      </section>
    </div>
  );
}
