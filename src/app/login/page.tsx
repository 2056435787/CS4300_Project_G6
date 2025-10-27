"use client";
import "../../css/register.css";
import Navbar from "../components/Navbar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { saveAuthToken, isLoggedIn } from "../../utils/auth";

interface LoginInfo {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ If already logged in, redirect to home
  useEffect(() => {
    if (isLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        alert(data.message || "Login failed!");
        return;
      }

      // ✅ Save JWT + user info
      saveAuthToken(data.token, data.user);

      alert("✅ Login successful!");
      window.location.href = "/"; // redirect
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Login failed. Please check your connection or credentials.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <div>
          <h2>Login 🌱</h2>
          <p>Join our nature community and grow with us</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
