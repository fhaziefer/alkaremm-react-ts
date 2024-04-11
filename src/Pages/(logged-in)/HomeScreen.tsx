import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TypeUsers } from '../../Types/Alkareem/GetAllUserRes';
import UserTable from '../../Components/UserTable';
import { env } from '../../Utils/env';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

type Props = {};

const HomeScreen = (props: Props) => {
  const [users, setUsers] = useState<TypeUsers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login', { replace: true });
  };
  const handleClick2 = () => {
    navigate('/profile/users', { replace: true });
  };

  const fetchUsers = async () => {
    try {
      const url = `${env.REACT_APP_BASE_URL}/user/search?keyword=%&page=1`;
      const headers = {
        Authorization: '183e3653-8df5-4438-8cd1-c15c071722f0',
      };
      const response = await axios.get<TypeUsers>(url, { headers });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (

    <div className="flex min-h-screen">
      {/* Left Column (Sticky with Fixed Height) */}
      <div
        className="sticky left-0 top-0 bottom-0 w-64 h-screen bg-gray-800 text-white overflow-auto p-4 hidden md:block"
        style={{ position: "fixed" }}
      >
        Kolom Kiri (Sticky)
      </div>

      {/* Center Column (Scrollable Content) with max-width and flexbox */}
      <div className="flex-grow overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 px-2">
        <div className="flex flex-col min-h-screen justify-content-center items-center"> {/* Centered Content */}
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <div>
              {users?.data.map((user) => (
                <UserTable
                isAdmin={isAdmin}
                key={user.id}
                name={user.profil.name}
                bani={user.profil.bani.bani_name}
                avatar={`${process.env.REACT_APP_BASE_URL}${user.profil.avatar}`}
                username={user.username}/>
              ))}
              <Footer/>
            </div>
          )}
        </div>
      </div>

      {/* Right Column (Sticky with Fixed Height) */}
      <div
        className="sticky right-0 top-0 bottom-0 w-64 h-screen bg-gray-800 text-white overflow-auto p-4 hidden md:block"
        style={{ position: "fixed" }}
      >
        Kolom Kanan (Sticky)
      </div>
    </div>
  );
};

export default HomeScreen;