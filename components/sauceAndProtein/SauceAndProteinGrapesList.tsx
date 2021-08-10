import Link from 'next/link';

import { useProteinGrapes } from 'hooks/swr-hooks';
import { useSauceGrapes } from 'hooks/swr-hooks';

import WineMatches from '../styles/WineMatches';
import Card from '../styles/Card';
import Loader from '../reusable/Loader';

interface Props {
  proteinId: number;
  sauceId: number;
}

type proteinGrapesObject = Record<string, boolean>;

const SauceAndProteinGrapesList: React.FC<Props> = ({ proteinId, sauceId }) => {
  const { proteinGrapes } = useProteinGrapes(proteinId);
  const { sauceGrapes } = useSauceGrapes(sauceId);

  const proteinGrapesObject: proteinGrapesObject = {};

  if (!proteinGrapes || !sauceGrapes) return <Loader />;
  return (
    <Card>
      <WineMatches>
        <h2>Grape Matches</h2>
        {proteinGrapes.forEach((proteinGrape) => {
          proteinGrapesObject[proteinGrape.name] = true;
        })}
        {sauceGrapes.map((sauceGrape) => {
          if (proteinGrapesObject[sauceGrape.name]) {
            return (
              <div key={sauceGrape.id}>
                <Link href={`/editWine?id=${sauceGrape.id}`}>
                  <a>
                    <h3>{sauceGrape.name}</h3>
                  </a>
                </Link>
                <p>{sauceGrape.description}</p>
              </div>
            );
          }
        })}
      </WineMatches>
    </Card>
  );
};

export default SauceAndProteinGrapesList;
