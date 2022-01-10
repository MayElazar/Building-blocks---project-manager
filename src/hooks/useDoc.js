import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDoc = (collection, id) => {
  const [Doc, setDoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      let ref = doc(db, collection, id);

      const get = onSnapshot(
        ref,

        async (snapshot) => {
          console.log(snapshot.data());
          if (snapshot.data()) {
            await setDoc({ ...snapshot.data(), id: snapshot.id });
            setError(null);
            console.log(Doc);
            console.log("here");
          } else {
            setError("No Doc");
          }
        },
        (error) => {
          console.log(error);
          setError("faild to get doc");
        }
      );

      return () => {
        get();
      };
    }
  }, [collection, id, setError, error]);

  return { Doc, error };
};
