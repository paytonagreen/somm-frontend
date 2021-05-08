import Head from 'next/head';
import { useState } from 'react';

import {
  GlobalStyle,
  ThemeProvider,
  theme,
  Content,
} from '../components/styles/AppStyles';
import useUser from '../hooks/useUser';

import Nav from '../components/page/Nav';

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState();

  useUser(setCurrentUser);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            rel='preload'
            as='style'
            href='https://fonts.googleapis.com/css2?family=Orelega+One&display=swap'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Orelega+One&display=swap'
            media='print'
            onload="this.media='all'"
          />
          <title>A Somm For You</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Content>
          <Component
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            {...pageProps}
          />
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
