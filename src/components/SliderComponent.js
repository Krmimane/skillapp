
import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styles/SliderComponent.css";
import { FaHome, FaSearch, FaEnvelope, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";

const SlideBar = ({ isMobile , humbon}) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/home", icon: <FaHome />, mobileVisible: true },
    { name: "Discover", path: "/discover", icon: <FaSearch />, mobileVisible: true },
    { name: "Messages", path: "/messages", icon: <FaEnvelope />, mobileVisible: false },
    { name: "Profile", path: "/profile", icon: <FaUser />, mobileVisible: true },
  ];

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      {isMobile &&  humbon==null &&(
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}
      <div className={`sidebar ${isMobile && isActive ? "active" : ""}`}>
        <div className="user-profile">
          <div className="user-icon">
          <img
                src="/assets/logo3.png"
                alt="Logo"
                style={{ height: "3.5rem", width: "3.5rem" }}
              />
            <h1 className="user-name">SkillSphere</h1>
                      
          </div>
          
        </div>
        <div className="menu">
          {menuItems.map(
            (item) =>
              (!isMobile || item.mobileVisible) && (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className={({ isActive }) =>
                    `menu-item ${isActive ? "active" : ""}`
                  }
                  onClick={() => setIsActive(false)}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.name}</span>
                </NavLink>
              )
          )}
        </div>
        <div className="logout">
          <FaSignOutAlt className="logout-icon" />
          <span className="logout-label">Déconnexion</span>
        </div>

      </div>
      {/* Bouton mobile pour "Messages" */}
      {isMobile && location.pathname !== "/messages" && (
        <button
          className="mobile-message-btn"
          onClick={() => {
            setIsActive(false); // Ferme la barre latérale
            navigate("/messages"); // Navigue vers la page des messages
          }}
        >
          <AiOutlineMessage size={25} />
        </button>
      )}
      
    </div>
  );
};

export default SlideBar;
