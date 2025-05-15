import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/updateList.css";

const UpdateList = ({ id, onUpdate, onClose }) => {
  const [uniList, setUniList] = useState({
    list: "",
    card: [""], // Start with one card input
  });

  useEffect(() => {
    // Fetch the list data when the component mounts or the id changes
    axios
      .get(`https://todosbackend-0gka.onrender.com/api/uniList/${id}`,{withCredentials: true})
      .then((response) => {
        console.log(response.data);
        setUniList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data in Update:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!uniList._id) {
      console.error("No list ID to update");
      return;
    }
    

    // PUT request to update the list
    axios
      .put(`https://todosbackend-0gka.onrender.com/api/update/${uniList._id}`, uniList)
      .then((response) => {
        console.log("Updated:", response.data);

        // Call the onUpdate callback to refresh the parent state
        if (onUpdate) onUpdate(); // onUpdate can be used to refresh the parent component
        if (onClose) onClose();
        // Optionally reset or close modal
      })
      .catch((error) => {
        console.error("Error updating list:", error);
      });
  };

  const handleCardChange = (index, value) => {
    const updatedCards = [...uniList.card];
    updatedCards[index] = value;
    setUniList({ ...uniList, card: updatedCards });
  };

  const addCardInput = () => {
    setUniList({ ...uniList, card: [...uniList.card, ""] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="list">Update List Name:</label>
        <input
          type="text"
          id="list"
          name="list"
          value={uniList.list}
          onChange={(e) => setUniList({ ...uniList, list: e.target.value })}
        />
      </div>

      <div id="cardInputs">
        <span>Update Cards</span>
        {uniList.card.map((card, index) => (
          <input
            key={index}
            type="text"
            name="card"
            value={card}
            onChange={(e) => handleCardChange(index, e.target.value)}
          />
        ))}
      </div>

      <button type="button" onClick={addCardInput}>
        Add Another Card
      </button>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateList;
