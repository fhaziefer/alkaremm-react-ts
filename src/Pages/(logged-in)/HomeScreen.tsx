import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Ui/Button';
import axios from 'axios';
import { TypeUsers } from '../../Types/Alkareem/GetAllUserRes';
import Input from '../../Components/Ui/Input';

type Props = {};

const HomeScreen = (props: Props) => {
  const [users, setUsers] = useState<TypeUsers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login', { replace: true });
  };

  const fetchUsers = async () => {
    try {
      const url = 'http://localhost:300/user/search?keyword=%&page=2';
      const headers = {
        Authorization: '73ca199b-5173-42a5-b674-44cb2c6ab6c3',
      };
      const response = await axios.get<TypeUsers>(url, { headers });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <div className='flex flex-col gap-2 justify-between items-center text-center'>
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <div className='prose'>
            {users?.data.map((user) => (
              <div className='flex flex-col justify-between items-center border-b-2' key={user.id}>
                <img className='w-20 h-20 rounded-full' src={`${process.env.REACT_APP_BASE_URL}${user.profil.avatar}`} />
                <strong>{user.username}</strong>
                <p>{user.profil.name}</p>
                <i>{user.profil.address?.city} </i>
                <b>{user.profil.address?.province}</b>
              </div>
            ))}
          </div>
        )}
        <Button onClick={handleClick} variant='primary'>Login</Button>
      </div>
  );
};

export default HomeScreen;