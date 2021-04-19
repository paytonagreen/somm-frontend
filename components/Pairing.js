import { useEffect, useState } from "react";
import Form from "./reusable/Form";
import useForm from "../hooks/useForm";

export default function Pairing({ wines, proteins }) {
  const [savingStarted, setSavingStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    if (isSubmitting) {
      console.log("Sending...");
      try {
        setSavingStarted(true);
        const url = "http://127.0.0.1:7777/wines_proteins";
        const options = {
          body: JSON.stringify({
            protein_id: values.protein_id,
            wine_id: values.wine_id,
          }),
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        };
        fetch(url, options);
        setIsSubmitting(false);
      } catch (err) {
        console.log(err);
      }
    }
  }, [isSubmitting, values]);

  function handleChange(e) {
    e.persist();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
  }

  console.log(values);


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
