import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {}

const AdminRoute = (props: Props) => {
    const { authenticated, isAdmin } = useContext(AuthContext)

    if (!authenticated && !isAdmin) return <Navigate to='login' replace />
    return <Outlet />
}

export default AdminRoute