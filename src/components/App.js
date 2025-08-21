import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantCard from "./PlantCard";
import NewPlantForm from "./NewPlantForm";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all plants on mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // Add new plant
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify(newPlant)
    })
      .then((res) => res.json())
      .then((plant) => setPlants([...plants, plant]));
  };

  // Toggle sold out
  const handleToggleSoldOut = (id) => {
    setPlants(
      plants.map((p) =>
        p.id === id ? { ...p, soldOut: !p.soldOut } : p
      )
    );
  };

  // Update price
  const handleUpdatePrice = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice })
    })
      .then((res) => res.json())
      .then((updatedPlant) =>
        setPlants(plants.map((p) => (p.id === id ? updatedPlant : p)))
      );
  };

  // Delete plant
  const handleDelete = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" })
      .then(() => setPlants(plants.filter((p) => p.id !== id)));
  };

  // Filter plants by search
  const filteredPlants = plants.filter((p) =>
    p.name.toLowerCase() .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header />

      <input
        type="text"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <NewPlantForm onAddPlant={handleAddPlant} />

      <ul className="plant-list">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onToggleSoldOut={handleToggleSoldOut}
            onUpdatePrice={handleUpdatePrice}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
