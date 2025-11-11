import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openFilters = () => setSidebarOpen(true);
  const closeFilters = () => setSidebarOpen(false);

  return (
    <FilterContext.Provider value={{ sidebarOpen, openFilters, closeFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
