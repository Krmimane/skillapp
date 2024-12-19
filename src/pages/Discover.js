import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import SkillGrid from "../components/SkillGrid";
import "./Discover.css";


function Discover() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const skills = [
    { title: "Home Design", image: "https://i.pinimg.com/736x/c9/b8/60/c9b860715b135523da605aab5930545f.jpg", category: "Design", path: "home-design" },
    { title: "React Development", image: "https://i.pinimg.com/736x/60/23/96/6023967d6cdcb41271b6be831ef7544b.jpg", category: "IT", path: "react-development" },
    { title: "Creative Poetry", image: "https://i.pinimg.com/736x/ae/79/15/ae7915335576a07b29c0a63e45772e18.jpg", category: "Poetry", path: "creative-poetry" },
    { title: "Guitar Techniques", image: "https://i.pinimg.com/736x/06/20/9c/06209c9d74f59f92ad91b2d30435add2.jpg", category: "Music", path: "guitar-techniques" },
    { title: "Photo Editing", image: "https://i.pinimg.com/736x/4c/db/c2/4cdbc21db42d576599e469b9aa8dfc37.jpg", category: "Photography", path: "photo-editing" },
  ];

  const categories = ["All", "Design", "IT", "Poetry", "Music", "Photography"];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  const handleSkillClick = (path) => {
    // Redirige vers la page des utilisateurs pour cette skill
    navigate(`/skills/${path}`);
  };

  return (
    <div className="discover-container">
      <header>
        <h1>Discover</h1>
        <FilterBar categories={categories} onCategorySelect={setSelectedCategory} />
      </header>
      <main>
        {filteredSkills.length > 0 ? (
          <SkillGrid skills={filteredSkills} onSkillClick={handleSkillClick} />
        ) : (
          <p>No skills available in this category.</p>
        )}
      </main>
    </div>
  );
}

export default Discover;
