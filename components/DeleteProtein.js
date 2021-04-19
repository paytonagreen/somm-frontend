import { useState } from 'react';
import styled from 'styled-components';

const DeleteButton = styled.button`
    font-family: inherit;
    padding: .75rem 1rem;
    border-radius: 5px;
    border: none;
    margin: auto;
    background: ${(props) => props.theme.colors.beauj};
    color: ${(props) => props.theme.colors.chard};
    font-size: 1rem;
`;

export default function DeleteProtein({id}) {
    const [data, setData] = useState();

    function deleteProtein() {
        fetch(`http://127.0.0.1:7777/proteins/${id}`, {
          method: `DELETE`,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(async (data) => {
            await data;
            setData(data);
          });
      }

    return (
        <DeleteButton onClick={deleteProtein}>Delete</DeleteButton>
    )
}
