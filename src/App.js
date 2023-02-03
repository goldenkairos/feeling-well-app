// import React from "react";
// import "./App.css";
// import NewWordForm from "./components/NewWordForm.js";
// import WordCloud from "./components/wordCloud.js";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import WordList from "./components/WordList.js";
// import Sunburst from "./components/SunBurst.js";
// import RemoveWordForm from "./components/RemoveWordForm.js";

// function App() {
//   const [wordsFreq, setWordsFreq] = useState({});
//   // const [selected, setSelected] = useState(null);

//   // const onClickSelect = () => {
//   //   setSelected("word")
//   // }

//   const getWords = () => {
//     axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/words`)
//       .then((response) => {
//         setWordsFreq(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const addWord = (newWordInfo) => {
//     console.log("Happy New Year!");
//     console.log("We made huge progress today");
//     console.log("addWord is called here");
//     console.log("Happy new Year!");

//     axios
//       .post(`${process.env.REACT_APP_BACKEND_URL}/words`, newWordInfo)
//       .then((response) => {
//         console.log(response.data);
//         getWords();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const submitDeleteWord = (deleteWordInfo) => {
//     axios
//       .delete(`${process.env.REACT_APP_BACKEND_URL}/words/${deleteWordInfo}`)
//       .then((response) => {
//         console.log(response.data);
//         getWords();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(getWords, []);

//   return (
//     <div>
//       <React.StrictMode>
//         <header>
//           <h1>Feeling Well</h1>
//         </header>
//         <h2>😌Hello there, how are you today?☀️</h2>
//       </React.StrictMode>
//       <section className='visualization'>
//         <React.StrictMode>        
//           {/* <aside className='wordTable'>
//             <div>
//               <WordList submitNewWord={addWord} />
//             </div>
//           </aside> */}

//         </React.StrictMode>
//         <div className='feelWheel'>
//           <Sunburst clickSubmitNewWord={addWord}/>
//         </div>
//         <React.StrictMode>
//         <div className='forms'>
//           <aside>
//             <NewWordForm createNewWordForm={addWord} />
//           </aside>
//           <aside>
//             <RemoveWordForm submitDeleteWord={submitDeleteWord} />
//           </aside>
//           {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete all words?')) this.onCancel() } }>DELETE</div> */}
//           </div>
//           <main>
//             <div className='wordCloud'>
//               <WordCloud wordsFreq={wordsFreq} />
//             </div>
//           </main>
//         </React.StrictMode>
//       </section>
//     </div>
//   );
// }

// export default App;
import React from "react";
import './App.css';
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import Signup from "./components/Signup.js";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import ForgotPassword from "./components/ForgotPassword.js";
import UpdateProfile from "./components/UpdateProfile.js";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
    {/* <Dashboard /> */}
      <div style={{ minWidth: "300px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              {/* <Route exact path="/" element={<Dashboard />}/> */}
              {/* replace with below due to change in ReactV6 */}
              <Route
                path="/"
                element={                   
                    <Dashboard />                   
                }
              ></Route>
              <Route
                path="/"
                element={
                   <PrivateRoute>
                    <Dashboard />
                   </PrivateRoute>
                }
              ></Route>

              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/logout" element={<Logout />} /> */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
    
  );
}

export default App;
