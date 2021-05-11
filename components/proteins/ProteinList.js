import { useState } from 'react';

import { usePaginatedProteins } from 'hooks/swr-hooks';

import ThingList from '../reusable/ThingList';
import ThingListStyles from '../styles/ThingListStyles';
import Loader from '../reusable/Loader';

export default function ProteinList() {
  const [page, setPage] = useState(1);
  const { data } = usePaginatedProteins(page, 8);

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
      title='Proteins'
      data={data}
      specificData={data.proteins}
      page={page}
      setPage={setPage}
    />
  );
}
