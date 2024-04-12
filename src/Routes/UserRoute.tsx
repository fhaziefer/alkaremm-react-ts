import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'

type Props = {}

const UserRoute = (props: Props) => {
    const { authenticated } = useContext(AuthContext)

    if (!authenticated) {
        return <Navigate to='login' replace />
    }
    return (
        <div>
            <SideBar />
            <div className='flex-grow overflow-x-auto p-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserRoute