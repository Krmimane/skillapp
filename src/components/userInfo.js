import React, { useState, useEffect } from 'react';
import '../styles/userInfo.css'; // Importation CSS
import userData from '../data/user_skill.json'; // Importation des données utilisateur

const UserInfo = ({ idprofile }) => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('learned');

  useEffect(() => {
    // Filtrer les utilisateurs pour trouver celui avec l'ID correspondant
    const userFound = userData.users.find(user => user.id === parseInt(idprofile));
    setUser(userFound); // Mettre à jour l'état avec les données de l'utilisateur trouvé
  }, [idprofile]); // Recharger les données lorsque l'ID change

  const learnedSkills = [
    { name: 'Skill Name', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
    { name: 'Skill Name', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
  ];

  const taughtSkills = [
    { name: 'info', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
  ];

  const renderSkills = (skills) => (
    skills.map((skill, index) => (
      <div key={index} className="skill-card">
        <div className="skill-header">
          <strong>{skill.name}</strong>
          <p>{skill.info}</p>
        </div>
        <div className="skill-footer">
          <span className="user-role">{skill.role}</span>
          <span className="skill-date">{skill.date}</span>
        </div>
      </div>
    ))
  );

  if (!user) {
    return <p>Chargement des données...</p>; // Afficher un message si l'utilisateur n'est pas encore chargé
  }

  return (
    <div className="profile-cont">
      <div className="profile-h">
        {/* Avatar avec effet */}
        <div className="avatar-container">
          <img
            src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"} // Utiliser l'avatar de l'utilisateur
            alt="avatar"
            className="avatar"
          />
        </div>

        {/* Informations utilisateur */}
        <div className="user-details">
          <h2 className="username">{user.username}</h2>
          <p className="ma3">
            <span>Âge : {user.age}</span> | <span>Sexe : {user.sexe}</span>
          </p>
          <p className="bio1">
            {user.bio || 'Aucune information disponible'}
          </p>

          <div className="skills-section">
            <h4>Compétences :</h4>
            <div className="skills">
              {user.categories.flatMap(cat =>
                cat.skills.map(skill => (
                  <span className={`skill ${skill.niveau.toLowerCase()}`} key={skill.nom}>
                    {skill.nom} ({skill.niveau})
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section historique */}
      <h3 className="section-title">Formations Disponibles</h3>
      <div className="history-content">
        {activeTab === 'learned' && renderSkills(learnedSkills)}
        {activeTab === 'taught' && renderSkills(taughtSkills)}
      </div>
    </div>
  );
};

export default UserInfo;
