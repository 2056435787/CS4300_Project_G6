"use client";
import React from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js built-in router
import "../../css/navbar.css";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={() => router.push("/")}>
          Nature
        </h2>
      </div>

      <div className="nav-right">
        <button className="nav-btn" onClick={() => router.push("/login")}>
          Login
        </button>
        <button className="nav-btn" onClick={() => router.push("/register")}>
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
