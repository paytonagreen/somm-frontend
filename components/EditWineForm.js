import { useState } from "react";
import styled from 'styled-components';

import useForm from "../hooks/useForm";

import Form from "./reusable/Form";
import DeleteWine from "./DeleteWine";

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    margin: .5rem 1rem;
  }
`;



export default function EditWineForm({ data, id }) {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: data.wine_name,
    description: data.wine_description,
  });

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        fetch(`http://127.0.0.1:7777/wines/${id}`, {
          body: JSON.stringify({
            wine_name: values.name,
            wine_description: values.description,
          }),
          method: `PUT`,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        });
        setSuccessMessage("Saved successfully.");
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log(values);

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Wine</h2>
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
      <ButtonRow>
        <button type="submit">Submit</button>
        <DeleteWine id={id}/>
      </ButtonRow>
    </Form>
  );
}
