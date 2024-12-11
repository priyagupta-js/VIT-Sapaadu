import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';


const ProfileSection = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        regNo: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch logged-in user email from localStorage
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        if (userEmail) {
            // Fetch user data from the backend
            axios.get(`http://localhost:5000/api/user/${userEmail}`)
                .then(response => {
                    setProfile({
                        name: response.data.name,
                        email: response.data.email,
                        regNo: response.data.regNo
                    });
                })
                .catch(err => console.error("Error fetching user data:", err));
        }
    }, [userEmail]);

    // Handle input change
    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        // Add save logic here if needed to update backend
    };

    return (
        <div className="profile-section">
            <h2>Profile</h2>
            <div className="profile-details">
                <label>Name:</label>
                {isEditing ? (
                    <input name="name" value={profile.name} onChange={handleChange} />
                ) : (
                    <p>{profile.name}</p>
                )}
                <label>Email:</label>
                {isEditing ? (
                    <input name="email" value={profile.email} onChange={handleChange} />
                ) : (
                    <p>{profile.email}</p>
                )}
                <label>Reg. No.:</label>
                {isEditing ? (
                    <input name="regNo" value={profile.regNo} onChange={handleChange} />
                ) : (
                    <p>{profile.regNo}</p>
                )}
            </div>
            <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit Profile"}</button>
        </div>
    );
};

export default ProfileSection;
