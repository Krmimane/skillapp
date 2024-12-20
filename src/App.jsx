import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import SlideBar from "./components/SliderComponent";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Messages from "./pages/chat";
import LandingPage from "./pages/landingpage";
import SkillUsers from "./pages/SkillUsers";
import Discover from "./pages/Discover";
import UserInfo from "./components/userInfo";

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

  const MainContentWrapper = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === "/home";

    return (
      <div className={`main-content ${isHome ? "home-page" : ""}`}>
        {children}
      </div>
    );
  };

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
                <MainContentWrapper>
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="userprofile" element={<UserInfo />} />
                    <Route
                      path="messages"
                      element={isMobile ? null : <Messages currentUsername={currentUsername} />}
                    />
                    <Route path="discover" element={<Discover />} />
                    <Route path="skills/:skillName" element={<SkillUsers />} />
                    {/* Redirect to Home for unknown routes */}
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </MainContentWrapper>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
