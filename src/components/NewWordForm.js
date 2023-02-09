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
      <div className='submitField'>
      <p></p>
        <label htmlFor='description' > Express how you feel in one word: </label>
        <input className="inputfield"
          type='text'
          id='description'
          name='description'
          size="15"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button className="submitButton" type="submit" value="Submit">Submit</button>
    </form>
  );
};

export default NewWordForm;