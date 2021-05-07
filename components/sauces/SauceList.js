import ThingsList from '../styles/ThingList';

export default function SauceList({ sauces }) {
  return (
    <ThingsList>
      <h2>Sauces</h2>
      <div className='content'>
        {sauces.map((sauce) => {
          return <p>{sauce.sauce_name}</p>;
        })}
      </div>
    </ThingsList>
  );
}
