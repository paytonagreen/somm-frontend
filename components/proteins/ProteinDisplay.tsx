import useForm from 'hooks/useForm';
import { useProteins } from 'hooks/swr-hooks';

import Protein from './Protein';
import Selector from '../styles/Selector';
import Loader from '../reusable/Loader';

interface ProteinSelectorValues {
  protein: number;
}

export default function ProteinDisplay() {
  const { proteinData, isLoading, isError } = useProteins();
  const { values, handleChange } = useForm<ProteinSelectorValues>(() => {}, {
    protein: 0,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Something went wrong...</p>;
  return (
    <>
      <Selector>
        <h2>Pick Your Protein!</h2>
        <label htmlFor='protein' hidden />
        <select
          aria-label='Protein'
          name='protein'
          value={values.protein}
          onChange={handleChange}
        >
          <option value={0} disabled hidden>
            Select A Protein
          </option>
          {proteinData.proteins.map((protein) => {
            return (
              <option key={protein.id} value={protein.id}>
                {protein.name}
              </option>
            );
          })}
        </select>
      </Selector>
      {values.protein !== 0 && <Protein id={values.protein} />}
    </>
  );
}
