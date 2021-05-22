import ResetPassword from 'components/userFlow/ResetPassword';
import { CurrentUserAndQueryProps } from 'types';

const ResetPasswordPage: React.FC<CurrentUserAndQueryProps> = (props) => {
  const token = props.query.token;
  return <ResetPassword token={token} />;
};

export default ResetPasswordPage;
