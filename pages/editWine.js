import EditWine from '../components/EditWine'

export default function EditWinePage(props) {
    return (
        <EditWine props={props} id={props.query.id} />
    )
}