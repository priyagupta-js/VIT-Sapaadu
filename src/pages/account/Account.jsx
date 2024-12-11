import React from "react";
import { useNavigate } from 'react-router-dom';
import OrderHistory from './order-history/OrderHistory';
import Profile from './Profile/Profile';
// import Navbar from './Account-Components/navbar';
import './Account.css';

const Account = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove JWT token from localStorage
        navigate('/signup'); // Redirect to login page
    };
    return (
        <div className="account-wrapper">
            {/* <Navbar /> */}
            <div>
                <h1>My Account</h1>4
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Profile />
            <OrderHistory />
        </div>
    );
};

export default Account;