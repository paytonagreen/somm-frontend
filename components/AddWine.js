import { useState } from "react";

import useForm from '../hooks/useForm';

import Form from "./reusable/Form";

export default function AddWine({props}) {
  const [savingStarted, setSavingStarted] = useState(false);
  const [ successMessage, setSuccessMessage ] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback);

  const { api, headers } = props

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true)
        fetch(`${api}/wines/`, {
          body: JSON.stringify({
            wine_name: values.name,
            wine_description: values.description,
          }),
          method: `POST`,
          headers
        });
        setSuccessMessage('You did it!');
      } catch(err) {
          console.log(err);
      }
    }
  }

  return (
    <Form>
      <h2>Add Wine</h2>
      {successMessage && <p>{successMessage}</p>}
      <label htmlFor="name">Name</label>
      <input
        name="name"
        type="text"
        value={values.name}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        className="textbox"
        type="textarea"
        value={values.description}
        onChange={(e) => handleChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </Form>
  );
}
