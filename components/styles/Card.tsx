import styled from 'styled-components';

const Card = styled.div`
  color: ${(props) => props.theme.colors.beauj};
  background-color: ${(props) => props.theme.colors.chard};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 10px 5px 5px #4c0013;
  min-width: 25rem;
  text-align: center;
  @media(max-width: 700px) {
    min-width: 75vw;
    max-widtH: 75vw;
    h3 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1.25rem;
    }
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }


  div.button-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default Card;
