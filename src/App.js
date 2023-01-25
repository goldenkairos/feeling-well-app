import "./App.css";
import NewWordForm from "./components/NewWordForm";
import { useState, useEffect } from "react";
import axios from "axios";
import WordCloud from "./components/wordCloud";

function App() {
  const [wordsString, setWordsString] = useState("");

  const addWord = (newWordInfo) => {
    console.log('addWord is called here')
    
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/words`, newWordInfo)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWords = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/words`)
      .then((response) => {
        setWordsString(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(getWords, []);

  return (
    <div>
      <header>
        <h1>Feeling Well</h1>
      </header>

      <aside>
        <NewWordForm createNewWordForm={addWord} />
      </aside>
      <aside>
        <WordCloud />
      </aside>
      <main>
        <div>{wordsString}</div>
        <button onClick={()=>getWords()}>Generate WordCloud</button>
      </main>
    </div>
  );
}

export default App;
