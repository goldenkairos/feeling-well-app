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
      <p></p>
        <label htmlFor='description'> Tell us how you feel in one word: </label>
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