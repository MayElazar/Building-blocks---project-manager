import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { setDoc, doc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // const storage = getStorage();

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(
        storage,
        `thumbnails/${res.user.uid}/${thumbnail.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, thumbnail, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            default:
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // add display AND PHOTO_URL name to user

            let user = res.user;
            updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });
            sessionStorage.setItem("online", true);
            let data = sessionStorage.getItem("online");

            //create user doc
            setDoc(doc(db, "users", res.user.uid), {
              online: Boolean(data),
              photoURL: downloadURL,
              displayName,
            });
            if (!isCancelled) {
              setIsPending(false);
              setError(null);
            }
            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user });
          });
        }
      );
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

  return { signup, error, isPending };
};
/*
//signup with email and password
export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, userName, photoFile) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // upload user Imag
        const uploadPath = `profileImg/${res.user.uid}/${photoFile.name}`.then(
          async (snapshot) => {
            const img = await storage.ref(uploadPath).put(photoFile);

            await res.user.updateProfile({
              userName,
              photoUrl: img.ref.getDownloadURL(),
            });
          }
        );

        dispatch({ type: "LOGIN", payload: res.user });

        console.log("user signed up: ", res.user);

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
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
*/
