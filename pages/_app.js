import Head from 'next/head';
import Link from 'next/link';

import {GlobalStyle, theme, Nav, Content } from './AppStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Orelega+One&display=swap'
            rel='stylesheet'
          />
          <title>A Somm For You</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav>
          <Link href='/'>
            <a>
              <h1>A Somm For You</h1>
            </a>
          </Link>
          <Link href='/pairing'>
            <a>
              <p>Pairing</p>
            </a>
          </Link>
          <Link href='/addProtein'>
            <a>
              <p>Add Protein</p>
            </a>
          </Link>
          <Link href='/addWine'>
            <a>
              <p>Add Wine</p>
            </a>
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
