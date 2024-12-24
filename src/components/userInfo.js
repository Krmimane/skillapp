import React, { useState, useEffect } from 'react'; 
import '../styles/userInfo.css'; // Importation CSS
import userData from '../data/user_skill.json'; // Importation des données utilisateur

const SkillCard = ({ name, info, role, date, image }) => (
  <div className="skillCard21">
    <img src={image} alt="Avatar" className="skillImage21" />
    <div className="skillContent21">
      <div className="skillHeader21">
        <h3 className="skillName21">{name}</h3>
      </div>
      <p className="skillInfo21">{info}</p>
      <div className="skillFooter21">
        <span className="userRole21">{role}</span>
        <span className="skillDate21">{date}</span>
      </div>
    </div>
  </div>
);

const UserInfo = ({ idprofile }) => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('learned');

  useEffect(() => {
    // Filtrer les utilisateurs pour trouver celui avec l'ID correspondant
    const userFound = userData.users.find(user => user.id === parseInt(idprofile));
    setUser(userFound); // Mettre à jour l'état avec les données de l'utilisateur trouvé
  }, [idprofile]); // Recharger les données lorsque l'ID change

  const learnedSkills = [
    {
      name: 'JavaScript Basics',
      info: 'Introduction aux concepts de base comme les variables, les boucles, et les fonctions.',
      role: 'HealthyVibes',
      date: '15 Décembre 2024',
      image: '../assets/avatarheakth.png',
    },
    {
      name: 'React Fundamentals',
      info: 'Apprentissage des composants, des hooks, et du state management.',
      role: 'TravelerSpirit',
      date: '10 Décembre 2024',
      image: '../assets/avatarr.png',
    },
    {
      name: 'Python Data Analysis',
      info: 'Utilisation de Python pour manipuler et analyser des ensembles de données.',
      role: 'NatureLover',
      date: '15 Novembre 2024',
      image: 'assets/avatar10.png',
    },
  ];

  const taughtSkills = [
    { name: 'info', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date', image: 'https://via.placeholder.com/60' },
  ];

  const renderSkills = (skills) => (
    skills.map((skill, index) => (
      <SkillCard
        key={index}
        name={skill.name}
        info={skill.info}
        role={skill.role}
        date={skill.date}
        image={skill.image}
      />
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
      <div className="historyContent21">
        {activeTab === 'learned' && renderSkills(learnedSkills)}
        {activeTab === 'taught' && renderSkills(taughtSkills)}
      </div>
    </div>
  );
};

export default UserInfo;
