import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SkillUsers.css";
import UserCard from "../components/UserCard";
import userSkills from "../data/user_skill.json";

const SkillUsers = () => {
  const { skillName } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const filteredUsers = userSkills.users.filter((user) =>
      user.categories.some((category) =>
        category.skills.some((skill) => skill.nom === skillName)
      )
    );
    setUsers(filteredUsers);
  }, [skillName]);

  return (
    <div className="skill-users-container">
      <h2>Users with skill: {skillName}</h2>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SkillUsers;
