import { useWine } from '../hooks/swr-hooks';

import EditWineForm from './EditWineForm';

export default function EditWine({ id }) {
  const { data, isLoading } = useWine(id);

  console.log(id);

  if (isLoading) return 'Loading...';
  return <EditWineForm data={data} id={id} />;
}
