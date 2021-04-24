import { useWine } from '../../hooks/swr-hooks';

import EditWineForm from './EditWineForm';

export default function EditWine({ id }) {
  const { data, isLoading } = useWine(id);

  if (isLoading) return <p>'Loading...'</p>;
  return <EditWineForm data={data} id={id} />;
}
