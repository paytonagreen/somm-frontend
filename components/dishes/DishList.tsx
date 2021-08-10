import { useState } from 'react';

import { usePaginatedDishes } from 'hooks/swr-hooks';

import ThingList from '../reusable/ThingList';
import ThingListStyles from '../styles/ThingListStyles';
import Loader from '../reusable/Loader';

interface AddProps {
  addable: boolean;
  addFn?: (id: number) => void;
}

const DishList: React.FC<AddProps> = ({ addable, addFn }) => {
  const [page, setPage] = useState(1);
  const { dishData } = usePaginatedDishes(page, 8);

  if (!dishData)
    return (
      <ThingListStyles>
        <div className='content'>
          <Loader />
        </div>
      </ThingListStyles>
    );
  return (
    <ThingList
      title='All Dishes'
      data={dishData}
      specificData={dishData.dishes}
      url='/editDish?id='
      page={page}
      setPage={setPage}
      addable={addable}
      addFn={addFn}
    />
  );
};

export default DishList;