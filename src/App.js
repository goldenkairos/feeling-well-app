import "./App.css";
import NewWordForm from "./components/NewWordForm.js";
import WordCloud from "./components/wordCloud.js";
import { useState, useEffect } from "react";
import axios from "axios";
import WordList from "./components/WordList.js";
import FeelingWheel from "./FeelingWheel.js"


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
      <header>
        <h1>Feeling Well</h1>
      </header>
      <h2>
      😌Hello there, how are you today?☀️
        </h2>
      <aside>
        <div><WordList submitNewWord={addWord} /></div>

        <NewWordForm 
        createNewWordForm={addWord}
        />
      </aside>
      <main>
        <div>
        <WordCloud wordsFreq={wordsFreq}/>
        </div>
        <div>
          <FeelingWheel />
        </div>
      </main>
    </div>
  );
}

export default App;
