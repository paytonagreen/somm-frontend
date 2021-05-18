import styled from 'styled-components'

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

export default SelectorSection;