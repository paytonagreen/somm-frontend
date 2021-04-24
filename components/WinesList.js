import Link from 'next/link';
import WineMatches from './styles/WineMatches';
import { useProteinWines } from '../hooks/swr-hooks';

export default function WinesList({ id }) {
  const { proteinWines, isLoading } = useProteinWines(id);

  if (isLoading) return <p>Loading...</p>;
  return (
    <WineMatches>
      <h2>Wine Matches</h2>
      {proteinWines.map((protein_wine) => {
        return (
          <div key={protein_wine.id}>
            <Link href={`/editWine?id=${protein_wine.id}`}>
              <a>
                <h3>{protein_wine.wine_name}</h3>
              </a>
            </Link>
            <p>{protein_wine.wine_description}</p>
          </div>
        );
      })}
    </WineMatches>
  );
}
