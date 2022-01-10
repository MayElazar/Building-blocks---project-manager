import { useState, useEffect } from "react";
import { app, auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  // Save data to sessionStorage
  sessionStorage.setItem("online", true);
  let data = sessionStorage.getItem("online");

  let idkey;
  //
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    console.log(app._name);
    console.log(app._options.apiKey);

    //firebase:authUser:AIzaSyDbF-ChuZRfwFYaKZV3oiXvSp82K7BzMfU:[DEFAULT]
    // login
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            updateDoc(doc(db, "users", res.user.uid), {
              online: Boolean(data),
            });

            idkey = sessionStorage.getItem(
              `firebase:authUser:${app.options.apiKey}:${app.name}`
            );
            console.log(idkey);

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
              setIsPending(false);
              setError(null);
            }
          })
          .catch((err) => {
            if (!isCancelled) {
              setError(err.message);
              setIsPending(false);
            }
          });
      })
      .catch((err) => {
        setError(err.message);
      });

    //update user Doc - online
    //  const { uid } = user;
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error, idkey };
};
