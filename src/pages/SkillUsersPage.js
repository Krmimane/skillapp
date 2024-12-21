import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SkillUser from '../components/SkillUser';
import userSkills from '../data/user_skill.json';
import "../styles/SkillUsersPage.css";

const SkillUsersPage = ({setidUserSelected}) => {
  const { skillName } = useParams(); // Récupérer le nom de la compétence depuis l'URL
  const [usersWithSkill, setUsersWithSkill] = useState([]);

  useEffect(() => {
    const usersFiltered = userSkills.users.filter((user) => 
      user.categories.some((category) => 
        category.skills.some((skill) => skill.nom === skillName)
      )
    );
    setUsersWithSkill(usersFiltered);
  }, [skillName]);

  return (
    <div className="skill-users-page">
      <h1 className="page-title">Users with {skillName} Skill</h1>


      {usersWithSkill.length > 0 ? (
        <div className="skill-users-list">
          {usersWithSkill.map((user) => (
            <SkillUser key={user.id} user={user} skillName={skillName} setidUserSelected={setidUserSelected} />
          ))}
        </div>
      ) : (
        <p>No users found with the {skillName} skill.</p>
      )}
    </div>
  );
};

export default SkillUsersPage;
