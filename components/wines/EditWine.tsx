import { useWine } from 'hooks/swr-hooks';

import EditWineForm from './EditWineForm';
import Loader from '../reusable/Loader';
import WineGrapes from './WineGrapes';
import styled from 'styled-components';
import React, { useState } from 'react';
import GrapeList from '../grapes/GrapeList';
import { headers, myFetch } from 'lib/utils';

interface Props {
  id: number;
}

const EditWineStyles = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
`;

const EditWine: React.FC<Props> = ({ id }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const [, setSuccessMessage] = useState('');
  const [, setErrorMessage] = useState('');

  const { wine, isLoading } = useWine(id);

  const wineId = id;

  async function addWineGrape(id: number) {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = 'api/grapes_wines';
      const options = {
        body: JSON.stringify({
          wine_id: wineId,
          grape_id: id,
        }),
        method: 'POST',
        headers,
      };
      const mutateString = url;
      await myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage
      );
    }
  }

  if (isLoading) return <Loader />;
  return (
    <EditWineStyles>
      <EditWineForm data={wine} id={id} />
      <GrapeList addable={true} addFn={addWineGrape} />
      <WineGrapes wine={wine} />
    </EditWineStyles>
  );
};

export default EditWine;
