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
import "./WelcomePage.css";

export default function WelcomePage() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
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

  const welcomeMessage = currentUser ? (
    <h1>😌Hello {currentUser.displayName}, how are you today?☀️</h1>
  ) : (
    <h1>😌Hello there, how are you today?☀️</h1>
  );

  useEffect(getWords, [currentUser]);

  return (
    <div>
      <React.StrictMode>
        <header>
          <NavBar />
        </header>
        <section className="welcomeMessage">       
          {welcomeMessage} 
        </section>      
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
          </div>
        </section>
        <div className="About">
        <section className="firstIntro">
          <h1 className="firstHeader">Feelings are complicated...</h1>
        </section>
        <section className="secondIntro">
          <h1 className="secondHeader">
            This is a tool for checking in with yourself using the
            Feeling Wheel method.
          </h1>
          <p className="secondParagraph">
            Designed by Gloria Willcox in 1982, the feeling wheel is a proven
            visual aid that helps people recognize, talk about, and change their
            feelings. Inspired by Joseph Zinker's ideas of conceiving the
            therapist as an artist (Zinker, 1978), and Robert Plutchik's
            comparison of emotions to colors (Plutchik's 1980), Wilcox set out
            to design the feelings wheel using the four basic emotions: scared,
            sad, mad and glad. To keep things balance between comfortable and
            uncomfortable emotions, she expanded "glad" into three emotions:
            joyful, powerful, and peaceful.
          </p>
        </section>
        <section className="thirdIntro">
          <h1 className="thirdHeader">
            The exploration of emotions is a vehicle to become aware of your
            power.
          </h1>
          <p className="thirdParagraph">
            Use the feeling wheel to hone this power and build an emotional
            vocabulary that improves your communication quality.
          </p>
        </section>
        </div>
      </React.StrictMode>
    </div>
  );
}
