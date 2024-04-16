import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LogoutAlert from './LogoutAlert';

const Header = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const navigate = useNavigate();

    const homeHandler = () => {
        navigate('/', { replace: true })
    }

    const profileHandler = () => {
        navigate('/profile', { replace: true })
    }

    const settingHandler = () => {
        navigate('/profile/setting', { replace: true })
    }

    const handleAdress = (
        street: string,
        village: string,
        district: string,
        city: string,
        province: string,
        postal: string) => {
        console.log(street, village, district, city, province, postal)
        setModalOpen((prev) => !prev)
    }

    const logoutHandler = () => {
        setModalOpen((prev) => !prev)
    }

    return (
        <div className="px-4 navbar bg-base-100 md:hidden lg:hidden">
            <LogoutAlert open={modalOpen}/>
            <div className="flex-1">
                <a onClick={homeHandler} className="btn btn-ghost text-xl rounded-full hover:text-white">Alkareem</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="rounded-full">
                            <img alt="User avatar" src="http://localhost:300/images/avatar/male.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li onClick={profileHandler}>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li onClick={settingHandler}><a>Settings</a></li>
                        <li onClick={logoutHandler}><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header