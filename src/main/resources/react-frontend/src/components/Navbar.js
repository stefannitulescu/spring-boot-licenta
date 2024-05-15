import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isAdmin }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src="file2.png" alt="Fresh Market" />
                </Link>
                <ul className="navbar-menu">
                    <li><Link to="/home" className="navbar-item">Home</Link></li>
                    <li><Link to="/products" className="navbar-item">Products</Link></li>
                    <li><Link to="/services" className="navbar-item">Services</Link></li>
                    <li><Link to="/our-work" className="navbar-item">Our Work</Link></li>
                    {isAdmin && (
                        <>
                            <li><Link to="/admin/products" className="navbar-item">Manage Products</Link></li>
                            <li><Link to="/admin/users" className="navbar-item">Manage Users</Link></li>
                        </>
                    )}
                    <li><Link to="/login" className="navbar-item navbar-btn">Login</Link></li>
                    <li><Link to="/register" className="navbar-item navbar-btn">Register</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
