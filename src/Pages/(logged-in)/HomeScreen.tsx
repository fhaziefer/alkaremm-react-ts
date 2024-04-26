import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiCountUser } from '../../Services/Api/AlkareemApi/get';
import Button from '../../Components/Ui/Button';
import { useEffect, useState } from 'react';
import { apiLogout } from '../../Services/Api/AlkareemApi/delete';
import { ICountTotalUsers } from '../../Types/Alkareem/RES/CountUser';
import LayoutSideBlank from '../../Components/Layout/LayoutSideBlank';

type Props = {};

const HomeScreen = (props: Props) => {
  const [totalUser, setTotalUser] = useState<ICountTotalUsers | null>(null)
  const { getItem, clearItem } = useLocalStorage()
  const navigate = useNavigate();
  const token = getItem('token')

  const handleSearch = (event: any) => {
    navigate(`/search`, { replace: false });
  };

  const handleAbout = (event: any) => {
    navigate(`/about`, { replace: true });
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
    const total = await apiCountUser({ token: token })
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
    <LayoutSideBlank>
      <div className="p-4">
        <div>Total Jumlah Bani Abdul Karim: {totalUser?.data.totalUser}</div>
        <div>Total Jumlah KK Bani Abdul Karim: {totalUser?.data.totalFamily}</div>
        <Button onClick={handleAbout}>About</Button>
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </LayoutSideBlank>
  );
};

export default HomeScreen;