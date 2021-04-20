import { useEffect, useState } from "react";
import styled from "styled-components";
import useForm from "../hooks/useForm";

import Protein from "./Protein";

const ProteinSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 25rem;
  select {
    margin-bottom: 2rem;
    width: 100%;
    font-family: inherit;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.beauj};
    background-color: ${(props) => props.theme.colors.chard};
    border: none;
    border-radius: 5px;
    text-align: center;
  }
`;

export default function ProteinDisplay({api}) {
  const [data, setData] = useState();
  const { values, handleChange } = useForm();

  console.log(api);

useEffect(() => {
  const url = `${api}/proteins`;
  const options = {
    method: `get`,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Content-Type": "application/json",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then(async (data) => {
      await data;
      setData(data);
    });
}, [])

  if (!data) return <p>"loading..."</p>;
  if (data) {
    return (
      <>
        <ProteinSelector>
          <h2>Pick Your Protein!</h2>
          <select name="protein" value={values.protein} onChange={handleChange}>
            <option value="none" selected disabled hidden>
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
        <Protein api={api} proteins={data} id={values.protein} />
      </>
    );
  }
}
