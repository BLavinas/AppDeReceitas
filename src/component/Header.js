import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import '../style/header.css';

function Header() {
  const [show, toggleShow] = useState(false);
  return (
    <div className="container-header">
      <div className="main-header">
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profileIcon"
          />
        </Link>
        <button
          onClick={ () => toggleShow(!show) }
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
          />
        </button>
      </div>
      <div className="search-header">
        {show && <SearchBar />}
      </div>
    </div>
  );
}

export default Header;

// requisito 9
// https://youtu.be/f6ZGbYJhsDI
