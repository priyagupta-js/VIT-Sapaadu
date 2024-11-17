import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignUp from '../src/pages/Login SignUp/LoginSignUp';
import Home from '../src/pages/Homepage/Homepage';
import Homepage from "../src/pages/Homepage/Homepage";
// import Menu from './Components/Menu/Menu';
// import Cart from "./Components/Cart/Cart";
// import Account from "./Components/Account Page/account";
// import './App.css';

const App = () => {
  // const [cartItems, setCartItems] = useState([]); // Cart items state
  // const [totalBill, setTotalBill] = useState(0); // Total bill state

  // Function to add item to cart and update total bill
  /*
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      // If the item is found in the cart, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1
      };
      setCartItems(updatedCart);  // Update the cart state
    } else {
      // If the item is not found, add it with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setTotalBill(prevTotal => prevTotal + item.price);
  };
*/
/*
  // Function to remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    calculateTotal(updatedCart); // Recalculate the total after removing
  };

*/
  // Function to update item quantity in the cart
  /*
  const updateItemQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item._id === id
        ? { ...item, quantity }
        : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart); // Recalculate the total after updating quantity
  };
*/
/*
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 } // Decrease quantity by 1
        : item
    );

    // If quantity is 1 and we decrease it, we remove the item
    const filteredCart = updatedCart.filter(item => item.quantity > 0);

    setCartItems(filteredCart);  // Update the cart with the new items
    calculateTotal(filteredCart); // Recalculate the total bill
  };

  const calculateTotal = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalBill(newTotal);
  };
*/
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<LoginSignUp />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/menu" element={<Menu addToCart={addToCart} cartItems={cartItems} />} /> */}
        {/* <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              totalBill={totalBill}
              removeFromCart={removeFromCart}
              updateItemQuantity={updateItemQuantity}
            />
          }
        /> */}
        {/* <Route path="/account" element={<Account />} /> */}
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;
