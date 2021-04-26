import Link from 'next/link';
import WineMatches from '../styles/WineMatches';
import { useSauceWines } from '../../hooks/swr-hooks';

export default function SauceWinesList({ id }) {
  const { sauceWines, isLoading } = useSauceWines(id);

  if (isLoading) return <p>Loading...</p>;
  return (
    <WineMatches>
      <h2>Wine Matches</h2>
      {sauceWines.map((sauce_wine) => {
        return (
          <div key={sauce_wine.id}>
            <Link href={`/editWine?id=${sauce_wine.id}`}>
              <a>
                <h3>{sauce_wine.wine_name}</h3>
              </a>
            </Link>
            <p>{sauce_wine.wine_description}</p>
          </div>
        );
      })}
    </WineMatches>
  );
}
