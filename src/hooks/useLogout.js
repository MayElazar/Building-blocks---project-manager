import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
//import { ref, onDisconnect } from "firebase/database";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();
  // Save data to sessionStorage
  //sessionStorage.setItem("online", false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      sessionStorage.setItem("online", false);
      let data = sessionStorage.getItem("online");

      //update user data- online false
      const { uid } = user;
      await updateDoc(doc(db, "users", uid), {
        online: Boolean(!data),
        timeStemp: serverTimestamp(),
      });

      // sign the user out
      await auth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
