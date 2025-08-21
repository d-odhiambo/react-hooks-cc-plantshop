import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleSoldOut, onUpdatePrice, onDelete }) {
  return (
    <div className="plant-list">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleSoldOut={onToggleSoldOut}
          onUpdatePrice={onUpdatePrice}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PlantList;
