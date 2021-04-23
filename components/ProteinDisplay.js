import useForm from '../hooks/useForm';

import { useProteins } from '../hooks/swr-hooks';
import Protein from './Protein';
import ProteinSelector from './styles/ProteinSelector';

export default function ProteinDisplay() {
  const { proteins, isLoading } = useProteins();
  const { values, handleChange } = useForm();

  if (isLoading) return <p>"loading..."</p>;

  return (
    <>
      <ProteinSelector>
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
      </ProteinSelector>
      <Protein proteins={proteins} id={values.protein} />
    </>
  );
}
