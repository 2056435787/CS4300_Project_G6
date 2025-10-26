"use client";
import "../../css/register.css";
import Navbar from "../components/Navbar";
import { useState, FormEvent, ChangeEvent } from "react";

interface LoginInfo {
  email: string;
  password: string;

}

export default function Login() {
  const [formData, setFormData] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    alert("✅ Login successful!");
    console.log("Logged in user:", data.user);

    // Optionally save user info
    localStorage.setItem("userEmail", data.user.email);

    // Clear form
    setFormData({ email: "", password: "" });

    // Optionally redirect
    window.location.href = "/"; // or "/dashboard"
  } catch (error) {
    console.error("❌ Login error:", error);
    alert("Login failed! Please check your credentials.");
  }
    };


  return (
    <>
      <Navbar />
      <div className="register">
        <div >
          <h2 >
            Login 🌱
          </h2>
          <p >
            Join our nature community and grow with us
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                
              >
                Email
              </label>
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
              <label
                htmlFor="password"
               
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                
              />
            </div>

            <button
              type="submit"
             
            >
              Login
            </button>
          </form>

        </div>
      </div>
    </>
  );
}

