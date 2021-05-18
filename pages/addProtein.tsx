import AllProteins from 'components/proteins/AllProteins';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';
import { CurrentUserProps } from 'types';

const AddProteinPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AllProteins />
    </PleaseSignIn>
  );
};

export default AddProteinPage;
