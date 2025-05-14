import React, { useEffect, useState } from 'react';
import '../../styles/ProfileIcon.css';
import { useSelector } from 'react-redux';

const ProfileIcon = () => {
    const email = useSelector((state) => state.auth.email);

    return (
        <div className="profile-icon">
            <span className="user-email">{email}</span>
            <div className="avatar-circle">👤</div>
        </div>
    );
};

export default ProfileIcon;
