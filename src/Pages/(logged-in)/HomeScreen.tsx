import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISearchUsers } from '../../Types/Alkareem/GetAllUserRes';
import UserTable from '../../Components/UserTable';
import Footer from '../../Components/Footer';
import Loading from '../../Components/Loading';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiSearchUser } from '../../Services/Api/AlkareemApi/alkareemApi';
import Input from '../../Components/Ui/Input';

type Props = {};

const HomeScreen = (props: Props) => {
  const [users, setUsers] = useState<ISearchUsers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isError, setIsError] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const { getItem } = useLocalStorage()
  const navigate = useNavigate();

  const handleQuery = (event: any) => {
    const inputQuery = event.value.toLowerCase()
    setQuery(inputQuery);
  };

  const next = () => {
    setIsLoading(true)
    if (page === totalPage) return;
    setPage(page + 1);
  };

  const prev = () => {
    setIsLoading(true)
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleProfile = (event: any) => {
    const value = event.currentTarget.getAttribute('id')
    // alert(`Profile ${value}`)
    navigate(`/profile/${value}`, { replace: false });
  };

  const handleEdit = (event: any) => {
    const value = event.currentTarget.getAttribute('id')
    alert(`Edit ${value}`)
    // navigate(`/profile/${value}`, { replace: false });
  };

  const handleDelete = (event: any) => {
    const value = event.currentTarget.getAttribute('id')
    alert(`Delete ${value}`)
    // navigate(`/profile/${value}`, { replace: false });
  };

  useEffect(() => {
    const admin = getItem('role')
    if (admin !== 'USER') {
      setIsAdmin(true)
    }
  }, [])

  const fetchUsers = async () => {
    const token = getItem('token')
    const users = await apiSearchUser({ token: token, query: query, page: page })
    if (users.status !== 200) {
      setIsError(true)
      setIsLoading(false)
    } else {
      setUsers(users.data)
      setTotalPage(users.data.paging.total_page)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [query, page]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 px-2">
        <div className="flex flex-col min-h-screen justify-content-center items-center">
        <div className='flex items-center justify-center w-72'>
                <Input placeholder='Nama, bani, alamat...' onChange={(e) =>
                  handleQuery(
                    (e.target as HTMLInputElement)
                  )
                } />
              </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='flex flex-col items-center justify-center'>
              
              {users?.data.map((user) => (
                <div key={user.id} className='flex items-center justify-center w-auto'>
                  <UserTable
                    id={user.id}
                    isAdmin={isAdmin}
                    profileButton={handleProfile}
                    editButton={handleEdit}
                    deleteButton={handleDelete}
                    key={user.id}
                    name={user.profil.name}
                    bani={user.profil.bani.bani_name}
                    avatar={`${process.env.REACT_APP_BASE_URL}${user.profil.avatar}`}
                    username={user.username} />
                </div>
              ))}
              <div className="join grid grid-cols-2 mx-4">
                {page !== 1
                  ? <button onClick={prev} className="join-item btn btn-outline">Previous page</button>
                  : <button disabled className="join-item btn btn-outline">Previous page</button>
                }
                {page !== totalPage
                  ? <button onClick={next} className="join-item btn btn-outline">Next page</button>
                  : <button disabled className="join-item btn btn-outline">Next page</button>
                }
              </div>
              <div className='w-[100%]'>
                <Footer />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;