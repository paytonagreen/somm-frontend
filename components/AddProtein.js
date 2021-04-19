import { useEffect, useState } from "react";

export default function ProteinsList() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [protein, setProtein] = useState("");

  useEffect(() => {
    if (isSubmitting) {
        console.log('Fetching...')
        fetch(`http://127.0.0.1:7777/proteins/`, {
          body: JSON.stringify({
              protein_name: protein
          }),
          method: `POST`,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        });
        setIsSubmitting(false);
    }
  }, [isSubmitting, protein]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(isSubmitting);
    setIsSubmitting(true);
    console.log("Submitting...");
  }

  function handleChange(e) {
    e.persist();
    const { value } = e.target;
    setProtein(value);
  }

  return (
    <form>
      <h2>Add Protein</h2>
      <input type="text" value={protein} onChange={(e) => handleChange(e)} />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </form>
  );
}
