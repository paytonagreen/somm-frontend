import AccountWines from '@/components/accounts/wines/AccountWines';
import AddAccountWines from '@/components/accounts/wines/AddAccountWines';
import styled from 'styled-components';

import { CurrentUserProps } from 'types';

const AccountPageStyles = styled.div`
    width: 50vw;
    height: 75vh;
    display: flex;
    justify-content: space-around;
`

const AccountPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
    return (
        <AccountPageStyles>
            <AddAccountWines currentUser={currentUser} />
            <AccountWines currentUser={currentUser} />
        </AccountPageStyles>
    );
};

export default AccountPage;
