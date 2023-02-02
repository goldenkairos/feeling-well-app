import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";

const AuthContext = React.createContext();



export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [accountsList, setAccountsList] = useState([])


  //helper function to get all accounts
  const getAccounts = () => {
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/accounts`)
    .then((response) => {
      const accountsListCopy = response.data.map((account) => {
        return {
          ...account,
        };
      });
      setAccountsList(accountsListCopy);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  //helper function to add new account
  const addAccount = (newAccountUid) => {
    getAccounts()
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/accounts`,{account_uid:newAccountUid})
      .then((response) => {
        const newAccounts = [...accountsList];
        const newAccountJSON = {
          // ...newAccountUid,
          // id: null,
          account_uid:newAccountUid
        };
        newAccounts.push(newAccountJSON);
        setAccountsList(newAccounts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //if we don't use firebase, we will have to check signup/login function differently, but everything else should still work
  function signup(email, password) {
    //return a promise
    return auth
      .createUserWithEmailAndPassword(email, password)
  .then((cred) => {
    console.log("USER ID",cred.user.uid);
      addAccount(cred.user.uid)}
      
      // console.log(cred.user.uid)
    );}

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  //firebase method to notify you when user gets set
  //this needs to be in a useEffect because we only want to run this when we mount components
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; //this will unsubscribe us from the onAuthStateChanged listener when we unmount the component
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    signup,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
