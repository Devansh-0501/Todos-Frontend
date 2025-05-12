import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const UpdateList = ({ id }) => {
  const [uniList, setUniList] = useState({
    list: "",
    card: [""], // Start with one card input
  });

  useEffect(() => {
    axios
      .get(`https://todosbackend-0gka.onrender.com/api/uniList/${id}`)
      .then((response) => {
        console.log(response.data);
        setUniList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data in Update:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
     
    axios
      .put(`https://todosbackend-0gka.onrender.com/api/update/${uniList._id}`, uniList)
      .then((response) => {
        console.log("Updated:", response.data);
        // optionally reset or close modal
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
