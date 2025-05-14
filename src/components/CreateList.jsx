import React from "react";
import axios from "axios";
import "../styles/createList.css";

const CreateList = ({ onNewList }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      list: formData.get("list"),
      card: formData.get("card").split(",").map((c) => c.trim()), // Convert to array
    };

    try {
      const response = await axios.post(
        "https://todosbackend-0gka.onrender.com/api/create",
        data
      );
      console.log(response.data);
      event.target.reset(); // ✅ clear form

      // Pass the newly created list to the parent component
      onNewList(response.data.data); // Update parent component with new list
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="list">Add List:</label>
        <input type="text" id="list" name="list" required />
      </div>
      <div>
        <label htmlFor="card">Add Card:</label>
        <input type="text" id="card" name="card" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateList;
