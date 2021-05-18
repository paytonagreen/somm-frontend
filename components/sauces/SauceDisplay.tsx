import useForm from 'hooks/useForm';
import { useSauces } from 'hooks/swr-hooks';

import Sauce from './Sauce';
import Selector from '../styles/Selector';
import Loader from '../reusable/Loader';
import { User } from 'types';

interface Props {
  currentUser: User;
}

interface FormValues {
  sauce: number;
}

const SauceDisplay: React.FC<Props> = ({ currentUser }) => {
  const { sauceData, isLoading } = useSauces();
  const { values, handleChange } = useForm<FormValues>();

  if (!sauceData) return <Loader />;
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
          {sauceData.sauces.map((sauce) => {
            return (
              <option key={sauce.id} value={sauce.id}>
                {sauce.name}
              </option>
            );
          })}
        </select>
      </Selector>
      {values.sauce && <Sauce id={values.sauce} />}
    </>
  );
};

export default SauceDisplay;
