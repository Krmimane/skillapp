import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/SkillUser.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";


const SkillUser = ({ user, categoryName , setidUserSelected,setidprofile}) => {
  const [showModal, setShowModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  // Trouver toutes les compétences de l'utilisateur
  const findAllSkills = () => {
    return user?.categories?.flatMap(category => category.skills) || [];
  };

  // Trouver les compétences d'une catégorie spécifique
  const findSkillsInCategory = (categoryName) => {
    const category = user?.categories?.find(category => category.nom === categoryName);
    return category?.skills || [];
  };

  // Gérer l'ouverture du modal pour une compétence spécifique
  const handleOpenSkillModal = (e, skill) => {
    e.stopPropagation(); // Empêche d'ouvrir le modal global
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  // Gérer l'ouverture du modal global pour toutes les compétences
  const handleOpenGlobalModal = () => {
    const allSkills = findAllSkills();
    setSelectedSkills(allSkills);
    setShowModal(true);
  };

  // Fermer le modal spécifique
  const closeSkillModal = () => {
    setShowSkillModal(false);
    setSelectedSkill(null);
  };

  // Fermer le modal global
  const closeModal = () => {
    setShowModal(false);
    setSelectedSkills([]);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
      closeSkillModal();
    }
  };

  // Liste des compétences de la catégorie spécifiée pour afficher dans la carte utilisateur
  const skillsInCategory = findSkillsInCategory(categoryName);

  return (
    <>
      {/* Carte utilisateur */}
      <div className="skill-user-card" onClick={handleOpenGlobalModal}>
        {/* Profil utilisateur */}
        <div className="profile-header">
        
            <div className="profile-image-container" onClick={(e) => {
            setidprofile(user.id);
            navigate("/userprofile");
            
          }}>
              <img
                src={user.avatar}
                alt={`${user.username}'s profile`}
                className="profile-image"
              />
            </div>

          <div className="username-container">
            <h3  onClick={(e) => {
            setidprofile(user.id);
            navigate("/userprofile");
            
          }}
          >{user.username}</h3>
          </div>
        </div>

        <button
          className="chat-button"
          title="Chat"
          onClick={(e) => {
            setidUserSelected(user.id);
            navigate("/messages");
            e.stopPropagation(); // Empêche d'ouvrir le modal quand on clique sur le bouton
            
          }}
        >
          <AiOutlineMessage />
        </button>

        {/* Informations personnelles */}
        <div className="user-info">
          <h4>Informations Personnelles</h4>
          <div className="user-info29">
        <h4>Age: {user.age} | Sexe: {user.sexe === "M" ? "Male" : "Female"}</h4>
        </div>
        </div>

        <h4>Description :</h4>
      <div className="skills-list">
        {skillsInCategory.length > 0 ? (
          skillsInCategory.map((skill, index) => (
            <div key={index} className="skill-item">
              <h5 className="skill-name">{skill.nom}</h5> {/* Affiche le nom de la compétence */}
              {skill.description && (
                <p className="skill-description">{skill.description}</p>
              )}
            </div>
          ))
        ) : (
          <p>Aucune compétence disponible dans cette catégorie.</p>
        )}
      </div>


        {/* Liste des compétences de la catégorie spécifiée */}
        <div className="skills-section">
          <h4>Skills (Catégorie: {categoryName}):</h4>
          <div className="skills-list">
            {skillsInCategory.length > 0 ? (
              skillsInCategory.map((skill, index) => (
                <button
                  key={index}
                  className="skill-button"
                  onClick={(e) => handleOpenSkillModal(e, skill)}
                >
                  {skill.nom} - {skill.niveau}
                </button>
              ))
            ) : (
              <p>Aucune compétence disponible dans cette catégorie.</p>
            )}
          </div>
        </div>
      </div>

     {showSkillModal && selectedSkill && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <span className="close" onClick={closeSkillModal}>&times;</span>
            <div className="modal-body">
              <div className="user-profile-info">
                <div className="profile-image-container">
                  <Link to={`/profile/${user.username}`} className="profile-link">
                    <img
                      src={user.avatar}
                      alt={`${user.username}'s profile`}
                      className="profile-image"
                    />
                  </Link>
                </div>
                <div className="username-container">
                  <Link to={`/profile/${user.username}`} className="username-link">
                    <h3>{user.username}</h3>
                  </Link>
                </div>
              </div>
              <h5>{selectedSkill.nom} - {selectedSkill.niveau}</h5>
              {selectedSkill.keyPoints && selectedSkill.keyPoints.length > 0 ? (
                <ul>
                  {selectedSkill.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p>Aucun point clé disponible.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showModal && selectedSkills.length > 0 && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-body">
              <div className="user-profile-info">
                <div className="profile-image-container">
                  <Link to={`/profile/${user.username}`} className="profile-link">
                    <img
                      src={user.avatar}
                      alt={`${user.username}'s profile`}
                      className="profile-image"
                    />
                  </Link>
                </div>
                <div className="username-container">
                  <Link to={`/profile/${user.username}`} className="username-link">
                    <h3>{user.username}</h3>
                  </Link>
                </div>
              </div>
              <h2>Compétences et Points Clés :</h2>
              {selectedSkills.map((skill, index) => (
                <div key={index} className="skill-detail">
                  <h5>{skill.nom} - {skill.niveau}</h5>
                  {skill.keyPoints && skill.keyPoints.length > 0 ? (
                    <ul>
                      {skill.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun point clé disponible.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SkillUser;
