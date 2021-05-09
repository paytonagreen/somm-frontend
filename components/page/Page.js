import { useCurrentUser } from 'hooks/swr-hooks';

import Nav from 'components/page/Nav';
import { Content } from '../styles/AppStyles';
import LoadingNav from './LoadingNav';

export default function Page({ children }) {
  const { data } = useCurrentUser();

  if (!data)
    return (
      <>
        <LoadingNav />
        <Content>{children}</Content>
      </>
    );
  return (
    <>
      {data.user && <Nav />}
      <Content>{children}</Content>
    </>
  );
}
