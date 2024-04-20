import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { apiCountUser } from '../Services/Api/AlkareemApi/get';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';

const UserRoute = () => {
    const { getItem, clearItem } = useLocalStorage();
    const { authenticated, setAuthenticated, setIsAdmin } = useContext(AuthContext);
    const token = getItem('token');
    const location = useLocation();
    const navigate = useNavigate();

    const getTotalUser = async () => {
        try {
            const total = await apiCountUser({ token });
            if (total === 'Unauthorized') {
                setIsAdmin(false);
                setAuthenticated(false);
                clearItem();
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching total user:', error);
        }
    };

    useEffect(() => {
        getTotalUser();
    }, [location.pathname]);

    if (!authenticated) {
        navigate('/login');
    }

    return (
        <div>
            <SideBar />
            <Header />
            <div className='ml-0 md:ml-24 lg:ml-64'>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserRoute;
