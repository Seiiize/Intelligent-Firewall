import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./app.css";
import PacketDetails from "./components/PacketDetails";
import PacketGraphs from "./components/PacketGraphs";
import PacketGraphsByTime from "./components/PacketGraphsByTime";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modesombre, setModeSombre] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if (modesombre) {
      document.documentElement.style.setProperty("--bg-color", "#191a1a");
      document.documentElement.style.setProperty(
        "--text-color",
        "rgba(32, 255, 236, 0.521)"
      );
      document.documentElement.style.setProperty("--carrecolor", "#3b3b3b");
    } else {
      document.documentElement.style.setProperty("--bg-color", "#f3f3f3");
      document.documentElement.style.setProperty("--text-color", "#388087");
      document.documentElement.style.setProperty("--carrecolor", "#e1e1e1");
    }
  }, [modesombre]);
  const handleInputChange = (event) => {
    setModeSombre(event.target.checked);
  };
  return (
    <div className="app">
      <Router>
        {isLoggedIn && (
          <nav
            style={{
              display: "flex",
              justifyContent: "space-around",
              height: "60px",
              alignItems: "center",
              color: "blue",
              fontSize: "20px",
              backgroundColor: "#141414",
            }}
          >
            <Link className="LINK" to="/home">
              Home
            </Link>
            <Link to="/packet-details" className="LINK">
              Packet Details
            </Link>
            <Link to="/packet-graphs" className="LINK">
              Graphs
            </Link>
            <Link to="/login" onClick={handleLogout} className="LINK">
              Logout
            </Link>
          </nav>
        )}
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Register onRegister={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/packet-details"
            element={isLoggedIn ? <PacketDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/packet-graphs"
            element={isLoggedIn ? <PacketGraphs /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
