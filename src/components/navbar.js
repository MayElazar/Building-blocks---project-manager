import { Link } from "react-router-dom";
//styles
import "./navbar.css";

//import logo - image
import logo from "../assets/Logo.svg";
//import hooks
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { browserSessionPersistence } from "firebase/auth";
function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();
  // let data = sessionStorage.getItem("online");
  if (browserSessionPersistence) {
    console.log("Yay");
  }
  return (
    <div className="navbar">
      <ul>
        <li>
          {<img src={logo} className="logo" alt="building blocks logo" />}
        </li>
        {!user && (
          <>
            <div>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">signup</Link>
              </li>
            </div>
          </>
        )}

        {user && (
          <li>
            <>
              {!isPending && (
                <>
                  <button className="btn" onClick={logout}>
                    Logout
                  </button>
                </>
              )}{" "}
              {isPending && (
                <button className="btn" disabled>
                  Logging out..
                </button>
              )}
            </>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
