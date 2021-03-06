import styled from 'styled-components';

const Form = styled.form`
  // @media(max-height: 1000px) {
  //   margin-top: 5rem;
  //   margin-bottom: 2rem;
  // }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 25rem;
  background-color: ${(props) => props.theme.colors.chard};
  color: ${(props) => props.theme.colors.beauj};
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 10px 5px 5px #4c0013;
  @media (max-width: 700px) {
    min-width: 70vw;
    max-width: 70vw;
  }
  select {
    margin-bottom: 2rem;
    width: 100%;
    font-family: inherit;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.chard};
    background-color: ${(props) => props.theme.colors.beauj};
    border: none;
    border-radius: 5px;
    text-align: center;
  }
  input,
  textarea {
    background-color: ${(props) => props.theme.colors.beauj};
    color: ${(props) => props.theme.colors.chard};
    border: none;
    border-radius: 5px;
    margin: 1rem;
    width: 85%;
    height: 2rem;
    :focus {
      outline: none;
      border: 1px solid #4c0013;
    }
  }
  .textbox {
    height: 100px;
  }
  button {
    font-family: inherit;
    font-size: 1.25rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.beauj};
    color: ${(props) => props.theme.colors.chard};
  }
  .links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: .5rem;
    a {
      margin: .5rem;
      text-decoration: none;
      color: inherit;
    }
  }
  .searchBar {
    display: flex;
    width: 25vw;
    align-items: center;
    button {
      height: 2rem;
      padding: 0 1rem;
    }
  }
  h2 {
    text-align: center;
  }
`;

export default Form;
