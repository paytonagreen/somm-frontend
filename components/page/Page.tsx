import { useCurrentUser } from 'hooks/swr-hooks';

import Nav from 'components/page/Nav';
import { Content } from '../styles/AppStyles';
import LoadingNav from './LoadingNav';

interface Props {
  children: JSX.Element[];
}

const Page: React.FC<Props> = ({ children }) => {
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
      <Nav />
      <Content>{children}</Content>
    </>
  );
};

export default Page;
