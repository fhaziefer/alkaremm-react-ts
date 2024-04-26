import useAdminName from "../../Hooks/useAdminName"

const AdminUserCreatorScreen = () => {

    const adminName = useAdminName()

    return (
        <div>{adminName}</div>
    )
}

export default AdminUserCreatorScreen