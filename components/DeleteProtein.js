import DeleteButton from "./styles/DeleteButton";

export default function DeleteProtein({setDeleteMessage,  api, headers, id }) {

  function deleteProtein() {
    fetch(`${api}/proteins/${id}`, {
      method: `DELETE`,
      headers
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        setDeleteMessage('Protein deleted!')
      });
  }

  return <DeleteButton onClick={deleteProtein}>Delete</DeleteButton>;
}
