import Link from 'next/link';

import { useProteinWines } from 'hooks/swr-hooks';

import WineMatches from '../styles/WineMatches';
import Loader from '../reusable/Loader';

export default function ProteinWinesList({ id }) {
  const { proteinWines, isLoading } = useProteinWines(id);

  if (isLoading) return <Loader />;
  return (
    <WineMatches>
      <h2>Wine Matches</h2>
      {proteinWines.map((protein_wine) => {
        return (
          <div key={protein_wine.id}>
            <Link href={`/editWine?id=${protein_wine.id}`}>
              <a>
                <h3>{protein_wine.name}</h3>
              </a>
            </Link>
            <p>{protein_wine.wine_description}</p>
          </div>
        );
      })}
    </WineMatches>
  );
}
