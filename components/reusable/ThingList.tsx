import React, { MouseEventHandler } from 'react';
import {
  Item,
  WinesData,
  ProteinsData,
  SaucesData,
  WinesArray,
  ProteinsArray,
  SaucesArray,
} from 'types';
import ListButton from '../styles/ListButton';
import ThingListStyles from '../styles/ThingListStyles';
import ThingListItem from './ThingListItem';

interface Props {
  title: string;
  data: WinesData | ProteinsData | SaucesData;
  specificData: WinesArray | ProteinsArray | SaucesArray;
  url?: string;
  page: number;
  setPage: (page: number) => void;
  addable?: boolean;
  addFn?: (id: number) => void;
  deleteable?: boolean;
  deleteFn?: (id: number) => void;
}

const ThingList: React.FC<Props> = ({
  title,
  data,
  specificData,
  url,
  page,
  setPage,
  addable,
  addFn,
  deleteable,
  deleteFn,
}) => {
  const pageUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };
  const pageDown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  return (
    <ThingListStyles>
      <div className='content'>
        <h2>{title}</h2>
        <ul>
          {specificData &&
            specificData.map((item: Item) => {
              if (url)
                return (
                  <ThingListItem
                    item={item}
                    url={url}
                    addable={addable}
                    deleteable={deleteable}
                    addFn={addFn}
                    deleteFn={deleteFn}
                  />
                );
              else return <p key={item.id}>{item.name}</p>;
            })}
        </ul>
      </div>
      <div className='buttons'>
        {data && page > 1 && (
          <ListButton onClick={pageDown}>Previous</ListButton>
        )}
        {data && page < data.total_pages && (
          <ListButton onClick={pageUp}>Next</ListButton>
        )}
      </div>
    </ThingListStyles>
  );
};

export default ThingList;
