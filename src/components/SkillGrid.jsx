import React from "react";
import "../styles/SkillGrid.css"
const SkillGrid = ({ skills, onSkillClick }) => {
  return (
    <div className="skill-grid">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="skill-card"
          onClick={() => onSkillClick(skill.path)} // Clic redirige avec le chemin
          style={{ cursor: "pointer" }}
        >
          <img src={skill.image} alt={skill.title} className="skill-image" />
          <h3>{skill.title}</h3>
          <p>{skill.category}</p>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
