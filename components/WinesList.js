import { useEffect, useState } from "react";



export default function WinesList({id}) {
  const [data, setData] = useState();

  console.log(id);

  function fetchTemplate(method, id) {
    fetch(`http://127.0.0.1:7777/proteins/${id}/wines`, {
      method: `${method}`,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        setData(data);
      });
}
  useEffect(() => {
    fetchTemplate('GET', id)
  }, [id]);

  if (!id) return <p>Please Choose A Protein</p>
  if (id && !data) return <p>Loading...</p>
  if (id && data) {
      return (
          <>
          <h2>Wine Matches</h2>
          {data.map((protein_wine) => {
            return (
                <div key={protein_wine.id}>
                <p>{protein_wine.wine_name}</p>
                <p>{protein_wine.wine_description}</p>
                </div>
            )
          })}
          </>
      );
  }
}