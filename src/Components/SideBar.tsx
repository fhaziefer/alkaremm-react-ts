import React from 'react';
import Button from './Ui/Button';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../Hooks/useLocalStorage';

interface SidebarProps { }

const SideBar: React.FC<SidebarProps> = () => {

    const { getItem } = useLocalStorage()

    const navigate = useNavigate();

    const id = getItem('id')

    const homeButton = () => {
        navigate('/', { replace: false });
    }

    const searchButton = () => {
        navigate('/search', { replace: false });
    }

    const profileButton = () => {
        navigate(`/profile`, { replace: false });
    }

    const settingButton = () => {
        navigate('/profile/setting', { replace: false });
    }

    return (
        <div
            className="md:w-24 lg:w-64 bg-gray-800 fixed top-0 left-0 h-full overflow-y-auto hidden md:block"
            style={{ position: "fixed" }}>
            <div className='flex flex-col items-start gap-4 p-4'>
                <Button onClick={homeButton} className='w-full'>Home</Button>
                <Button onClick={searchButton} className='w-full'>Search</Button>
                <Button onClick={profileButton} className='w-full'>Profile</Button>
                <Button onClick={settingButton} className='w-full'>Setting</Button>
            </div>
        </div>
    );
};

export default SideBar;