import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    sortOrder: '',
    category: '',
  });

  const updateSortOrder = (sortOrder) => {
    setFilters((prev) => ({ ...prev, sortOrder }));
  };

  const updateCategory = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateSortOrder, updateCategory }}>
      {children}
    </FilterContext.Provider>
  );
};
