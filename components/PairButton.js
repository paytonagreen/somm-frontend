import { useState } from "react";
import useForm from "../hooks/useForm";

export default function PairButton({ wine_id, protein_id }) {
    const [savingStarted, setSavingStarted] = useState(false);
  const { handleSubmit } = useForm(callback);

  console.log(wine_id);
  console.log(protein_id);

  function callback() {
      if(!savingStarted) {
          try {
            fetch('http://127.0.0.1:7777/wines_proteins', {
              body: JSON.stringify({
                protein_id: protein_id,
                wine_id: wine_id,
              }),
              method: 'POST',
              headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json",
              },
            });
          } catch (err) {
            console.log(err);
          }
      }
  }

  return (
    <button type="submit" onSubmit={handleSubmit}>
      Pair 'Em Up
    </button>
  );
}
