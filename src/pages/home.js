import React, { useEffect, useState } from 'react';
import Statecirc from "../components/statecirc";
import Statecourbe from "../components/statecourbe";
import '../styles/dashboard.css';
import userData from '../data/user_skill.json';
const Home = () => {
  const [user, setUser] = useState(userData.users[0]);
  const [formData, setFormData] = useState({ ...user });
  const [isMobile, setIsMobile] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [activeTab, setActiveTab] = useState('toLearn'); // Pour mobile : onglet actif

  // Exemple de données utilisateur
  const userSkills = {
    toLearn: [
      {
        name: "Programmation Python",
        description: "Apprendre les bases de Python pour l'analyse de données.",
        progress: 40,
        endDate: "2024-12-31",
        tutorImage: "assets/avatar3.png", // Image du tuteur
      },
      {
        name: "Développement Web",
        description: "Créer des sites web dynamiques avec React.",
        progress: 60,
        endDate: "2025-01-15",
        tutorImage: "assets/avatar6.png",
      },
    ],
    toTeach: [
      {
        name: "HTML",
        description: "Enseigner la structure des pages web.",
        progress: 80,
        endDate: "2024-12-25",
        userImage: "assets/avatar1.jpg", // Image de l'utilisateur
      },
      {
        name: "CSS",
        description: "Enseigner les styles et animations.",
        progress: 50,
        endDate: "2025-01-10",
        userImage: "assets/avatar1.jpg",
      },
    ],
  };

  useEffect(() => {
        const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const SkillCard = ({ name, description, progress, endDate, image, onClick }) => (
    <div className="skillCard" onClick={onClick}>
      <img src={image} alt="Avatar" className="skillImage" />
      <div className="skillContent">
        <div className="skillHeader">
          <h3 className="skillName">{name}</h3>
          <div className="progressBar">
            <div
              className="progress"
              style={{
                width: `${progress}%`,
                backgroundColor: progress > 70 ? "#4CAF50" : "#FFC107",
              }}
            ></div>
          </div>
        </div>
        <p className="skillDescription">{description}</p>
        <p className="endDate">Date de fin : {endDate}</p>
      </div>
    </div>
  );

  // Rendu pour la version Desktop
  const DesktopSkills = () => (
    <div className="customDiv">
      <h3 className="section-title1">Vos Compétences en Cours</h3>

      <div className="skillsContainer">
        <div className="skillsColumn">
          <h3 className="skillColumnLabel">To Learn</h3>
          {userSkills.toLearn.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              description={skill.description}
              progress={skill.progress}
              endDate={skill.endDate}
              image={skill.tutorImage}
              onClick={() => alert(`Cliquez sur la compétence : ${skill.name}`)}
            />
          ))}
        </div>
        <div className="skillsColumn">
          <h3 className="skillColumnLabel">To Teach</h3>
          {userSkills.toTeach.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              description={skill.description}
              progress={skill.progress}
              endDate={skill.endDate}
              image={skill.userImage}
              onClick={() => alert(`Cliquez sur la compétence : ${skill.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Rendu pour la version Mobile
  const MobileSkills = () => (
    <div className="customDiv">
      <div className="tabs">
        <button
          className={`tabButton ${activeTab === 'toLearn' ? 'active' : ''}`}
          onClick={() => setActiveTab('toLearn')}
        >
          To Learn
        </button>
        <button
          className={`tabButton ${activeTab === 'toTeach' ? 'active' : ''}`}
          onClick={() => setActiveTab('toTeach')}
        >
          To Teach
        </button>
      </div>
      <div className="tabContent">
        {activeTab === 'toLearn' &&
          userSkills.toLearn.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              description={skill.description}
              progress={skill.progress}
              endDate={skill.endDate}
              image={skill.tutorImage}
              onClick={() => alert(`Cliquez sur la compétence : ${skill.name}`)}
            />
          ))}
        {activeTab === 'toTeach' &&
          userSkills.toTeach.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              description={skill.description}
              progress={skill.progress}
              endDate={skill.endDate}
              image={skill.userImage}
              onClick={() => alert(`Cliquez sur la compétence : ${skill.name}`)}
            />
          ))}
      </div>
    </div>
  );

  return (
    <div className={isMobile ? "mobileContainer" : "desktopContainer"}>
      {isMobile ? (
        <>
          <div>
            <Statecirc />
          </div>
          <center>
            <button className="buttonSkill" onClick={() => setShowStatistics(true)}>
              Voir les statistiques
            </button>
          </center>
          {showStatistics && (
            <div className="popup">
              <div className="popupContent">
                <button className="closeButton" onClick={() => setShowStatistics(false)}>
                  x
                </button>
                <Statecourbe isPopup={true} />
              </div>
            </div>
          )}
          <MobileSkills />
        </>
      ) : (
        <>
          <div className="welcomeBanner">
            <h1 className="welcomeText">Bonjour, {formData.username} !</h1>
            <p className="motivationText">
              Continuez d’apprendre et d’enseigner — chaque jour est une nouvelle opportunité !
            </p>
          </div>

          <div className="statisticsContainer">
            <div className="stateCircContainer">
              <Statecirc />
            </div>
            <div className="stateCourbeContainer">
              <Statecourbe />
            </div>
          </div>

          <DesktopSkills />
        </>
      )}
    </div>
  );
};

export default Home;
