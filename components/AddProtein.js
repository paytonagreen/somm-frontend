import { useEffect, useState } from "react";
import Form from "./reusable/Form";
import useForm from "../hooks/useForm";

export default function AddProtein() {
  const [savingStarted, setSavingStarted] = useState(false);
  const { values, setValues, handleChange, handleSubmit } = useForm(callback);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  
  function callback() {
    if (!savingStarted){
      try {
        setSavingStarted(true);
        fetch(`http://127.0.0.1:7777/proteins/`, {
          body: JSON.stringify({
            protein_name: values.name,
          }),
          method: `POST`,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        });
        setSuccessMessage('You did it!');
        setValues({name: ''});
      } catch (err) {
        console.log(err);
        setError(`You didn't do it...`)
      }
    }
  }

  console.log(values)
  return (
    <Form>
      <h2>Add Protein</h2>
      {successMessage ? <p>{successMessage}</p> : ''}
      {error ? <p>{error}</p> : ''}
      <label htmlFor="name">
        <input name="name" type="text" value={values.name} onChange={(e) => handleChange(e)} />
      </label>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </Form>
  );
}
