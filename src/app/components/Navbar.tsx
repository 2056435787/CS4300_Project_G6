import React from "react";
import "../../css/navbar.css";

const Navbar = () =>{
    return (
        <nav className="navbar">
            <div className="nav-left">
                <h2 className="logo">Nature</h2>
            </div>

            <div className="nav-right">
                <button className="nav-btn">Login</button>
                <button className="nav-btn">Register</button>
            </div>
        </nav>
    );
};

export default Navbar;