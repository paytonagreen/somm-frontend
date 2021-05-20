import { useWine } from 'hooks/swr-hooks';

import EditGrapeForm from './EditGrapeForm';
import Loader from '../reusable/Loader';

interface Props {
  id: number;
}

const EditGrape: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useWine(id);

  if (isLoading) return <Loader />;
  return <EditGrapeForm data={data} id={id} />;
}

export default EditGrape;