import React from "react";
import "./App.css";
import NewWordForm from "./components/NewWordForm.js";
import WordCloud from "./components/wordCloud.js";
import { useState, useEffect } from "react";
import axios from "axios";
import WordList from "./components/WordList.js";
import Sunburst from "./components/SunBurst.js";
import RemoveWordForm from "./components/RemoveWordForm.js";
import AlertDialog from "./components/AlertDialog.js";


function App() {
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
      </React.StrictMode>
      <section className='visualization'>
        <React.StrictMode>        
          {/* <aside className='wordTable'>
            <div>
              <WordList submitNewWord={addWord} />
            </div>
          </aside> */}

        </React.StrictMode>
        <div className='feelWheel'>
          <Sunburst clickSubmitNewWord={addWord}/>
        </div>
        <React.StrictMode>
        <div className='forms'>
          <aside>
            <NewWordForm createNewWordForm={addWord} />
          </aside>
          <aside>
            <RemoveWordForm submitDeleteWord={submitDeleteWord} />
          </aside>
          <div>
            <AlertDialog
              isOpen={true}
              onClose={()=>{}}
              title='DELETE ALL WORDS'
              description='This action will permanently remove all the records of your mental health check-in. Click Agree to comfirm this action.'
              confirmBtnLabel='Agree'


            />
            </div> 
          {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete all words?')) this.onCancel() } }>DELETE</div> */}
          </div>
          <main>
            <div className='wordCloud'>
              <WordCloud wordsFreq={wordsFreq} />
            </div>
          </main>
        </React.StrictMode>
      </section>
    </div>
  );
}

export default App;
