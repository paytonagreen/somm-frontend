import styled from "styled-components";

//borrow ul styles from <Nav />

const BurgerStyles = styled.div`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  background: ${(props) => props.theme.colors.chard};
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  width: 40%;
  max-width: 50vw;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.7s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  @media(min-width: 700px) {
    display: none;
  }
  ${(props) => props.open && `transform: translateX(0);`};
  .links {
    font-size: 1.5rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  a,
  button {
    text-decoration: none;
    color: inherit;
    text-align: center;
    width: 100%;
    margin: .5rem;
    border: none;
    outline: none;
    color: ${(props) => props.theme.colors.beauj};
    background: ${(props) => props.theme.colors.chard};
    div {
      color: ${(props) => props.theme.colors.chard};
    }
  }
  ul {
    color: ${props => props.theme.colors.beauj};
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
  }
  p {
    text-align: center;
    font-size: 1.25rem;
  }
  .signOut button{
    padding-left: 0;
  }
`;

export default BurgerStyles;
