import { useEffect, useState } from "react";
import ProteinWinesList from './ProteinWinesList'



export default function ProteinsList() {
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
    fetchTemplate('proteins#index.all', 'GET')
  }, []);

  const deleteProtein = (id) => {
    fetchTemplate('proteins', 'DELETE', id)
  }

  console.log(data);
  if (!data) return <p>"loading..."</p>
  if (data) {
      return (
          <>
          <h2>Proteins</h2>
          {data.map((protein) => {
            return <div key={protein.id}>
                <p>Protein: {protein.protein_name}</p>
                {console.log(protein.wines)}
                <ProteinWinesList id={protein.id}/>
                <button onClick={() => {
                    deleteProtein(protein.id)
                }}>Delete</button>
                </div>;
          })}
          </>
      );
  }
}