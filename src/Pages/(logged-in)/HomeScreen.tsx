import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiLogout } from '../../Services/Api/AlkareemApi/alkareemApi';
import Button from '../../Components/Ui/Button';

type Props = {};

const HomeScreen = (props: Props) => {
  const { getItem, clearItem } = useLocalStorage()
  const navigate = useNavigate();
  const token = getItem('token')

  const handleSearch = (event: any) => {
    navigate(`/search`, { replace: false });
  };

  const handleLogout = (event: any) => {
    logout()
  };

  const logout = async () =>{
    const logout = await apiLogout({token: token})
    if (logout.status !== 200) {
      return;
    } else {
      clearItem()
      navigate(`/login`, { replace: true });
    }
  }

  return (
    <div className="p-4">
      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomeScreen;