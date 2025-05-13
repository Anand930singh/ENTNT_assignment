import React, { useEffect, useState } from 'react';
import '../../styles/ProfileIcon.css';
import Cookies from 'js-cookie'

const ProfileIcon = () => {
    const [email, setEmail] = useState(null);
    useEffect(()=>{
        setEmail(JSON.parse(Cookies.get('user')).email)
    })

    return (
        <div className="profile-icon">
            <span className="user-email">{email}</span>
            <div className="avatar-circle">👤</div>
        </div>
    );
};

export default ProfileIcon;
