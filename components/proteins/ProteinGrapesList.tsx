import Link from 'next/link';

import { useProteinGrapes } from 'hooks/swr-hooks';

import WineMatches from '../styles/WineMatches';
import Loader from '../reusable/Loader';

interface Props {
  id: number;
}

const ProteinGrapesList: React.FC<Props> = ({ id }) => {
  const { proteinGrapes, isLoading } = useProteinGrapes(id);

  if (isLoading) return <Loader />;
  return (
    <WineMatches>
      <h2>Grape Matches</h2>
      {proteinGrapes.map((protein_wine) => {
        return (
          <div key={protein_wine.id}>
            <Link href={`/editWine?id=${protein_wine.id}`}>
              <a>
                <h3>{protein_wine.name}</h3>
              </a>
            </Link>
            <p>{protein_wine.description}</p>
          </div>
        );
      })}
    </WineMatches>
  );
};

export default ProteinGrapesList;
