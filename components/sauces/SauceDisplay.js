import useForm from 'hooks/useForm';
import { useSauces } from 'hooks/swr-hooks';

import Sauce from './Sauce';
import Selector from '../styles/Selector';
import Loader from '../reusable/Loader';

export default function SauceDisplay({ currentUser }) {
  const { data, isLoading } = useSauces();
  const { values, handleChange } = useForm();

  if (!data) return <Loader />;
  return (
    <>
      <Selector>
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
          {data.sauces.map((sauce) => {
            return (
              <option key={sauce.id} value={sauce.id}>
                {sauce.name}
              </option>
            );
          })}
        </select>
      </Selector>
      <Sauce currentUser={currentUser} sauces={data.sauces} id={values.sauce} />
    </>
  );
}
