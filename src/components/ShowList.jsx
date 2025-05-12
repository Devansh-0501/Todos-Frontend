import {useState,useEffect} from 'react'
import axios from 'axios'
import "../styles/showList.css"
import UpdateList from './UpdateList'



const ShowList = () => {
      const [readData, setReadData] =useState([])
      const [showInput,setShowInput]=useState(false)
      const [listId,setListId]=useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/api/read')
        .then((response) => {
            console.log(response.data);
            setReadData(response.data.data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
    , [])

    const handleDelete = (id) =>{
        axios.delete(`http://localhost:3000/api/delete/${id}`)
        .then((response) => {
            console.log(response.data);
            setReadData(response.data.data);
            window.location.reload();
        })
        .catch((error)=>{
            console.log('Error deleting data:', error)
        })
    }
    const handleUpdate=(id)=>{
        setListId(id)
        setShowInput(true)

    }


  return (
    <>
   <div className="listDisplay">
  {readData.map((item) => (
    <div key={item._id} className="singleList">
      <div className="listHeader">
        <h2>{item.list}</h2>
        <div className="listButtons">
          <button onClick={() => handleUpdate(item._id)} className="editBtn">Edit</button>
          <button onClick={() => handleDelete(item._id)} className="deleteBtn">Delete</button>
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
{showInput && <div className="updateList">
    <UpdateList id={listId}/>
</div>}
</>


  )
}

export default ShowList