import { useEffect, useState } from "react";

import EditWineForm from './EditWineForm';

export default function EditWine({props, id}) {
  const [data, setData] = useState();

  const {api, headers } = props;

  useEffect(() => {
    const url = `${api}/wines/${id}`;
    const options = {
      method: "GET",
      headers
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) return <p>Loading...</p>
  if (data) {
      return (
          <EditWineForm props={props} id={id} data={data}/>
  );
}
}
