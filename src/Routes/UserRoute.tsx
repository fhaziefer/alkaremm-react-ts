import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'

type Props = {}

const UserRoute = (props: Props) => {
    const { authenticated } = useContext(AuthContext)

    if (!authenticated) {
        return <Navigate to='login' replace />
    }
    return (
        <div>
            <SideBar />
            <Header/>
            <div className='ml-0 md:ml-24 lg:ml-64'>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserRoute