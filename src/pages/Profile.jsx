import React from 'react';
import Footer from '../component/Footer';
import HeaderDois from '../component/HeaderDois';

function Profile() {
  return (
    <div>
      <HeaderDois />
      <title data-testid="page-title" title="Profile">Profile</title>
      <div>Profile</div>
      <Footer />
    </div>
  );
}

export default Profile;
