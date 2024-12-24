import React, { useState, useEffect } from 'react';
import '../App.css';
import "../styles/user.css"; // Importation du CSS pour le style
import userData from '../data/user_skill.json'; // Importation des données utilisateur
const User = ({ currentUsername }) => {
  const [user, setUser] = useState(userData.users[0]);
  const [formData, setFormData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({ nom: '', niveau: '' });

  // Gestion de currentUsername avec localStorage
  useEffect(() => {
    // Charger `currentUsername` depuis le localStorage
    const savedUsername = localStorage.getItem("currentUser");
    if (savedUsername) {
      setFormData((prevData) => ({ ...prevData, username: savedUsername }));
    }
  }, []);

  useEffect(() => {
    // Sauvegarder `currentUsername` dans le localStorage
    if (currentUsername) {
      localStorage.setItem("currentUser", currentUsername);
      setFormData((prevData) => ({ ...prevData, username: currentUsername }));
    }
  }, [currentUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    const updatedCategories = [...formData.categories];
    updatedCategories[0].skills.push(newSkill);
    setFormData({ ...formData, categories: updatedCategories });
    setIsAddingSkill(false);
    setNewSkill({ nom: '', niveau: '' });
  };

  return (
    <div className="App">
      {/* Website View */}
      <div className="website-view">
        <div className="profile-header">
          <img src={formData.avatar} alt="avatar" className="avatar" />
          <div className="user-details">
            <div className="info-row">
              <div className="info-item">
                <label>Nom :</label>
                <input
                  type="text"
                  value={formData.username || ""}
                  onChange={handleChange}
                  name="username"
                />
              </div>
              <div className="info-item">
                <label>Sexe :</label>
                <input
                  type="text"
                  value={formData.sexe || ""}
                  onChange={handleChange}
                  name="sexe"
                />
              </div>
              <div className="info-item">
                <label>Age :</label>
                <input
                  type="text"
                  value={formData.age || ""}
                  onChange={handleChange}
                  name="age"
                />
              </div>
            </div>
            <div className="bio">
              <label>Bio :</label>
              <input
                type="text"
                value={formData.bio || ""}
                onChange={handleChange}
                name="bio"
              />
            </div>

            <div className="competence">
              <div className="competence-header">
                <label>Compétence :</label>
                <button onClick={() => setIsAddingSkill(true)} className="add-skill-btn">Ajouter une compétence</button>
              </div>
              <div className="skills">
                {user.categories.flatMap(cat =>
                  cat.skills.map(skill => (
                    <span className={`skill ${skill.niveau.toLowerCase()}`} key={skill.nom}>
                      {skill.nom} | {skill.niveau}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* Mobile View */}
      <div className="mobile-view">
        <div className="mobile-frame">
          <div className="mobile-header">
          <div className="mobile-details">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" alt="avatar" className="avatar-mobile" />
            <button onClick={() => setIsEditing(true)} className="edit-btn">Éditer</button>
          </div>
            <div className="mobile-details">
              <h3>{user.username}</h3>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Popup */}
      {isEditing && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Editer Profil</h2>
            <div className="form-group">
              <label>Nom:</label>
              <input type="text" name="username" value={formData.username || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Sexe:</label>
              <input type="text" name="sexe" value={formData.sexe || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input type="number" name="age" value={formData.age || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bio:</label>
              <textarea name="bio" value={formData.bio || ""} onChange={handleChange}></textarea>
            </div>

            <div className="popup-buttons">
              <button onClick={() => setIsEditing(false)} className="cancel-btn">Annuler</button>
              <button onClick={handleSave} className="save-btn">Sauvegarder</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Popup */}
      {isAddingSkill && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Ajouter Compétence</h2>
            <label>Nom:</label>
            <input type="text" name="nom" value={newSkill.nom} onChange={(e) => setNewSkill({ ...newSkill, nom: e.target.value })} />
            <label>Niveau:</label>
            <input type="text" name="niveau" value={newSkill.niveau} onChange={(e) => setNewSkill({ ...newSkill, niveau: e.target.value })} />
            <div className="popup-buttons">
              <button onClick={() => setIsAddingSkill(false)} className="cancel-btn">Annuler</button>
              <button onClick={handleAddSkill} className="save-btn">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
