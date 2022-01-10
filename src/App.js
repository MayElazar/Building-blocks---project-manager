import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//styles
import "./App.css";

//import components
import Create from "./pages/create";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Project from "./pages/project";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
//import hook
import { useAuthContext } from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers";
function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <div className="content">
              {user && (
                <>
                  <Sidebar />
                </>
              )}
              <Routes>
                {user && <Route path="/" element={<Dashboard />} />}
                {!user && (
                  <Route path="/" element={<Navigate replace to="/login" />} />
                )}
                <Route path="/project/:id" element={<Project />} />
                <Route path="/create" element={<Create />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
              {user && (
                <>
                  {/* <Sidebar />*/}
                  <OnlineUsers />
                </>
              )}
            </div>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
