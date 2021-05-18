import Head from 'next/head';
import App from 'next/app';
import type { AppProps, AppContext } from 'next/app';

import { GlobalStyle, ThemeProvider, theme } from 'components/styles/AppStyles';
import { useCurrentUser } from 'hooks/swr-hooks';

import Page from 'components/page/Page';

import Loader from 'components/reusable/Loader';

function MyApp({ Component, pageProps }: AppProps) {
  const { data } = useCurrentUser();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <title>A Somm For You</title>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='We help you pick the right wine -- pair by sauce, protein, or both! We do the hard stuff -- you just sit back, enjoy, and impress your date, friends, or family!'
          />
        </Head>
        <Page>
          {!data && <Loader />}
          {data && <Component currentUser={data.user} {...pageProps} />}
        </Page>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const query = appContext.ctx.query;
  return {
    pageProps: {
      query
    }};
};

export default MyApp;
