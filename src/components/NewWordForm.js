import { useState } from 'react';


const NewWordForm = ({createNewWordForm}) =>{

  const [formData, setFormData] = useState({
    description: ''
  });

  const handleChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);

  };

  const handleNewWordSubmit = (e) => {
    e.preventDefault();
    createNewWordForm(formData);

    setFormData({
      message: ''
    }); 

  };

  return (
    
    <form onSubmit={handleNewWordSubmit}>
      <div>
        <h1>
          ☀️How are you feeling today?☀️
        </h1>
        <label htmlFor='word'>Word: </label>
        <input
          type='text'
          id='word'
          name='word'
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default NewWordForm;