import Link from 'next/link';

import { useProteinWines } from '../../hooks/swr-hooks';
import { useSauceWines } from '../../hooks/swr-hooks';

import WineMatches from '../styles/WineMatches';
import Card from '../styles/Card';

export default function SauceAndProteinWinesList({ proteinId, sauceId }) {
  const { proteinWines, isLoading } = useProteinWines(proteinId);
  const { sauceWines } = useSauceWines(sauceId);

  if (!sauceId || !proteinId) return <p></p>;
  if (isLoading || !proteinWines || !sauceWines) return <p>Loading...</p>;
  return (
    <Card>
      <WineMatches>
        <h2>Wine Matches</h2>
        {proteinWines.map((protein_wine) => {
          return (
            <div key={protein_wine.id}>
              {sauceWines.map((sauce_wine) => {
                if (sauce_wine.id === protein_wine.id) {
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
                }
              })}
            </div>
          );
        })}
      </WineMatches>
    </Card>
  );
}
