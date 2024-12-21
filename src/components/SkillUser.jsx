import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/SkillUser.css";
import { useNavigate } from "react-router-dom";


const SkillUser = ({ user, categoryName , setidUserSelected}) => {
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
          <Link to={`/user-profile/${user.id}`} className="profile-icon">
            <div className="profile-image-container">
              <img
                src={user.image}
                alt={`${user.username}'s profile`}
                className="profile-image"
              />
            </div>
          </Link>
          <div className="username-container">
            <h3>{user.username}</h3>
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
          💬
        </button>

        {/* Informations personnelles */}
        <div className="user-info">
          <h4>Informations Personnelles</h4>
          <div className="info-row">
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Sexe:</strong> {user.sexe === "M" ? "Male" : "Female"}</p>
          </div>
        </div>

        {/* Bio utilisateur */}
        <div className="bio-section">
          <h4>Bio:</h4>
          <p>{user.bio || "Aucune bio disponible."}</p>
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

      {/* Modal spécifique au skill */}
      {showSkillModal && selectedSkill && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <span className="close" onClick={closeSkillModal}>&times;</span>
            <div className="modal-body">
              <div className="user-profile-info">
                <div className="profile-image-container">
                  <img
                    src={user.image}
                    alt={`${user.username}'s profile`}
                    className="profile-image"
                  />
                </div>
                <div className="username-container">
                  <h3>{user.username}</h3>
                </div>
              </div>
              <h5>{selectedSkill.nom} - {selectedSkill.niveau}</h5>
              {selectedSkill.key_points && selectedSkill.key_points.length > 0 ? (
                <ul>
                  {selectedSkill.key_points.map((point, idx) => (
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

      {/* Modal global avec toutes les compétences et leurs points clés */}
      {showModal && selectedSkills.length > 0 && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-body">
              <div className="user-profile-info">
                <div className="profile-image-container">
                  <img
                    src={user.image}
                    alt={`${user.username}'s profile`}
                    className="profile-image"
                  />
                </div>
                <div className="username-container">
                  <h3>{user.username}</h3>
                </div>
              </div>
              <h4 className="skills-title">Compétences et Points Clés :</h4>
              {selectedSkills.map((skill, index) => (
                <div key={index} className="skill-detail">
                  <h5>{skill.nom} - {skill.niveau}</h5>
                  {skill.key_points && skill.key_points.length > 0 ? (
                    <ul>
                      {skill.key_points.map((point, idx) => (
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
