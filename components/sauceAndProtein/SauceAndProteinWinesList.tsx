import Link from 'next/link';

import { useProteinWines } from 'hooks/swr-hooks';
import { useSauceWines } from 'hooks/swr-hooks';

import WineMatches from '../styles/WineMatches';
import Card from '../styles/Card';
import Loader from '../reusable/Loader';

interface Props {
  proteinId: number;
  sauceId: number;
}

type ProteinWinesObject = Record<string, boolean>;

const SauceAndProteinWinesList: React.FC<Props> = ({ proteinId, sauceId }) => {
  const { proteinWines, isLoading } = useProteinWines(proteinId);
  const { sauceWines } = useSauceWines(sauceId);

  const proteinWinesObject: ProteinWinesObject = {};

  if (!proteinWines || !sauceWines) return <Loader />;
  return (
    <Card>
      <WineMatches>
        <h2>Wine Matches</h2>
        {proteinWines.forEach((proteinWine) => {
          proteinWinesObject[proteinWine.name] = true;
        })}
        {sauceWines.map((sauceWine) => {
          if (proteinWinesObject[sauceWine.name]) {
            return (
              <div key={sauceWine.id}>
                <Link href={`/editWine?id=${sauceWine.id}`}>
                  <a>
                    <h3>{sauceWine.name}</h3>
                  </a>
                </Link>
                <p>{sauceWine.wine_description}</p>
              </div>
            );
          }
        })}
      </WineMatches>
    </Card>
  );
};
