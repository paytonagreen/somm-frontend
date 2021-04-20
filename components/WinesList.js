import { useEffect, useState } from "react";
import Link from 'next/link';
import styled from 'styled-components';

const WineMatches = styled.div`
  max-width: 25rem;
  h3 {
    text-align: center;
  }
  p {
    color: #706278;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function WinesList({api, id}) {
  const [data, setData] = useState();

  function fetchTemplate(method, id) {
    fetch(`${api}/proteins/${id}/wines`, {
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
          <WineMatches>
          <h2>Wine Matches</h2>
          {data.map((protein_wine) => {
            return (
                <div key={protein_wine.id}>
                <Link href={`/editWine?id=${protein_wine.id}`}>
                <a><h3>{protein_wine.wine_name}</h3></a>
                </Link>
                <p>{protein_wine.wine_description}</p>
                </div>
            )
          })}
          </WineMatches>
      );
  }
}