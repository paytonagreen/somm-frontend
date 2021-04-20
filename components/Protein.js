import WinesList from "./WinesList";
import DeleteProtein from "./DeleteProtein";
import styled from "styled-components";

const ProteinCard = styled.div`
  color: ${(props) => props.theme.colors.beauj};
  background-color: ${(props) => props.theme.colors.chard};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 10px 5px 5px #4c0013;
  min-width: 25rem;
  h1 {
    font-size: 2rem;
    text-align: center;
  }
  h2 {
    text-align: center;
    font-size: 1.5rem;
  }
  div.button-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default function Protein({ api, proteins, id }) {
  if (!id) return <p></p>;
  if (id) {
    console.log(api)
    const protein = proteins.filter((protein) => {
      return protein.id === id;
    });
    console.log(id);
    return (
      <>
        <ProteinCard key={protein.id}>
          <div key={protein.id}>
            <h1>{protein.protein_name}</h1>
            <WinesList api={api} id={id} />
            <div class="button-div">
              {/* {id && <DeleteProtein id={id} />} */}
            </div>
          </div>
        </ProteinCard>
      </>
    );
  }
}
