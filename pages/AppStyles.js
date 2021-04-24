import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Orelega One', cursive;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
    beauj: '#80304c',
    chard: '#ffc47d',
  },
};

const Nav = styled.nav`
  height: 4rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  color: #80304c;
  background-color: #ffc47d;
  margin-bottom: -4rem;
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

const Content = styled.div`
  background-color: #80304c;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffc47d;
`;

export {GlobalStyle, theme, Nav, Content }