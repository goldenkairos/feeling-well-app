import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //if we don't use firebase, we will have to check signup/login function differently, but everything else should still work
  function signup(email, password) {
    //return a promise
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => console.log(cred.user.uid));
    //helper function to post new user
    //how to get the user.uid
  }

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
