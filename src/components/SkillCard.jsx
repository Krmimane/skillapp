import React from "react";
import "../styles/SkillCard.css";

const SkillCard = ({ skill, image }) => {
  const defaultImage = "/images/default-skill.jpg"; // Image par défaut si aucune n'est fournie

  return (
    <div className="skill-card">
      <img
        src={image || defaultImage}
        alt={skill}
        className="skill-image"
      />
      <h3 className="skill-name">{skill}</h3>
    </div>
  );
};

export default SkillCard;
