import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/showList.css";
import UpdateList from "./UpdateList";
import CreateList from "./CreateList"; // Import CreateList component

const ShowList = () => {
  const [readData, setReadData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [listId, setListId] = useState("");

  const handleCloseUpdate = () => {
    setShowInput(false);
  };

  // Function to fetch lists
  const fetchLists = async () => {
    try {
      const response = await axios.get(
        "https://todosbackend-0gka.onrender.com/api/read",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setReadData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLists(); // Fetch lists on mount
  }, []); // Empty dependency array means it runs only once

  const handleDelete = (id) => {
    axios
      .delete(`https://todosbackend-0gka.onrender.com/api/delete/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        // Refetch the lists after deletion
        fetchLists();
      })
      .catch((error) => {
        console.log("Error deleting data:", error);
      });
  };

  const handleUpdate = (id) => {
    setListId(id);
    setShowInput(true);
  };

  // Function to handle new list creation (passed to CreateList)
  const handleNewList = (newList) => {
    setReadData((prevData) => [...prevData, newList]); // Add new list to state
  };

  return (
    <>
      <div className="dashBoard">
        <div className="createList">
          <CreateList onNewList={handleNewList} />
        </div>

        <div className="listDisplay">
          {readData.map((item) => (
            <div key={item._id} className="singleList">
              <div className="listHeader">
                <h2>{item.list}</h2>
                <div className="listButtons">
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="editBtn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <ul>
                {item.card.map((cardItem, index) => (
                  <li key={index} className="cardItem">
                    {cardItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showInput && (
        <div className="updateList">
          <UpdateList
            id={listId}
            onUpdate={fetchLists}
            onClose={handleCloseUpdate}
          />
        </div>
      )}
    </>
  );
};

export default ShowList;
