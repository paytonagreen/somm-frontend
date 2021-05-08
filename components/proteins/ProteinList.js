import ThingList from '../styles/ThingList';

export default function ProteinList({ proteins }) {
  return (
    <ThingList>
      <h2>Proteins</h2>
      <div className='content'>
        {proteins.map((protein) => {
          return <p key={protein.id}>{protein.protein_name}</p>;
        })}
      </div>
    </ThingList>
  );
}
