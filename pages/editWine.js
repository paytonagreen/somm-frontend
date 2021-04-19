import EditWine from '../components/EditWine'

export default function EditWinePage(props) {
    console.log(props)
    return (
        <>
        <EditWine id={props.query.id} />
        </>
    )
}