import { useEffect, useState } from "react";
import Link from 'next/link';
import WineMatches from './styles/WineMatches';

export default function WinesList({headers, api, id}) {
  const [data, setData] = useState();

  useEffect(() => {
    const url = `${api}/proteins/${id}/wines`
    const options = {
      method: `GET`,
      headers
    }
    fetch(url, options)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data);
      });
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