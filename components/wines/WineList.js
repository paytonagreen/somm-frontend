import { useState } from 'react';

import { usePaginatedWines } from 'hooks/swr-hooks';

import ThingList from '../reusable/ThingList';
import ThingListStyles from '../styles/ThingListStyles';
import Loader from '../reusable/Loader';

export default function WineList() {
  const [page, setPage] = useState(1);
  const { data } = usePaginatedWines(page, 8);
  
  if (!data) return (
      <ThingListStyles>
        <div className='content'>
          <Loader />
        </div>
      </ThingListStyles>
    );
    console.log(data);
  return (
    <ThingList
      title="Wines"
      data={data}
      specificData={data.wines}
      url='/editWines?id='
      page={page}
      setPage={setPage}
    />
  );
}
