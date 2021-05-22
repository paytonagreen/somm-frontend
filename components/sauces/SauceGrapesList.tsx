import Link from 'next/link';

import { useSauceGrapes } from 'hooks/swr-hooks';

import WineMatches from '../styles/WineMatches';
import Loader from '../reusable/Loader';

interface Props {
  id: number;
}

const SauceGrapesList: React.FC<Props> = ({ id }) => {
  const { sauceGrapes, isLoading } = useSauceGrapes(id);

  if (isLoading) return <Loader />;
  return (
    <WineMatches>
      <h2>Grape Matches</h2>
      {sauceGrapes.map((sauce_wine) => {
        return (
          <div key={sauce_wine.id}>
            <Link href={`/editWine?id=${sauce_wine.id}`}>
              <a>
                <h3>{sauce_wine.name}</h3>
              </a>
            </Link>
            <p>{sauce_wine.description}</p>
          </div>
        );
      })}
    </WineMatches>
  );
};

export default SauceGrapesList;
