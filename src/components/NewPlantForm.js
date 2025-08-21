import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlant({
      name: formData.name,
      image: formData.image,
      price: formData.price // keep as string for Jest test
    });
    setFormData({ name: "", image: "", price: "" });
  };

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
