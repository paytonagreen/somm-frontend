import { MouseEventHandler } from 'react';
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

interface Props {
  title: string;
  data: WinesData | ProteinsData | SaucesData;
  specificData: WinesArray | ProteinsArray | SaucesArray;
  url?: string;
  page: number;
  setPage: (page: number) => void;
}

const ThingList: React.FC<Props> = ({
  title,
  data,
  specificData,
  url,
  page,
  setPage,
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
        <h2>All {title}</h2>
        {specificData &&
          specificData.map((item: Item) => {
            if (url)
              return (
                <a key={item.id} href={`${url}${item.id}`}>
                  {item.name}
                </a>
              );
            else return <p key={item.id}>{item.name}</p>;
          })}
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
