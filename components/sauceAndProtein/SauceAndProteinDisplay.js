import useForm from 'hooks/useForm';
import { useProteins } from 'hooks/swr-hooks';
import { useSauces } from 'hooks/swr-hooks';

import SelectorSection from '../styles/SelectorSection';
import SauceAndProteinWinesList from './SauceAndProteinWinesList';
import Loader from '../reusable/Loader';

export default function SauceAndProteinDisplay() {
  const { proteinData } = useProteins();
  const { sauceData } = useSauces();
  const { values, handleChange } = useForm();

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
            defaultValue='none'
            value={values.protein}
            onChange={handleChange}
          >
            <option value='none' disabled hidden>
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
        </div>
      </SelectorSection>
      {values.sauce && values.protein && (
        <SauceAndProteinWinesList
          proteinId={values.protein}
          sauceId={values.sauce}
        />
      )}
    </>
  );
}
