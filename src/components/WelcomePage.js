// import React, { useState} from 'react'

import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate as useHistory } from "react-router-dom";

import "./Dashboard.css";
import NewWordForm from "./NewWordForm.js";
import WordCloud from "./wordCloud.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sunburst from "./SunBurst.js";
import RemoveWordForm from "./RemoveWordForm.js";
import NavBar from "./NavBar.js";
import "./WelcomePage.css";
import BarChart from "./BarChart.js";
import Footer from "./Footer.js";
import DeleteConfirmationModal from "./DeleteConfirmationModal.js";

export default function WelcomePage() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [wordsFreq, setWordsFreq] = useState({});


  const getWords = () => {
    let getWordsURL = null;
    if (!currentUser) {
      getWordsURL = `${process.env.REACT_APP_BACKEND_URL}/words/all_words_non_user`;
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
    // console.log("addWord func called here! ~~~~~~~");
    let postWordsURL = null;
    if (!currentUser) {
      postWordsURL = `${process.env.REACT_APP_BACKEND_URL}/words`;
    } else {
      postWordsURL = `${process.env.REACT_APP_BACKEND_URL}/accounts/${currentUser.uid}/words`;
    }
    axios
      .post(postWordsURL, newWordInfo)
      .then((response) => {
        // console.log(response.data);
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


  const deleteAllWords = () => {
    
    let deleteWordsURL = null;
    if (!currentUser) {
      deleteWordsURL = `${process.env.REACT_APP_BACKEND_URL}/words/no_uid_all_words`;
    } else {
      deleteWordsURL = `${process.env.REACT_APP_BACKEND_URL}/accounts/${currentUser.uid}/all_words`;
    }
    axios
      .delete(deleteWordsURL)
      .then((response) => {
        // console.log(response.data);
        getWords();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const welcomeMessage = currentUser ? (
    <p>Hello {currentUser.displayName}, how are you today?</p>
  ) : (
    <p>Hello there, how are you today?</p>
  );

  useEffect(getWords, [currentUser]);

  return (
    <div>
      <React.StrictMode>
        <header>
          <NavBar />
        </header>
        <section className="visualization">
          <div className="feelWheel">
            <section className="welcomeMessage">{welcomeMessage}</section>
            <Sunburst clickSubmitNewWord={addWord} />
          </div>
          {/* <main> */}
          <div className="wordCloud">
            <WordCloud wordsFreq={wordsFreq} />
          </div>
          {/* </main> */}
          <div className="forms">
            <aside>
              <NewWordForm createNewWordForm={addWord} />
            </aside>
            <aside>
              <RemoveWordForm submitDeleteWord={submitDeleteWord} />
            </aside>
            <aside>
                <DeleteConfirmationModal deleteAllWords={()=>deleteAllWords()} />
              </aside>
          </div>
          <div className="BarChart">
            <BarChart wordsFreq={wordsFreq} />
          </div>
        </section>
        <Footer />
      </React.StrictMode>
      
    </div>
  );
}
