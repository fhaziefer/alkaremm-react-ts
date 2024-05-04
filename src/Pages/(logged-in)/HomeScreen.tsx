import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import Button from '../../Components/Ui/Button';
import LayoutSideBlank from '../../Components/Layout/LayoutSideBlank';
import LogoutAlert from '../../Components/LogoutAlert';
import GreetingTime from '../../Components/Greetings/GreetingTime';
import { ICurrentUser } from '../../Types/Alkareem/RES/CurrentUser';
import { apiGetUserCurrent } from '../../Services/Api/AlkareemApi/get';
import Loading from '../../Components/Loading';
import CarouselCountUser from '../../Components/CountUser/CarouselCountUser';
import Footer from '../../Components/Footer';
import useAdminName from '../../Hooks/useAdminName';
import { FaSearch } from 'react-icons/fa';

type Props = {};

const HomeScreen = (props: Props) => {
  const { getItem } = useLocalStorage()
  const navigate = useNavigate();
  const adminName = useAdminName()
  const role = getItem('role')
  const token = getItem('token');
  const [userData, setUserData] = useState<ICurrentUser | null>(null)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (event: any) => {
    navigate(`/search`, { replace: false });
  };

  const handleDashboard = (event: any) => {
    navigate(`/admin/dashboard`, { replace: false });
  };

  // const handleAbout = (event: any) => {
  //   navigate(`/about`, { replace: true });
  // };

  const fetchData = async () => {
    setIsLoading(true)
    const fetch = await apiGetUserCurrent({ token: token })
    if (fetch.status !== 200) {
      setIsLoading(false)
      return
    } else {
      setIsLoading(false)
      setUserData(fetch.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [token])

  const searchItem = [
    {
      "item": "Nama"
    },
    {
      "item": "Bani"
    },
    {
      "item": "Orang Tua"
    },
    {
      "item": "Pasangan"
    },
    {
      "item": "Putra-putri"
    },
    {
      "item": "Alamat"
    },
    {
      "item": "Kontak"
    },
  ]

  return (
    <>
      {isLoading ?
        <Loading />
        :
        <LayoutSideBlank>
          <LogoutAlert
            open={logoutOpen}
          />
          {role !== 'USER' ?
            <div className="flex flex-col gap-4">
              <GreetingTime
                name={adminName}
              />
              <Button onClick={handleDashboard}>Dashboard</Button>
              <Button onClick={handleSearch}>Search</Button>
              <Button onClick={() => setLogoutOpen((prev) => !prev)}>
                Logout
              </Button>
              <CarouselCountUser
                label="Keluarga Besar Bani KH. Abdul Karim Lirboyo"
              />
            </div>
            :
            <div className="flex flex-col gap-2">
              <div className='flex flex-col'>
                <GreetingTime
                  name={userData?.data.profil?.name}
                />
                <h1 className='text-gray-600 -mt-4 text-4xl font-thin w-[70%]'>Apa yang bisa kami bantu hari ini?</h1>
              </div>
              <div className="space-y-8 lg:grid lg:grid-cols-1 sm:gap-6 xl:gap-10 lg:space-y-0 mt-4">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-gray-500 bg-base-200 shadow relative">
                  <h3 className="mb-4 text-2xl font-bold">
                    Daftar Anggota Keluarga Bani KH. Abdul Karim
                  </h3>
                  <p className="font-light text-md">
                    Lihat atau cari daftar anggota keluarga besar Bani KH. Abdul Karim Lirboyo Kediri.
                  </p>
                  <div className="flex justify-center items-baseline my-2">
                  </div>
                  <ul role="list" className="mb-20 space-y-3 text-left mb-20 text-sm">
                    {searchItem.map((data) => (
                      <li key={data.item} className="flex items-center space-x-3 ">
                        <FaSearch className="text-primary ml-1" />
                        <span>{data.item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleSearch} className="absolute bottom-6 right-6 left-6 cursor-pointer" variant="primary">Lihat Data</Button>
                </div>
              </div>
              <CarouselCountUser
                label="Keluarga Besar Bani KH. Abdul Karim Lirboyo"
              />
            </div>
          }
          <Footer />
        </LayoutSideBlank>}
    </>
  );
};

export default HomeScreen;