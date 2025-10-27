"use client";
import "../../css/navbar.css";
import { useEffect, useState } from "react";
import { isLoggedIn, logout, getUser } from "../../utils/auth";

export default function Navbar() {
  const [mounted, setMounted] = useState(false); // <-- track client mount
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true); // component is now mounted
    const logged = isLoggedIn();
    setLoggedIn(logged);
    if (logged) setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    window.location.href = "/login";
  };

  if (!mounted) return null; // render nothing on server

  return (
    <>
      <nav className="navbar">
        <h3 style={{ paddingLeft: "5rem" }}>🌿 Nature Explorer</h3>
        <div className="nav-right">
          {loggedIn ? (
            <>
              <span>Welcome, {user?.name || "User"}</span>
              <button onClick={handleLogout} className="nav-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="nav-btn">Login</a>
              <a href="/register" className="nav-btn">Register</a>
            </>
          )}
        </div>
      </nav>

      {/* Keeps content below navbar */}
      <div className="main-content"></div>
    </>
  );
}
