import React from "react";
import OrderHistory from './order-history/OrderHistory';
import Profile from './Profile/Profile';
// import Navbar from './Account-Components/navbar';
import './Account.css';

const Account = () => {
    return(
        <div className="account-wrapper">
            {/* <Navbar /> */}
            <h1>My Account</h1>
            <Profile />
            <OrderHistory />
        </div>
    );
};

export default Account;