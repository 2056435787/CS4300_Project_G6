"use client";
import "../../css/register.css";
import Navbar from "../components/Navbar";
import { useState, FormEvent, ChangeEvent } from "react";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("❌ Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Show backend error message if available
      const message = data?.message || data?.error || "Failed to register";
      throw new Error(message);
    }

    alert("✅ Registration successful!");
    console.log("Registered user:", data);

    // Reset form
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });

    // Optional redirect to login
    window.location.href = "/login";
  } catch (error: any) {
    console.error("❌ Registration error:", error);
    alert(`Registration failed: ${error.message}`);
  }
};


  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register-card">
          <h2>Create Your Account 🌱</h2>
          <p>Join our nature community and grow with us</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
              />
            </div>

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

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <button type="submit">Register</button>
          </form>

          <p>
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
