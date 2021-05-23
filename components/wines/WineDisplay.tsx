import useForm from 'hooks/useForm';
import { useAccountWines } from 'hooks/swr-hooks';

import Wine from './Wine';
import Selector from '../styles/Selector';
import Loader from '../reusable/Loader';

interface WineDisplayProps {
  id: number;
}

const WineDisplay: React.FC<WineDisplayProps> = ({ id }) => {
  const { accountWines, isLoading, isError } = useAccountWines(id);
  const { values, handleChange } = useForm(() => {}, {
    wine: 0,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Something went wrong...</p>;
  return (
    <>
      <Selector>
        <h2>Pick Your Wine!</h2>
        <label htmlFor='wine' hidden />
        <select
          aria-label='Wine'
          name='wine'
          value={values.wine}
          onChange={handleChange}
        >
          <option value={0} disabled hidden>
            Select A Wine
          </option>
          {accountWines.wines.map((wine) => {
            return (
              <option key={wine.id} value={wine.id}>
                {wine.name}
              </option>
            );
          })}
        </select>
      </Selector>
      {values.wine !== 0 && <Wine id={values.wine} />}
    </>
  );
};

export default WineDisplay;
