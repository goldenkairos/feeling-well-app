import { useState } from 'react';
import {MdSend} from "react-icons/md/index.esm.js";
import "./Dashboard.css";


const RemoveWordForm = ({submitDeleteWord}) =>{

  const [formData, setFormData] = useState({
    description: ''
  });

  const handleChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
    console.log(event.target.value)

  };

  const handleDeletedWordSubmit = (e) => {
    e.preventDefault();
    submitDeleteWord(formData.description);

    setFormData({
      description: ''
    }); 

  };

  return (
    
    <form onSubmit={handleDeletedWordSubmit}>
      <div className='submitField'>
      <p></p>
        <label htmlFor='description' > Remove a word: </label>
        <input className="inputfield"
          type='text'
          id='description'
          name='description'
          size="15"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <MdSend className="sendButton" />

      {/* <button className="deleteButton">Delete</button> */}
    </form>
  );
};

export default RemoveWordForm;