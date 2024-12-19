import React from "react";
import "../styles/FilterBar.css";

function FilterBar({ categories, onCategorySelect }) {
  return (
    <div className="filter-bar-container">
      <button className="scroll-button left" onClick={() => document.querySelector('.filter-bar').scrollBy({ left: -100, behavior: 'smooth' })}>
        &lt;
      </button>
      <div className="filter-bar">
        {categories.map((category, index) => (
          <button
            key={index}
            className="category-button"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <button className="scroll-button right" onClick={() => document.querySelector('.filter-bar').scrollBy({ left: 100, behavior: 'smooth' })}>
        &gt;
      </button>
    </div>
  );
}

export default FilterBar;
