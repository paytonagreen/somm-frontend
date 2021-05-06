import styled from 'styled-components';

const NavStyles = styled.nav`
  height: 4rem;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  color: #80304c;
  background-color: #ffc47d;
  h1 {
    margin: 1rem;
  }
  p,
  a {
    margin: 0.5rem;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;
  }
  button {
    position: absolute;
    right: 0.75rem;
    top: 0.75rem;
  }
  .adminOptions {
    transition: all 5s;
    ul {
      display: none;
    }
    :hover {
      ul {
        z-index: 1;
        box-shadow: 3px 3px 5px black;
        position: absolute;
        background: ${(props) => props.theme.colors.chard};
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        li {
          padding: .5rem;
          :hover {
            color: #706278;
          }
        }
      }
    }
  }
`;

export default NavStyles;
