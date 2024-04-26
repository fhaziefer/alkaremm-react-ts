import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import Button from '../../Components/Ui/Button';
import LayoutSideBlank from '../../Components/Layout/LayoutSideBlank';
import LogoutAlert from '../../Components/LogoutAlert';

type Props = {};

const HomeScreen = (props: Props) => {
  const { getItem, clearItem } = useLocalStorage()
  const navigate = useNavigate();
  const token = getItem('token')
  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleSearch = (event: any) => {
    navigate(`/search`, { replace: false });
  };

  const handleDashboard = (event: any) => {
    navigate(`/admin/dashboard`, { replace: false });
  };

  const handleAbout = (event: any) => {
    navigate(`/about`, { replace: true });
  };

  return (
    <LayoutSideBlank>
      <LogoutAlert
        open={logoutOpen}
      />
      <div className="flex flex-col gap-4">
        <Button onClick={handleAbout}>About</Button>
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleDashboard}>Dashboard</Button>
        <Button onClick={() => setLogoutOpen((prev) => !prev)}>Logout</Button>
      </div>
    </LayoutSideBlank>
  );
};

export default HomeScreen;