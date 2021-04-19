import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";

import Form from "./reusable/Form";
import EditWineForm from './EditWineForm';

export default function EditWine({ id }) {
  const [data, setData] = useState();
  const [savingStarted, setSavingStarted] = useState(false);
  const { values, handleChange, handleSubmit } = useForm(callback);

  useEffect(() => {
    const url = `http://127.0.0.1:7777/wines/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        fetch(`http://127.0.0.1:7777/wine/${id}`, {
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
        setValues({ name: "", description: "" });
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (!data) return <p>Loading...</p>
  if (data) {
      return (
          <EditWineForm id={id} data={data}/>
  );
}
}
