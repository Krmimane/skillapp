import React, { useState } from 'react';
import '../styles/userHistory.css';

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState('learned');

  const learnedSkills = [
    { name: 'Skill Name', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
    { name: 'Skill Name', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
    { name: 'Skill Name', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
  ];

  const taughtSkills = [
    { name: 'info', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
    { name: 'Skill Name', info: 'Information sur utilisateur', role: 'Tuteur', date: 'date' },
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

  return (
    <div className="history-container">
      <div className="history-header">
        <div className="history-tabs">
          <button 
            className={`tab-button ${activeTab === 'learned' ? 'active' : ''}`}
            onClick={() => setActiveTab('learned')}
          >
            Learned
          </button>
          <button 
            className={`tab-button ${activeTab === 'taught' ? 'active' : ''}`}
            onClick={() => setActiveTab('taught')}
          >
            Taught
          </button>
        </div>
      </div>
      <div className="history-content">
        {activeTab === 'learned' && renderSkills(learnedSkills)}
        {activeTab === 'taught' && renderSkills(taughtSkills)}
      </div>
    </div>
  );
};

export default UserHistory;
