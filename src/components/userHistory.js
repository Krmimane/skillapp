import React, { useState } from 'react';
import '../styles/userHistory.css';

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState('learned');

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
      name: 'CSS Responsive Design',
      info: 'Création de sites web adaptatifs avec Flexbox et Grid.',
      role: 'NatureLover',
      date: '5 Décembre 2024',
      image: '../assets/avatar10.png',
    },
  ];
  
  const taughtSkills = [
    {
      name: 'Piano Basics',
      info: 'Concepts essentiels pour démarrer avec Node.js et construire des serveurs backend.',
      role: 'MusicProd',
      date: '20 Novembre 2024',
      image: 'assets/avatar6.png',
    },
    {
      name: 'Python Data Analysis',
      info: 'Utilisation de Python pour manipuler et analyser des ensembles de données.',
      role: 'NatureLover',
      date: '15 Novembre 2024',
      image: 'assets/avatar10.png',
    },
  ];
  

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

  const renderSkills = (skills) =>
    skills.map((skill, index) => (
      <SkillCard
        key={index}
        name={skill.name}
        info={skill.info}
        role={skill.role}
        date={skill.date}
        image={skill.image}
      />
    ));

  return (
    <div className="historyContainer21">
      <div className="historyHeader21">
        <div className="historyTabs21">
          <button
            className={`tabButton21 ${activeTab === 'learned' ? 'active21' : ''}`}
            onClick={() => setActiveTab('learned')}
          >
            Learned
          </button>
          <button
            className={`tabButton21 ${activeTab === 'taught' ? 'active21' : ''}`}
            onClick={() => setActiveTab('taught')}
          >
            Taught
          </button>
        </div>
      </div>
      <div className="historyContent21">
        {activeTab === 'learned' && renderSkills(learnedSkills)}
        {activeTab === 'taught' && renderSkills(taughtSkills)}
      </div>
    </div>
  );
};

export default UserHistory;
