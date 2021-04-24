import Head from 'next/head';
import Nav from '../components/page/Nav';

import {GlobalStyle, ThemeProvider, theme, Content } from '../components/styles/AppStyles';

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
        <Nav />
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
