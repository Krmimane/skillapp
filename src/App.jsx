import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SlideBar from "./components/SliderComponent";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Messages from "./pages/chat";
import LandingPage from "./pages/landingpage";
import SkillUsers from "./pages/SkillUsers";
import Discover from "./pages/Discover";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={<LandingPage setCurrentUsername={setCurrentUsername} />}
          />

          {/* Main Layout */}
          <Route
            path="/*"
            element={
              <>
                <SlideBar isMobile={isMobile} />
                <div className="main-content">
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route
                      path="messages"
                      element={isMobile ? null : <Messages currentUsername={currentUsername} />}
                    />
                    <Route path="discover" element={<Discover />} />
                    <Route path="skills/:skillName" element={<SkillUsers />} />
                    {/* Redirect to Home for unknown routes */}
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
