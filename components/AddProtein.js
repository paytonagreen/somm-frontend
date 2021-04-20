import { useEffect, useState } from "react";
import Form from "./reusable/Form";
import useForm from "../hooks/useForm";

export default function AddProtein({props}) {
  const [savingStarted, setSavingStarted] = useState(false);
  const { values, setValues, handleChange, handleSubmit } = useForm(callback);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const { api, headers } = props;

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        fetch(`${api}/proteins/`, {
          body: JSON.stringify({
            protein_name: values.name,
          }),
          method: `POST`,
          headers,
        });
        setSuccessMessage("You did it!");
        setValues({ name: "" });
      } catch (err) {
        console.log(err);
        setError(`You didn't do it...`);
      }
    }
  }

  return (
    <Form>
      <h2>Add Protein</h2>
      {successMessage ? <p>{successMessage}</p> : ""}
      {error ? <p>{error}</p> : ""}
      <label htmlFor="name">
        <input
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </Form>
  );
}
