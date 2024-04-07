import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {}

const AdminRoute = (props: Props) => {
    const { authenticated, admin } = useContext(AuthContext)

    if (!authenticated && !admin) return <Navigate to='login' replace />
    return <Outlet />
}

export default AdminRoute