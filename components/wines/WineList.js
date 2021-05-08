import ThingsList from '../styles/ThingList';

export default function WineList({ wines }) {
  return (
    <ThingsList>
      <h2>Wines</h2>
      <div className='content'>
        {wines.map((wine) => {
          return <a key={wine.id}href={`/editWine?id=${wine.id}`}>{wine.wine_name}</a>;
        })}
      </div>
    </ThingsList>
  );
}
