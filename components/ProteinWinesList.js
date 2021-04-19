import { useEffect, useState } from "react";



export default function ProteinWinesList({id}) {
  const [data, setData] = useState();

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
        console.log(data)
        setData(data);
      });
}
  useEffect(() => {
    fetchTemplate('GET', id)
  }, []);

  if (!data) return <p>"loading..."</p>
  if (data) {
      return (
          <>
          <h2>Wine Matches</h2>
          {data.map((protein_wine) => {
              console.log(protein_wine)
            return (
                <div key={protein_wine.id}>
                <p>{protein_wine.wine_name}</p>
                <p>{protein_wine.wine_description}</p>
                {console.log(protein_wine.wines)}
                </div>
            )
          })}
          </>
      );
  }
}