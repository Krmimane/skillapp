import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategorySelector from "../components/CategorySelector";
import "../styles/Discover.css";
import SkillCard from "../components/SkillCard";
import userSkills from "../data/user_skill.json"; // Données JSON utilisateur

const Discover = () => {
  const [categories, setCategories] = useState([]); // Liste des catégories (inclut "All")
  const [skillsData, setSkillsData] = useState({}); // Compétences regroupées par catégorie
  const [selectedCategory, setSelectedCategory] = useState("All"); // Catégorie sélectionnée par défaut

  useEffect(() => {
    const extractedCategories = ["All"]; // Ajouter "All" au début
    const extractedSkills = {};

    // Parcourir les utilisateurs et leurs compétences
    userSkills.users.forEach((user) => {
      user.categories.forEach((category) => {
        const categoryName = category.category;

        // Ajouter la catégorie si elle n'existe pas déjà
        if (!extractedCategories.includes(categoryName)) {
          extractedCategories.push(categoryName);
          extractedSkills[categoryName] = [];
        }

        // Ajouter les compétences sous chaque catégorie
        category.skills.forEach((skill) => {
          if (!extractedSkills[categoryName]?.some((s) => s.nom === skill.nom)) {
            extractedSkills[categoryName] = [
              ...(extractedSkills[categoryName] || []),
              {
                ...skill,
                category: categoryName,
                categoryImage: category.categoryImage, // Utiliser l'image de la catégorie
              },
            ];
          }
        });
      });
    });

    setCategories(extractedCategories);
    setSkillsData(extractedSkills);
  }, []);

  // Fonction pour mélanger un tableau (pour la catégorie "All")
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Filtrage des compétences selon la catégorie sélectionnée
  let displayedSkills =
    selectedCategory === "All"
      ? Object.values(skillsData).flat()
      : skillsData[selectedCategory] || [];

  // Mélanger les compétences pour "All"
  if (selectedCategory === "All") {
    displayedSkills = shuffleArray(displayedSkills);
  }

  return (
    <div className="discover-page">
      <h1 className="discover-title">Discover Our Skills</h1>

      {/* Composant pour sélectionner une catégorie */}
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Grille des compétences */}
      <div className="skills-grid">
        {displayedSkills.map((skill, index) => (
          <div key={index} className="skill-card">
            <img
              src={skill.categoryImage || "default-image.jpg"} // Utiliser l'image de la catégorie
              alt={skill.nom}
              className="skill-image"
            />
            <h3 className="skill-title">{skill.nom}</h3>
            <Link to={`/skill-users/${skill.nom}`} className="view-users-button12">
              View Users</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
