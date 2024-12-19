import React from "react";
//import "../styles/UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.username}</h3>
      <p>Age: {user.age}</p>
      <p>Bio: {user.bio}</p>
      <p>Gender: {user.sexe}</p>
    </div>
  );
};

export default UserCard;
