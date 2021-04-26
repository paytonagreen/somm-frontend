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
  const [currentUser, setCurrentUser ] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useUser(setIsAdmin, setCurrentUser);
  console.log(currentUser, isAdmin);

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
        <Nav currentUser={currentUser}/>
        <Content>
          <Component currentUser={currentUser} {...pageProps} />
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
