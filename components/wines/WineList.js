import WineList from '../styles/WineList';

export default function WinesList({ wines }) {
  return (
    <WineList>
      <h2>Wines</h2>
      <div className='content'>
        {wines.map((wine) => {
          return <a href={`/editWine?id=${wine.id}`}>{wine.wine_name}</a>;
        })}
      </div>
    </WineList>
  );
}
