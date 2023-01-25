import { useState } from 'react';


const NewWordForm = ({createNewWordForm, getWords}) =>{

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

  const handleNewWordSubmit = (e) => {
    e.preventDefault();
    createNewWordForm(formData);

    setFormData({
      description: ''
    }); 

  };

  return (
    
    <form onSubmit={handleNewWordSubmit}>
      <div>
        <h1>
          ☀️How are you feeling today?☀️
        </h1>
        <label htmlFor='description'>Word: </label>
        <input
          type='text'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit" value="Submit">Submit</button>
    </form>
  );
};

export default NewWordForm;