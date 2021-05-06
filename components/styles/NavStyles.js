import styled from 'styled-components';

const NavStyles = styled.nav`
  height: 4rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  color: #80304c;
  background-color: #ffc47d;
  h1 {
    margin: 1rem;
  }
  p, a {
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
    right: .75rem;
    top: .75rem;
  }
`;

export default NavStyles;