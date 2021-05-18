import WineLoaderStyles from '../styles/WineLoaderStyles';

export default function Loader() {
  return (
    <WineLoaderStyles>
      <p>Loading...</p>

      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className='wineglass left'>
        <div className='top'></div>
      </div>
      <div className='wineglass right'>
        <div className='top'></div>
      </div>
    </WineLoaderStyles>
  );
}
