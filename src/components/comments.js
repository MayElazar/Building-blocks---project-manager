import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import moment from "moment";
import { doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
export const Comments = ({ proj }) => {
  const [comment, setComment] = useState("");
  const { user } = useAuthContext();
  const subForm = async (e) => {
    e.preventDefault();
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      comment,
      timeStemp: moment().calendar(),
      id: uuidv4(),
    };
    //update comment
    const ref = doc(db, "projects", proj.id);
    await updateDoc(ref, { comment: [...proj.comment, commentToAdd] });
    setComment("");
    //console.log([...proj.comment, commentToAdd]);
  };
  return (
    <div className="comments-container">
      <h4>Comments</h4>
      <ul>
        {proj.comment.length > 0 &&
          proj.comment.map((comment) => (
            <li key={comment.id}>
              <div className="comments">
                <div className="comments-img-comment">
                  <div className="avatar">
                    <img src={comment.photoURL} alt="user profile Pic" />
                  </div>
                  <p>{comment.comment}</p>
                </div>
                <div className="timeStemp">{comment.timeStemp}</div>
              </div>
            </li>
          ))}
      </ul>
      <form onSubmit={subForm}>
        <label>
          <span>Add new comment</span>
          <textarea
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add comment..."
          ></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
};
