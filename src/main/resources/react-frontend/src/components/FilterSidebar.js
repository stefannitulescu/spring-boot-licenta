import React, { useEffect, useState } from 'react';
import '../styles/FilterSidebar.css';
import CategoryService from '../services/CategoryService';
import { useFilter } from '../contexts/FilterContext';

function FilterSidebar() {
  const [categories, setCategories] = useState([]);
  const { filters, updateSortOrder, updateCategory } = useFilter();

  useEffect(() => {
    CategoryService.getAllCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSortChange = (e) => {
    updateSortOrder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    updateCategory(e.target.value);
  };

  return (
    <div className="filter-sidebar">
      <div>
        <label>Sort by Price:</label>
        <select value={filters.sortOrder} onChange={handleSortChange}>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
      <div>
        <label>Category:</label>
        <select value={filters.category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;
