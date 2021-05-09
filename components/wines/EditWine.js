import { useWine } from 'hooks/swr-hooks';

import EditWineForm from './EditWineForm';
import Loader from '../reusable/Loader';

export default function EditWine({ id }) {
  const { data, isLoading } = useWine(id);

  if (isLoading) return <Loader />;
  return <EditWineForm data={data} id={id} />;
}
