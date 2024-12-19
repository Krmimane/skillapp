import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import SlideBar from "./components/SliderComponent";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Messages from "./pages/chat";
import LandingPage from "./pages/landingpage";
import SkillUsers from "./pages/SkillUsers";
import Discover from "./pages/Discover";

function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "Home":
        return <Home />;
      case "Profile":
        return <Profile />;
      case "Messages":
        return isMobile ? null : <Messages />;
      default:
        return <Home />;
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Route pour Home avec Sidebar */}
          <Route
            path="/home"
            element={
              <div className="home-layout">
                <SlideBar
                  active={activeSection}
                  setActive={setActiveSection}
                  isMobile={isMobile}
                />
                <div className="main-content">{renderContent()}</div>
              </div>
            }
          />

          {/* Route spécifique pour Discover */}
          <Route
            path="/discover"
            element={
              <div className="discover-layout">
                <Discover />
              </div>
            }
          />

          {/* Autres routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Messages />} />
          <Route path="/skills/:skillName" element={<SkillUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
