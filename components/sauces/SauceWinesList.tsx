import Link from 'next/link';

import { useSauceWines } from 'hooks/swr-hooks';

import WineMatches from '../styles/WineMatches';
import Loader from '../reusable/Loader';

interface Props {
  id: number;
}

const SauceWinesList: React.FC<Props> = ({ id }) => {
  const { sauceWines, isLoading } = useSauceWines(id);

  if (isLoading) return <Loader />;
  return (
    <WineMatches>
      <h2>Wine Matches</h2>
      {sauceWines.map((sauce_wine) => {
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

export default SauceWinesList;
