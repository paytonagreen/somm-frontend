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

const Content = styled.div`
  background-color: #80304c;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffc47d;
  margin-top: -4rem;
`;

export { GlobalStyle, ThemeProvider, theme, Content };
