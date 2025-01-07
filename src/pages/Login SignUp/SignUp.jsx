
import '../Login SignUp/LoginSignUp.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [usn, setUsn] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use useNavigate for redirection

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!name || !usn || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', { // Make sure the URL is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, usn, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0]?.msg || 'Signup failed');
            }

            console.log('Signed up successfully');
            // Redirect to login page after successful signup
            navigate('/login'); // Use navigate for redirection
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSignup}>
                <div className="form_back">
                    <div className="header">
                        <div className="text">SIGN UP</div>
                        <div className="underline"></div>
                    </div>
                    <input
                        placeholder="Name"
                        className="input"
                        id='name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        placeholder="Register Number"
                        className="input"
                        id='usn'
                        type="text"
                        value={usn}
                        onChange={(e) => setUsn(e.target.value)}
                    />
                    <input
                        placeholder="Email ID"
                        className="input"
                        id='email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Phone Number"
                        className="input"
                        id='phoneno'
                        type="number"
                        value={phoneno}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        className="input"
                        id='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                    <button className="btn" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <span className="switch">
                        Already have an account?
                        <a className="signup_tog" href="/"> SIGN IN</a>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Signup;