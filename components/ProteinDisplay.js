import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";

import Protein from "./Protein";
import ProteinSelector from './styles/ProteinSelector';


export default function ProteinDisplay({props}) {
  const [data, setData] = useState();
  const { values, handleChange } = useForm();

  const { api, headers } = props;

  useEffect(() => {
    const url = `${api}/proteins`;
    const options = {
      method: `GET`,
      headers,
    };
    fetch(url, options)
      .then((res) => res.json())
      .then(async (data) => {
        await data;
        setData(data);
      });
  }, []);

  if (!data) return <p>"loading..."</p>;
  if (data) {
    return (
      <>
        <ProteinSelector>
          <h2>Pick Your Protein!</h2>
          <select name="protein" defaultValue="none" value={values.protein} onChange={handleChange}>
            <option value="none" disabled hidden>
              Select A Protein
            </option>
            {data.map((protein) => {
              return (
                <option key={protein.id} value={protein.id}>
                  {protein.protein_name}
                </option>
              );
            })}
          </select>
        </ProteinSelector>
        <Protein api={api} headers={headers} proteins={data} id={values.protein} />
      </>
    );
  }
}
