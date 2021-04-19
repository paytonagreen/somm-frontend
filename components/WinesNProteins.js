import { useEffect, useState } from "react";
import Pairing from './Pairing'

export default function WinesNProteins() {
  const [proteins, setProteins] = useState();
  const [wines, setWines] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:7777/proteins`, {
      method: `GET`,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        setProteins(data);
      });
    fetch(`http://127.0.0.1:7777/wines`, {
      method: `GET`,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        setWines(data);
      });

  }, []);
  if (!proteins || !wines) return <p>"loading..."</p>;
  if (proteins && wines) {
    return (
      <>
        <Pairing wines={wines} proteins={proteins}/>
      </>
    );
  }
}
