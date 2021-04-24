import useForm from '../hooks/useForm';

import { useSauces } from '../hooks/swr-hooks';
import Sauce from './Sauce';
import SauceSelector from './styles/SauceSelector';

export default function ProteinDisplay() {
  const { sauces, isLoading } = useSauces();
  const { values, handleChange } = useForm();

  if (isLoading) return <p>"loading..."</p>;

  return (
    <>
      <SauceSelector>
        <h2>Pick Your Protein!</h2>
        <label htmlFor='sauce' hidden/>
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
      </SauceSelector>
      <sauce sauces={sauces} id={values.sauce} />
    </>
  );
}