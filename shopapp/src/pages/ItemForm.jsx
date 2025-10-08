import React, { useState } from "react";
import axios from "axios";

const ItemForm = ({ sessionId, shopId, }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("shopId", shopId);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "/shop/items/add",
        formData,
        {
          headers: {
            "X-Session-Id": sessionId,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onItemAdded(response.data); // refresh list in parent
      setName("");
      setPrice("");
      setImage(null);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
