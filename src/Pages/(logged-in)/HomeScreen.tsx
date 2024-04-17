import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiCountUser, apiLogout } from '../../Services/Api/AlkareemApi/alkareemApi';
import Button from '../../Components/Ui/Button';
import { useEffect, useState } from 'react';
import { ICountUser } from '../../Types/Alkareem/GetTotalUserCount';

type Props = {};

const HomeScreen = (props: Props) => {
  const [totalUser, setTotalUser] = useState<ICountUser|null>(null)
  const { getItem, clearItem } = useLocalStorage()
  const navigate = useNavigate();
  const token = getItem('token')

  const handleSearch = (event: any) => {
    navigate(`/search`, { replace: false });
  };

  const handleLogout = (event: any) => {
    logout()
  };

  const logout = async () => {
    const logout = await apiLogout({ token: token })
    if (logout.status !== 200) {
      return;
    } else {
      clearItem()
      navigate(`/login`, { replace: true });
    }
  }

  const getTotalUser = async () => {
    const total = await apiCountUser({token: token})
    if (total.status !== 200) {
      return;
    } else {
      setTotalUser(total.data)
    }
  }

  useEffect(() => {
    getTotalUser()
  }, [token])

  return (
    <div className="p-4">
      <div>Total Jumlah Bani Abdul Karim: {totalUser?.data.totalUser}</div>
      <div>Total Jumlah KK Bani Abdul Karim: {totalUser?.data.totalFamily}</div>
      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomeScreen;