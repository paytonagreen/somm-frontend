import useForm from '../../hooks/useForm';
import { useProteins } from '../../hooks/swr-hooks';

import Protein from './Protein';
import Selector from '../styles/Selector';

export default function ProteinDisplay({currentUser}) {
  const { proteins, isLoading } = useProteins();
  const { values, handleChange } = useForm();

  if (isLoading) return <p>"loading..."</p>;
  if (!isLoading && !proteins) return <p>Something went wrong...</p>

  return (
    <>
      <Selector>
        <h2>Pick Your Protein!</h2>
        <label htmlFor='protein' hidden/>
        <select
          aria-label='Protein'
          name='protein'
          defaultValue='none'
          value={values.protein}
          onChange={handleChange}
        >
          <option value='none' disabled hidden>
            Select A Protein
          </option>
          {proteins.map((protein) => {
            return (
              <option key={protein.id} value={protein.id}>
                {protein.protein_name}
              </option>
            );
          })}
        </select>
      </Selector>
      {values.protein && (

      <Protein currentUser={currentUser} proteins={proteins} id={values.protein} />
      )}
    </>
  );
}
