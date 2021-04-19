import { useState } from "react";
import Form from "./reusable/Form";
import useForm from '../hooks/useForm';

export default function AddWine() {
  const [savingStarted, setSavingStarted] = useState(false);
  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true)
        fetch(`http://127.0.0.1:7777/wines/`, {
          body: JSON.stringify({
            wine_name: values.name,
            wine_description: values.description,
          }),
          method: `POST`,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        });
        setValues({ name: "", description: "" });
      } catch(err) {
          console.log(err);
      }
    }
  }

  console.log(values);

  return (
    <Form>
      <h2>Add Wine</h2>
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
