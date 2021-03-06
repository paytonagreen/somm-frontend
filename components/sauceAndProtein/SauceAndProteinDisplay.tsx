import useForm from 'hooks/useForm';
import { useProteins } from 'hooks/swr-hooks';
import { useSauces } from 'hooks/swr-hooks';

import SelectorSection from '../styles/SelectorSection';
import SauceAndProteinGrapesList from './SauceAndProteinGrapesList';
import Loader from '../reusable/Loader';

interface Values {
  protein: number;
  sauce: number;
}

const SauceAndProteinDisplay: React.FC = () => {
  const { proteinData } = useProteins();
  const { sauceData } = useSauces();
  const { values, handleChange } = useForm<Values>(() => {}, {
    protein: 0,
    sauce: 0,
  });

  if (!proteinData || !sauceData) return <Loader />;
  return (
    <>
      <h2>Pick Your:</h2>
      <SelectorSection>
        <div>
          <h2>Protein!</h2>
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
        </div>
        <div>
          <h2>Sauce!</h2>
          <label htmlFor='sauce' hidden />
          <select
            aria-label='Sauce'
            name='sauce'
            value={values.sauce}
            onChange={handleChange}
          >
            <option value={0} disabled hidden>
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
        </div>
      </SelectorSection>
      {values.sauce !== 0 && values.protein !== 0 && (
        <SauceAndProteinGrapesList
          proteinId={values.protein}
          sauceId={values.sauce}
        />
      )}
    </>
  );
};

export default SauceAndProteinDisplay;
