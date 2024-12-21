import React from "react";
import "../styles/UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.photo} alt={user.name} className="user-photo" />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.jobTitle}</p>
        <div className="user-skills">
          {user.categories.map((category, index) => (
            <span key={index} className="user-skill">
              {category.skills.map(skill => skill.nom).join(", ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
