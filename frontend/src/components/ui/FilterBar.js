import React from "react";
import "../../styles/Dashboard.css";

const FilterBar = ({
  filterOptions,
  filterValue,
  filterText,
  setFilterValue,
  setFilterText,
}) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        value={filterText}
        placeholder="Search...."
        className="filter-search-bar"
        onChange={(e) => setFilterText(e.target.value)}
      />

      <h3>Filter by:</h3>
      <select
        className="filter-select-box"
        name=""
        id=""
        onChange={(e) => setFilterValue(e.target.value)}
      >
        {filterOptions?.map((item) => (
          <option value={item.value}>{item.title}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
