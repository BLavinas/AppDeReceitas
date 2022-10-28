import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';
import '../style/profile-page.css';

import Footer from '../component/Footer';
import HeaderDois from '../component/HeaderDois';

export default function Profile() {
  const {
    LocalStoreClear,
    GetEmailByLs,
    lsEmail,
  } = useContext(LoginContext);

  useEffect(() => {
    GetEmailByLs();
  }, [GetEmailByLs]);

  return (
    // FIXME: arrumar o email conforme o context
    <div>

      <HeaderDois />
      <title data-testid="page-title" title="Profile">Profile</title>
      <div>Profile</div>
      <div className="container-profile">
        <h2 data-testid="profile-email">
          { lsEmail }
        </h2>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            className="button-logout"
            onClick={ LocalStoreClear }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
