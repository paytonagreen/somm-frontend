import EditWine from '../components/EditWine'

export default function EditWinePage(props) {
    return (
        <EditWine id={props.query.id} />
    )
}