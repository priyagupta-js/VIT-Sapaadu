import React from "react";
import { useNavigate } from "react-router-dom";
import mainlogo from '../../assets/logo.png';
import './NavBar.css';


function NavBar() {
    const navigate = useNavigate();
    const handleAccountClick = () => {
        navigate(`/account`);
    };
    const handleCartClick = () => {
        navigate(`/cart`);
    };
    return (
        <div className='navbar'>
            <div className='navleft'>
                <img src={mainlogo} alt="LOGO" className='navlogo' />
                <h2>VIT Sapaadu</h2>
            </div>
            <div className='navright'>
                <ul className='navoptions'>
                    <li><a href="#Search">Search</a></li>
                    <li onClick={handleAccountClick}><a href="#Account">Account</a></li>
                    <li onClick={handleCartClick}><a href="#Cart">Cart</a></li>
                </ul>
            </div>
        </div>
    );
}


export default NavBar;