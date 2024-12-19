import React, { useState } from "react";
import UserCard from "./UserCard";


// Exemple de données des utilisateurs
const usersData = [
  { id: 1, username: "John Doe", skill: "Home Design", description: "Expert in home decorations.", image: "https://via.placeholder.com/150" },
  { id: 2, username: "Jane Smith", skill: "Photography", description: "Loves landscape photography.", image: "https://via.placeholder.com/150" },
  { id: 3, username: "Mike Lee", skill: "IT", description: "Full-stack developer.", image: "https://via.placeholder.com/150" },
  { id: 4, username: "Anna Johnson", skill: "Home Design", description: "Interior design specialist.", image: "https://via.placeholder.com/150" },
];

const categories = ["All", "Home Design", "Photography", "IT", "Music", "Poetry"];

const SkillFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtrer les utilisateurs selon la catégorie
  const filteredUsers =
    selectedCategory === "All"
      ? usersData
      : usersData.filter((user) => user.skill === selectedCategory);

  return (
    <div className="skill-filter-container">
      <h1>Discover</h1>
      {/* Boutons des catégories */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Affichage des cartes */}
      <div className="cards-container">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SkillFilter;
