import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import SlideBar from "./components/SliderComponent";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Messages from "./pages/chat";
import LandingPage from "./pages/landingpage";

import Discover from "./pages/Discover";
import UserInfo from "./components/userInfo";
import ChatMobile from "./pages/ChatMobile";
import SkillUsersPage from "./pages/SkillUsersPage"; 

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentUsername, setCurrentUsername] = useState("");
  const [idUserSelected, setidUserSelected] = useState(null);
  const [idprofile,setidprofile]=useState(0);
  const [humbon,sethumbon]=useState(null);


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
    const isMessage = location.pathname === "/messages";
    const isDiscover = location.pathname === "/discover";

    return (
      <div className={`main-content ${isHome ? "home-page" : ""}  ${isMessage ? "message-page" : ""} ${isDiscover ? "discover-page" : ""}  `}>
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
                <SlideBar isMobile={isMobile} humbon={humbon} />
                <MainContentWrapper>
                  <Routes>
                    <Route path="home" element={<Home  currentUsername={currentUsername}/>} />
                    <Route
                      path="profile"
                      element={<Profile currentUsername={currentUsername} />}
                    />
                    <Route path="userprofile" element={<UserInfo idprofile={idprofile} />} />
                    <Route
                      path="messages"
                      element={isMobile  ? (
                        <ChatMobile currentUsername={currentUsername} idUserSelected={idUserSelected}  sethumbon={sethumbon} humbon={humbon}/>
                      ) : (
                        <Messages currentUsername={currentUsername} idUserSelected={idUserSelected} />
                      )
                    }
                    />
                    <Route path="discover" element={<Discover  />} />
                    <Route path="/skill-users/:skillName" element={<SkillUsersPage setidUserSelected={setidUserSelected}  setidprofile={setidprofile}/>} />
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
