import { useEffect, useState } from "react";
import Pairing from './Pairing'

export default function WinesNProteins({props}) {
  const [proteins, setProteins] = useState();
  const [wines, setWines] = useState();

  const { api, headers } = props;

  useEffect(() => {
    const proteinUrl = `${api}/proteins`
    const wineUrl = `${api}/wines`
    const options = {
      method: 'GET',
      headers
    }
    fetch(proteinUrl, options)
      .then((res) => res.json())
      .then(async (data) => {
        setProteins(data);
      });
    fetch(wineUrl, options)
      .then((res) => res.json())
      .then(async (data) => {
        setWines(data);
      });

  }, []);
  if (!proteins || !wines) return <p>"loading..."</p>;
  if (proteins && wines) {
    return (
      <>
        <Pairing props={props} wines={wines} proteins={proteins}/>
      </>
    );
  }
}
