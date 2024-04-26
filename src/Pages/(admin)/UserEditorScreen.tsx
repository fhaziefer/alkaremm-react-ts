import { useEffect } from "react"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"

const UserEditorScreen = () => {
    const { getItem } = useLocalStorage()
    const role = getItem('role')
    const navigate = useNavigate();

    //* CHECK ADMIN STATUS
    useEffect(() => {
        if (role === 'USER') {
            navigate('/', { replace: false });
        }
    }, [role])
    return (
        <div>UserEditorScreen</div>
    )
}

export default UserEditorScreen