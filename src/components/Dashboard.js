import { useAuth } from "../contexts/AuthContext.js";

// import NewWordForm from "./components/NewWordForm.js";
import "./Dashboard.css";
import NewWordForm from "./NewWordForm.js";
import WordCloud from "./wordCloud.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import WordList from "./WordList.js";
import Sunburst from "./SunBurst.js";
import RemoveWordForm from "./RemoveWordForm.js";
import NavBar from "./NavBar.js";
import BarChart from "./BarChart.js";
import DeleteConfirmationModal from "./DeleteConfirmationModal.js";

export default function Dashboard() {
  // const [error, setError] = useState("");
  const { currentUser} = useAuth();
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
    // console.log("addWord func called here!");
    let postWordsURL = null;
    if (!currentUser.uid) {
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
    if (!currentUser.uid) {
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

  useEffect(getWords, [currentUser]);

  return (
    <div>
      <React.StrictMode>
        <header>
          <NavBar getWords={getWords} />
        </header>
        <section className="visualization">
          <div className="feelWheel">
            <Sunburst clickSubmitNewWord={addWord} />
          </div>
          <div>
            <WordCloud className="wordCloud" wordsFreq={wordsFreq} />
          </div>
          <div className="forms">
            <aside>
              <NewWordForm createNewWordForm={addWord} />
            </aside>
            <aside>
              <RemoveWordForm submitDeleteWord={submitDeleteWord} />
            </aside>
            <aside>
              <aside>
                <DeleteConfirmationModal deleteAllWords={()=>deleteAllWords()} />
              </aside>
            </aside>
          </div>
          <div>
            <BarChart className="BarChart" wordsFreq={wordsFreq} />
          </div>
        </section>
      </React.StrictMode>
    </div>
  );
}
