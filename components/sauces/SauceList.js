import ThingsList from '../styles/ThingList';

export default function SauceList({ sauces }) {
  return (
    <ThingsList>
      <h2>Sauces</h2>
      <div className='content'>
        {sauces.map((sauce) => {
          return <p key={sauce.id}>{sauce.sauce_name}</p>;
        })}
      </div>
    </ThingsList>
  );
}
