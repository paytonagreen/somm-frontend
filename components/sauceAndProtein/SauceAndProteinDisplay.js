import useForm from '../../hooks/useForm';
import { useProteins } from '../../hooks/swr-hooks';
import { useSauces } from '../../hooks/swr-hooks';

import SauceAndProteinWinesList from './SauceAndProteinWinesList';
import Selector from '../styles/Selector';

export default function SauceAndProteinDisplay() {
  const { proteins, isLoading } = useProteins();
  const { sauces } = useSauces();
  const { values, handleChange } = useForm();

  if (isLoading || !proteins || !sauces) return <p>"loading..."</p>;
  return (
    <>
      <Selector>
        <h2>Pick Your Protein!</h2>
        <label htmlFor='protein' hidden />
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
        <h2>Pick Your Sauce!</h2>
        <label htmlFor='sauce' hidden />
        <select
          aria-label='Sauce'
          name='sauce'
          defaultValue='none'
          value={values.sauce}
          onChange={handleChange}
        >
          <option value='none' disabled hidden>
            Select A Sauce
          </option>
          {sauces.map((sauce) => {
            return (
              <option key={sauce.id} value={sauce.id}>
                {sauce.sauce_name}
              </option>
            );
          })}
        </select>
      </Selector>
      <SauceAndProteinWinesList
        proteinId={values.protein}
        sauceId={values.sauce}
      />
    </>
  );
}
