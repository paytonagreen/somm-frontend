import styled from 'styled-components';

import useForm from 'hooks/useForm';
import { useProteins } from 'hooks/swr-hooks';
import { useSauces } from 'hooks/swr-hooks';

import SauceAndProteinWinesList from './SauceAndProteinWinesList';
import Selector from '../styles/Selector';

const SelectorSection = styled.div`
  display: flex;
  @media(max-width: 700px) {
    flex-direction: column;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 20rem;
    margin: 0rem 1rem;
    @media(max-width: 700px) {
      min-width: 50vw;
      h2 {
        margin: .5rem;
      }
    }
    select {
      margin-bottom: 2rem;
      width: 100%;
      font-family: inherit;
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.beauj};
      background-color: ${(props) => props.theme.colors.chard};
      border: none;
      border-radius: 5px;
      text-align: center;
    }
  }
`;

export default function SauceAndProteinDisplay() {
  const { proteins, isLoading } = useProteins();
  const { sauces } = useSauces();
  const { values, handleChange } = useForm();

  if (isLoading || !proteins || !sauces) return <p>"loading..."</p>;
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
            {proteins.map((protein) => {
              return (
                <option key={protein.id} value={protein.id}>
                  {protein.protein_name}
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
            {sauces.map((sauce) => {
              return (
                <option key={sauce.id} value={sauce.id}>
                  {sauce.sauce_name}
                </option>
              );
            })}
          </select>
        </div>
      </SelectorSection>
      <SauceAndProteinWinesList
        proteinId={values.protein}
        sauceId={values.sauce}
      />
    </>
  );
}
