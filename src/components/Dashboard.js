// import React, { useState} from 'react'
import { Card, Button, Alert } from "react-bootstrap";
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
          <h1>Feeling Well</h1>
        </header>
        <h2>😌Hello there, how are you today?☀️</h2>
        <div className="w-100 text-canter mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </React.StrictMode>
      <section className="visualization">
        <React.StrictMode>
          {/* <aside className='wordTable'>
            <div>
              <WordList submitNewWord={addWord} />
            </div>
          </aside> */}
        </React.StrictMode>
        <div className="feelWheel">
          <Sunburst clickSubmitNewWord={addWord} />
        </div>
        <React.StrictMode>
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
