import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// styles & images
import "./Sidebar.css";

export default function Sidebar() {
  console.log(useAuthContext());
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <div className="avatar">
            <img src={user.photoURL} alt="profile pic" />
          </div>
          <p>
            Hey <span>{user.displayName}</span>
          </p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                {/* <img src={DashboardIcon} alt="dashboard icon" />*/}
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                {/*<img src={AddIcon} alt="add project icon" />*/}
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
