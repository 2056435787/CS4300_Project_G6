"use client";
import Navbar from "./components/Navbar";
import { useEffect, useState, FormEvent } from "react";


interface Plant {
  _id?: string;
  name: string;
  type: string;
  description: string;
}

export default function HomePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [form, setForm] = useState<Plant>({ name: "", type: "", description: "" });

  // Fetch all plants
  const fetchPlants = async () => {
    const res = await fetch("http://localhost:5000/api/plants");
    const data = await res.json();
    setPlants(data);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", type: "", description: "" });
    fetchPlants();
  };

  // Delete plant
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/plants/${id}`, {
      method: "DELETE",
    });
    fetchPlants();
  };

  return (
    
    <main style={{ textAlign: "center", padding: "20px" }}>
      <Navbar />
      <h1>🌿 Nature Explorer — Plant Table</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">Add Plant</button>
      </form>

      <table border={1} style={{ margin: "auto", width: "80%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr key={plant._id}>
              <td>{plant.name}</td>
              <td>{plant.type}</td>
              <td>{plant.description}</td>
              <td>
                <button onClick={() => handleDelete(plant._id!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
