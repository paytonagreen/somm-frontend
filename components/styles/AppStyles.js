import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Orelega One', cursive;
    src: url("/static/fonts/OrelegaOne-Regular.ttf") format('tff');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
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

//TODO: Mobile (margin?)

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
  @media (max-width: 700px) {
    margin-top: -2rem;
  }
`;

export { GlobalStyle, ThemeProvider, theme, Content };
