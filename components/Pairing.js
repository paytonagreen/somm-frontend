import { useState } from "react";
import Form from "./reusable/Form";
import useForm from "../hooks/useForm";

export default function Pairing({props, wines, proteins }) {
  const [savingStarted, setSavingStarted] = useState(false);

  const { values, handleChange, handleSubmit } = useForm(callback);
  const { api, headers } = props

  function callback() {
    if (!savingStated) {
      try {
        setSavingStarted(true)
        const url = `${api}/wines_proteins`;
        const options = {
          body: JSON.stringify({
            protein_id: values.protein_id,
            wine_id: values.wine_id,
          }),
          method: "POST",
          headers,
        }
        fetch(url, options);
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (!wines || !proteins) return "Loading...";
  if (wines && proteins);
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Pairing!</h2>
      <label htmlFor="wine_id" />
      <select value={values.wine_id} name="wine_id" onChange={handleChange}>
        {wines.map((wine) => {
          return (
            <option value={wine.id} key={wine.id}>
              {wine.wine_name}
            </option>
          );
        })}
      </select>
      <label htmlFor="protein_id" />
      <select
        value={values.protein_id}
        name="protein_id"
        onChange={handleChange}
      >
        {proteins.map((protein) => {
          return (
            <option value={protein.id} key={protein.id}>
              {protein.protein_name}
            </option>
          );
        })}
      </select>
      <button type="submit" >
        Pair 'Em Up!
      </button>
    </Form>
  );
}
