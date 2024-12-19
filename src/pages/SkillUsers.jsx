import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./SkillUsers.css";

const usersData = [
  {
    id: 1,
    name: "Ghizlane Lembarki",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    skills: ["React Development", "UI/UX Design", "JavaScript"],
    profileImage: "https://i.pinimg.com/736x/4e/c3/25/4ec325c3110c68bca356d076b0111d8f.jpg",
    additionalInfo: "Ghizlane est développeuse React avec 3 ans d'expérience.",
    email: "ghizlane@example.com",
    phone: "+212 6 123 456 78",
    //importi l fichier json 
  },
  {
    id: 2,
    name: "Youssef El Amrani",
    description: "Full-stack developer specialized in MERN stack.",
    skills: ["Node.js", "MongoDB", "React", "Express"],
    profileImage: "https://i.pinimg.com/236x/f1/d3/01/f1d3012fd0d8d8206fe0e38a3a3a8d08.jpg",
    additionalInfo: "Youssef est un expert du MERN stack.",
    email: "youssef@example.com",
    phone: "+212 6 987 654 32",
  },
];

const SkillUsers = () => {
  const { skillName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleChat = (user) => {
    alert(`Opening chat with ${user.name}`);
  };

  return (
    <div className="skill-users-container">
      <h1>Users with {skillName?.replace("-", " ") || "Skills"}</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Search user..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {filteredUsers.length > 0 ? (
        <div className="user-cards">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="horizontal-card"
              onClick={() => openModal(user)}
            >
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                className="profile-image-left"
              />
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>{user.description}</p>
                <div className="user-skills">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  className="chat-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChat(user);
                  }}
                >
                  Chat 💬
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedUser.profileImage}
              alt={`${selectedUser.name}'s profile`}
              className="modal-profile-image"
            />
            <h2>{selectedUser.name}</h2>
            <p>{selectedUser.additionalInfo}</p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillUsers;
