import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Item } from 'types';

interface ThingListItemProps {
  url: string;
  item: Item;
  addFn?: (id: number) => void;
  addable?: boolean;
  deleteable?: boolean;
  deleteFn?: (id: number) => void;
}

const ThingListItemStyles = styled.li`
  display: flex;
  width: 110%;
  flex-direction: row;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  button {
    height: 1rem;
    width: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: ${props => props.theme.colors.beauj};
    color: ${props => props.theme.colors.chard};
  }
`

const ThingListItem: React.FC<ThingListItemProps> = ({
  item,
  addable,
  addFn,
  deleteable,
  deleteFn,
  url,
}) => {
  const fireAddFn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    addFn(item.id);
  };
  const fireDeleteFn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this?')) {
      deleteFn(item.id);
    }
  }

  console.log(deleteable);
  return (
    <ThingListItemStyles>
      <a key={item.id} href={`${url}${item.id}`}>
        {item.name}
      </a>
      {addable && <button onClick={fireAddFn}><span>+</span></button>}
      {deleteable && <button onClick={fireDeleteFn}>-</button>}
    </ThingListItemStyles>
  );
};

export default ThingListItem;