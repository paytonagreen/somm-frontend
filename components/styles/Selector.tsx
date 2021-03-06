import styled from 'styled-components';

//TODO: Mobile;

const Selector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 25rem;
  @media(max-width: 700px) {
    min-width: 75vw;
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
`;

export default Selector;
