import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SkillCard.css";

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/skills/${skill.nom}`);
  };

  return (
    <div className="skill-card" onClick={handleClick}>
      <h3>{skill.nom}</h3>
      <p>{skill.niveau}</p>
    </div>
  );
};

export default SkillCard;
