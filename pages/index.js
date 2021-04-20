import ProteinDisplay from "../components/ProteinDisplay";

export default function Home({api, headers}) {
  return (
        <ProteinDisplay api={api} headers={headers}/>
  );
}
