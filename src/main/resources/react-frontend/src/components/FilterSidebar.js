import React from 'react';
import '../styles/FilterSidebar.css';
function FilterSidebar({ onFilterChange, onSortChange }) {
    return (
        <div className="filter-sidebar">
            <h3>Filter & Sort</h3>
            <div>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" onChange={e => onSortChange(e.target.value)}>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>
            <div>
                <label htmlFor="price">Max Price:</label>
                <input type="number" id="price" onChange={e => onFilterChange('maxPrice', e.target.value)} />
            </div>
            <div>
                <label htmlFor="availability">Min Availability:</label>
                <input type="number" id="availability" onChange={e => onFilterChange('minAvailability', e.target.value)} />
            </div>
        </div>
    );
}

export default FilterSidebar;
