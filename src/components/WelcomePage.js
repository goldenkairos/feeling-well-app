// import React, { useState} from 'react'

import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate as useHistory } from "react-router-dom";

import "./Dashboard.css";
import NewWordForm from "./NewWordForm.js";
import WordCloud from "./wordCloud.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import WordList from "./WordList.js";
import Sunburst from "./SunBurst.js";
import RemoveWordForm from "./RemoveWordForm.js";
import NavBar from "./NavBar.js";

export default function WelcomePage() {
  const [error, setError] = useState("");
  const { currentUser,  } = useAuth();
  const [wordsFreq, setWordsFreq] = useState({});
  // const history = useHistory();

  // async function handleLogout() {
  //   setError(""); //clearing out the error when user logout

  //   try {
  //     logout();
  //     history("/");
  //     getWords();
  //   } catch {
  //     setError("Failed to log out");
  //   }
  // }

  const getWords = () => {
    let getWordsURL = null;
    if (!currentUser) {
      getWordsURL = `${process.env.REACT_APP_BACKEND_URL}/words`;
    } else {
      getWordsURL = `${process.env.REACT_APP_BACKEND_URL}/accounts/${currentUser.uid}/all_words`;
    }

    axios
      .get(getWordsURL)
      .then((response) => {
        setWordsFreq(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addWord = (newWordInfo) => {
    console.log("addWord func called here! ~~~~~~~");
    let postWordsURL = null;
    if (!currentUser) {
      postWordsURL = `${process.env.REACT_APP_BACKEND_URL}/words`;
    } else {
      postWordsURL = `${process.env.REACT_APP_BACKEND_URL}/accounts/${currentUser.uid}/words`;
    }
    axios
      .post(postWordsURL, newWordInfo)
      .then((response) => {
        console.log(response.data);
        getWords();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitDeleteWord = (deleteWordInfo) => {
    let deleteWordsURL = null;
    if (!currentUser) {
      deleteWordsURL = `${process.env.REACT_APP_BACKEND_URL}/words/${deleteWordInfo}`;
    } else {
      deleteWordsURL = `${process.env.REACT_APP_BACKEND_URL}/accounts/${currentUser.uid}/${deleteWordInfo}`;
    }
    axios
      .delete(deleteWordsURL)
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
          <NavBar />
        </header>
        <h2 className="w-100 expand text-center mt-2">
          😌Hello there, how are you today?☀️
        </h2>

        {/* </React.StrictMode> */}
        <section className="visualization">
          {/* <React.StrictMode> */}
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
        </section>
      </React.StrictMode>
    </div>
  );
}
