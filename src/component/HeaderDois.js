import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

import '../style/header1.css';

function HeaderDois() {
  return (
    <div className="container-header1">
      <div className="header1">
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profileIcon"
          />
        </Link>
      </div>
    </div>
  );
}

export default HeaderDois;
