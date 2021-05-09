import Nav from 'components/page/Nav';
import { Content } from '../styles/AppStyles';

export default function Page({ children, currentUser }) {
  return (
    <>
      <Nav currentUser={currentUser} />
      <Content>{children}</Content>
    </>
  );
}
