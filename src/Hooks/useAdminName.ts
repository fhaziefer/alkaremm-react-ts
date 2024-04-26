import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

const useAdminName = () => {
    const { getItem } = useLocalStorage();
    const adminToken = getItem('token');
    const role = getItem('role');
    const navigate = useNavigate();

    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        if (role === 'USER') {
            navigate('/', { replace: false });
        }

        if (role === 'ADMIN') {
            setAdminName('Super User');
        } else if (role === 'KOORHANNAH') {
            setAdminName('Koordinator Bani Hannah');
        } else if (role === 'KOORSALAMAH') {
            setAdminName('Koordinator Bani Salamah');
        } else if (role === 'KOORAISYAH') {
            setAdminName('Koordinator Bani Aisyah');
        } else if (role === 'KOORMARYAM') {
            setAdminName('Koordinator Bani Maryam');
        } else if (role === 'KOORZAINAB') {
            setAdminName('Koordinator Bani Zainab');
        } else if (role === 'KOORQOMARIYAH') {
            setAdminName('Koordinator Bani Maryam');
        }
    }, [role, adminToken, navigate]);

    return adminName;
};

export default useAdminName;