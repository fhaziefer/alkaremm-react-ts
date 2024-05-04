import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { env } from '../Utils/env';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import LogoutAlert from './LogoutAlert';
import { apiGetProfile } from '../Services/Api/AlkareemApi/get';

const Header = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [avatar, setAvatar] = useState('')
    const { getItem } = useLocalStorage()
    const token = getItem('token')
    const role = getItem('role')

    const baseUrl = env.REACT_APP_BASE_URL

    const fetchProfile = async () => {
        const userProfile = await apiGetProfile({ token })
        if (userProfile.status !== 200) {
            setAvatar('/images/asset/logo.png')
        } else {
            setAvatar(userProfile.data.data.avatar)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [token])

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

    const logoutHandler = () => {
        setModalOpen((prev) => !prev)
    }

    return (
        <div className="px-4 navbar bg-base-100 md:hidden lg:hidden">
            <LogoutAlert open={modalOpen} />
            <div className="flex-1">
                <a onClick={homeHandler} className="btn btn-ghost text-xl rounded-full hover:text-white">
                    <img className='w-7 mr-2' src={`${baseUrl}/images/asset/logo.png`}></img><span>Alkareem</span>
                </a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="rounded-full">
                            <img alt="User avatar" src={`${baseUrl}${avatar}`} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                        {role === 'USER' &&
                            <>
                                <li onClick={profileHandler}>
                                    <a className="justify-between">
                                        Profil
                                    </a>
                                </li>
                                <li onClick={settingHandler}><a>Pengaturan</a></li>
                            </>}
                        <li className='text-red-500' onClick={logoutHandler}><a>Keluar</a></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header