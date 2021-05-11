import { useState } from 'react';

import {usePaginatedSauces } from 'hooks/swr-hooks';

import ThingList from '../reusable/ThingList';
import ThingListStyles from '../styles/ThingListStyles';
import Loader from '../reusable/Loader';


export default function SauceList({ sauces }) {
  const [page, setPage] = useState(1);
  const { data } = usePaginatedSauces(page, 8);

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
      title='Sauces'
      data={data}
      specificData={data.sauces}
      page={page}
      setPage={setPage}
    />
  );
}
