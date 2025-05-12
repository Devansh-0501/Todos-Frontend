import React from "react";
import axios from "axios";
import "../styles/createList.css";

const CreateList = () => {
    const handleSubmit = async (event) => {
        const formData = new FormData(event.target);
        const data = {
        list: formData.get("list"),
        card: formData.get("card"),
        };
    
        try {
        const response = await axios.post("http://localhost:3000/api/create", data);
        console.log(response.data);
        } catch (error) {
        console.error("Error creating list:", error);
        }
    };
  return (

      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="list">Add List:</label>
          <input type="text" id="list" name="list" />
        </div>
        <div>
          <label htmlFor="card">Add Card:</label>
          <input type="text" id="card" name="card" />
        </div>
        <button type="submit">Submit</button>
      </form>
      
    
  );
};

export default CreateList;
