import { useEffect, useState } from "react";



export default function WinesList() {
  const [data, setData] = useState();

  function fetchTemplate(address, method, id) {
    fetch(`http://127.0.0.1:7777/${address}/${id}`, {
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
    fetchTemplate('wines#index.all', 'GET')
  }, []);

  const deleteWine = (id) => {
    fetchTemplate('wines', 'DELETE', id)
  }

  console.log(data);
  if (!data) return <p>"loading..."</p>
  if (data) {
      return (
          <>
            <h2>Wines</h2>
          {data.map((wine) => {
            return <div key={wine.id}>
                <p>{wine.id}</p>
                <p>{wine.wine_name}</p>
                <p>{wine.wine_description}</p>
                <button onClick={() => {
                    deleteWine(wine.id)
                }}>Delete</button>
                </div>;
          })}
          </>
      );
  }
}
