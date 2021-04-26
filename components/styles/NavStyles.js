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
  p {
    margin: 0.5rem;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default NavStyles;