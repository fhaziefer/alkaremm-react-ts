import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {}

const UserRoute = (props: Props) => {
    const { authenticated } = useContext(AuthContext)

    if (!authenticated) return <Navigate to='login' replace />
    return <Outlet />
}

export default UserRoute