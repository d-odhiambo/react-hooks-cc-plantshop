import React, { useState } from "react";

function PlantCard({ plant, onToggleSoldOut, onUpdatePrice, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    onUpdatePrice(plant.id, newPrice); // keep as string to match test
    setEditing(false);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>

      {editing ? (
        <form onSubmit={handlePriceSubmit} className="price-form">
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p>Price: {plant.price}</p>
      )}

      {plant.soldOut ? (
        <button onClick={() => onToggleSoldOut(plant.id)}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={() => onToggleSoldOut(plant.id)}>
          In Stock
        </button>
      )}

      <button className="delete-btn" onClick={() => onDelete(plant.id)}>
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
