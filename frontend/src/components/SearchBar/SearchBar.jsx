import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="buscar..." />
      <button className="search-btn">🔍</button>
    </div>
  );
}

export default SearchBar;
