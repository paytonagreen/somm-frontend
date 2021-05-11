import ListButton from '../styles/ListButton';
import ThingListStyles from '../styles/ThingListStyles';

export default function ThingList({
  title,
  data,
  specificData,
  url,
  page,
  setPage,
}) {
  const pageUp = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };
  const pageDown = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };
  return (
    <ThingListStyles>
      <div className='content'>
        <h2>All {title}</h2>
        {specificData &&
          specificData.map((item) => {
            if (url) return (
              <a key={item.id} href={`${url}${item.id}`}>
                {item.name}
              </a>
            )
            else return (
              <p key={item.id}>{item.name}</p>
            )
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
}
