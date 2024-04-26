import useAdminName from "../../Hooks/useAdminName"

const AdminUserEditorScreen = () => {

    const adminName = useAdminName()
    
    return (
        <div>{adminName}</div>
    )
}

export default AdminUserEditorScreen