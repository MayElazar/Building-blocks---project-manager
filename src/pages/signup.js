import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { NavLink, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
//styles
import "./signup.css";

export default function Signup() {
  const { user } = useAuthContext();
  //useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [fileError, setFileError] = useState(null);
  // useSignup hook
  const { signup, isPending, error } = useSignup();
  //subit form function
  const handleSub = (e) => {
    e.preventDefault();
    console.log(email, password, userName, thumbnail);
    signup(email, password, userName, thumbnail);
  };
  //upload user image func
  const handleFileUpload = (e) => {
    //  e.preventDefault();
    setThumbnail(null);
    let file = e.target.files[0];

    if (!file) {
      setFileError(`Opps you didnt' choose a file`);
      return;
    }
    if (!file.type.includes("image")) {
      setFileError(`Slected file must be an image`);
      return;
    }
    if (!file.size > 1000000) {
      setFileError(`File size must be less then 100Kb`);
      return;
    }
    const reader = new FileReader();
    console.log(reader.readAsDataURL(file));
    setFileError(null);
    setThumbnail(file);
    console.log(file);
  };

  return (
    <div className="loginContainer">
      <div>
        {user && <Navigate replace to="/"></Navigate>}
        <h2>signup</h2>
        <form onSubmit={handleSub}>
          <label>
            <span>email:</span>
            <input
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span>User name:</span>
            <input
              required
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </label>

          <label>
            <span>password:</span>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <label>
            <span>userImg:</span>
            <input required type="file" onChange={handleFileUpload} />
          </label>
          {fileError && <p>{fileError}</p>}
          <button>Signup</button>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </form>
        <NavLink to="/login">already have a user? login</NavLink>
      </div>
    </div>
  );
}
