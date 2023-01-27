import React from "react";
import "./App.css";
import NewWordForm from "./components/NewWordForm.js";
import WordCloud from "./components/wordCloud.js";
import { useState, useEffect } from "react";
import axios from "axios";
import WordList from "./components/WordList.js";
import Sunburst from "./components/SunBurst.js";

function App() {
  const [wordsFreq, setWordsFreq] = useState({});

  const getWords = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/words`)
      .then((response) => {
        setWordsFreq(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addWord = (newWordInfo) => {
    console.log('addWord is called here')
    console.log('Happy new Year!')
    
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

  useEffect(getWords, []);

  return (
    <div>
      <React.StrictMode>
        <header>
          <h1>Feeling Well</h1>
        </header>
        <h2>
        😌Hello there, how are you today?☀️
          </h2>
        <aside>
          <div><WordList submitNewWord={addWord} /></div>
          </aside>
      </React.StrictMode>

        <div><Sunburst /></div>
      
      <React.StrictMode>
        <aside>
          <NewWordForm 
          createNewWordForm={addWord}
          />
        </aside>
        <main>
          <div>
          <WordCloud wordsFreq={wordsFreq}/>
          </div>
        </main>
      </React.StrictMode>
    </div>
  );
}

export default App;
