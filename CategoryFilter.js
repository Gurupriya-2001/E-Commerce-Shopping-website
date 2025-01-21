import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <h4>Categories</h4>
      <ul>
        {categories.map(category => (
          <li 
            key={category} 
            onClick={() => onSelectCategory(category)} 
            style={{ cursor: 'pointer', fontWeight: selectedCategory === category ? 'bold' : 'normal' }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
