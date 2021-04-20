import WinesList from "./WinesList";
import DeleteProtein from "./DeleteProtein";
import ProteinCard from "./styles/ProteinCard";

export default function Protein({ api, headers, proteins, id }) {
  if (!id) return <p></p>;
  if (id) {
    const protein = proteins.filter((protein) => {
      return protein.id === id;
    });
    return (
      <ProteinCard key={protein.id}>
        <div key={protein.id}>
          <h1>{protein.protein_name}</h1>
          <WinesList api={api} headers={headers} id={id} />
          <div className="button-div">
            {id && <DeleteProtein api={api} headers={headers} id={id} />}
          </div>
        </div>
      </ProteinCard>
    );
  }
}
