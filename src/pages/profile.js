import React from 'react';
import UserInfo from '../components/user';
import UserHistory from '../components/userHistory';
import '../App.css';

import '../styles/profilePage.css'; // Styles de la page de profil

const Profile = ({currentUsername}) => {
  return (
    <div className="profile-page" style={{ width: '100%' }}>
      
      <h3 className="section-title1">User Information </h3>
      <div className="profile-section">
        <UserInfo currentUsername={currentUsername} />
      </div>
      <h3 className="section-title">Historique</h3>
      <div className="history-section">
        <UserHistory />
      </div>
    </div>
  );
};

export default Profile;
