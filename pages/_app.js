import Head from 'next/head';

import {
  GlobalStyle,
  ThemeProvider,
  theme,
  Content,
} from 'components/styles/AppStyles';
import { useCurrentUser } from 'hooks/swr-hooks';

import Page from 'components/page/Page';

import LoadingNav from 'components/page/LoadingNav';
import Loader from 'components/reusable/Loader';

function MyApp({ Component, pageProps }) {
  const { data } = useCurrentUser();

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
          <meta
            name='description'
            content='We help you pick the right wine -- pair by sauce, protein, or both! We do the hard stuff -- you just sit back, enjoy, and impress your date, friends, or family!'
          />
        </Head>
        <Page>
          {!data && <Loader/>}
          {data && <Component currentUser={data.user} {...pageProps} />}
        </Page>
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
