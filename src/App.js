import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ChatPage from "./components/ChatPage";
import BlogsPage from "./components/BlogsPage";
import "./App.css";
import TravelImage from "./asset/bg3.jpg";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import EventsPage from "./components/EventsPage";
import LoginPage from "./components/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("username");
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          <Route
            path="*"
            element={
      <div
        className="app-container flex h-screen"
        style={{
          backgroundImage: `url(${TravelImage})`,
          boxShadow: "inset 0 0 0 2000px rgba(255, 161, 73, 0.46)",
          // boxShadow: "inset 0 0 0 2000px rgba(237, 132, 33, 0.74)",
          // boxShadow: "inset 0 0 0 2000px rgba(241, 131, 29, 0.79)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Sidebar isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        <div
          className={`flex-1 transition-all duration-300 p-6 pr-0 overflow-y-auto h-screen ${
            isChatOpen ? "ml-20" : "ml-10"
          }`}
          style={{ maxHeight: "100vh" }}
        >
          <div className="fixed top-0 right-0 h-16 flex justify-end items-center pr-6  bg-opacity-90 ">
    <span className="text-white text-lg font-semibold mr-3">{username}</span>
    <FaUserCircle className="text-white text-3xl cursor-pointer" />
    <FaSignOutAlt
      className="text-white text-2xl ml-4 cursor-pointer"
      onClick={handleLogout}
      title="Logout"
    />
  </div>

  {/* Main Content */}
  {/* <div className="pt-5"> */}
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
    </Routes>
  {/* </div> */}
        </div>
      </div>
       }
       />
     )}
     </Routes>
    </Router>
  );
}

export default App;
