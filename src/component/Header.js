import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [show, toggleShow] = useState(false);
  return (
    <div>

      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />
      </Link>
      <div>

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
        {show && <input data-testid="search-input" />}
      </div>

    </div>
  );
}

export default Header;

// requisito 9
// https://youtu.be/f6ZGbYJhsDI
