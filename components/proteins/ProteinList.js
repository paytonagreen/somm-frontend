import ThingList from '../styles/ThingList';

export default function ProteinList({ proteins, isValidating }) {
  return (
    <ThingList>
      <h2>Proteins</h2>
      {isValidating ? <p>Updating data...</p> : ''}
      <div className='content'>
        {proteins.map((protein) => {
          return <p>{protein.protein_name}</p>;
        })}
      </div>
    </ThingList>
  );
}
