import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

export const useDeleteDoc = (col, id) => {
  const deleteProject = () => {
    const ref = doc(db, col, id);
    deleteDoc(ref)
      .then(() => {
        console.log("project deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { deleteProject };
};
