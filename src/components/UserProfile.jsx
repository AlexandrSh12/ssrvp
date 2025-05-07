import React from 'react';

const UserProfile = ({ user, onLogout }) => {
    return (
        <div className="user-profile">
            <div className="profile-info">
                <span className="username">{user.username || user.email}</span>
            </div>
            <button className="logout-btn" onClick={onLogout}>Выйти</button>
        </div>
    );
};

export default UserProfile;