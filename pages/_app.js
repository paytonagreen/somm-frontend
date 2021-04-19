import Head from "next/head";
import Link from "next/link";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

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
    primary: "#0070f3",
    beauj: "#80304c",
    chard: "#ffc47d",
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
  justify-content: center;
  color: #80304c;
  background-color: #ffc47d;
  margin-botton: 2rem;
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
  margin-top: 4rem;
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Orelega+One&display=swap"
            rel="stylesheet"
          />
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav>
          <Link href="/">
            <a><h1>A Somm For You</h1></a>
          </Link>
        </Nav>
        <Content>
          <Component {...pageProps} />
        </Content>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  //This exposes the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp;
