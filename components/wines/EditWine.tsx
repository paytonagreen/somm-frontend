import { useWine } from 'hooks/swr-hooks';

import EditWineForm from './EditWineForm';
import Loader from '../reusable/Loader';

interface Props {
  id: number;
}

const EditWine: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useWine(id);

  if (isLoading) return <Loader />;
  return <EditWineForm data={data} id={id} />;
}

export default EditWine;