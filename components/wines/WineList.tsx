import { useState } from 'react';

import { usePaginatedWines } from 'hooks/swr-hooks';

import ThingList from '../reusable/ThingList';
import ThingListStyles from '../styles/ThingListStyles';
import Loader from '../reusable/Loader';

interface AddProps {
  addable: boolean;
  addFn?: (id: number) => void;
}

const WineList: React.FC<AddProps> = ({ addable, addFn }) => {
  const [page, setPage] = useState(1);
  const { data } = usePaginatedWines(page, 8);

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
      title='All Wines'
      data={data}
      specificData={data.wines}
      url='/editWine?id='
      page={page}
      setPage={setPage}
      addable={addable}
      addFn={addFn}
    />
  );
};

export default WineList;
