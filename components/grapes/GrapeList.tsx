import { useState } from 'react';

import { usePaginatedGrapes } from 'hooks/swr-hooks';

import ThingList from '../reusable/ThingList';
import ThingListStyles from '../styles/ThingListStyles';
import Loader from '../reusable/Loader';

interface AddProps {
  addable: boolean;
  addFn?: (id: number) => void;
}

const GrapeList: React.FC<AddProps> = ({ addable, addFn }) => {
  const [page, setPage] = useState(1);
  const { data } = usePaginatedGrapes(page, 8);

  if (!data)
    return (
      <ThingListStyles>
        <div className='content'>
          <Loader />
        </div>
      </ThingListStyles>
    );
  return (
    <ThingList
      title='All Grapes'
      data={data}
      specificData={data.grapes}
      url='/editGrape?id='
      page={page}
      setPage={setPage}
      addable={addable}
      addFn={addFn}
    />
  );
};

export default GrapeList;
