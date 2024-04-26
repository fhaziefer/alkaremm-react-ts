import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiSearchUser } from '../../Services/Api/AlkareemApi/get';
import UserTable from '../../Components/Search/UserTable';
import Footer from '../../Components/Footer';
import Loading from '../../Components/Loading';
import baniName from '../../JSON/baniName.json'
import Input from '../../Components/Ui/Input';
import { useDebounce } from '../../Hooks/useDebounce';
import { ISearchUser } from '../../Types/Alkareem/RES/SearchUser';

const SearchScreen = () => {
  const [users, setUsers] = useState<ISearchUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isError, setIsError] = useState(false)
  const [query, setQuery] = useState('')
  const [baniQuery, setBaniQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const { getItem } = useLocalStorage()
  const navigate = useNavigate();
  const token = getItem('token')
  const profileId = getItem('id')
  const role = getItem('role')

  const debouncedQuery = useDebounce(query)

  const handleQuery = (event: any) => {
    const inputQuery = event.value.toLowerCase()
    setQuery(inputQuery)
    setPage(1)
  };

  const handleOption = (event: any) => {
    const selectedItem = event.value.toLowerCase()
    setBaniQuery(selectedItem);
  }

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
    if (role !== 'USER') {
      navigate(`/admin/edit/${value}`, { replace: false })
    } else {
      if (value !== profileId) {
        navigate(`/${value}`, { replace: false });
      } else {
        navigate(`/profile`, { replace: false })
      }
    }
  };

  const handleEdit = (event: any) => {
    const value = event.currentTarget.getAttribute('id')
    navigate(`/admin/edit/${value}`, { replace: false })
  };

  const handleDelete = (event: any) => {
    const value = event.currentTarget.getAttribute('id')
    navigate(`/admin/edit/${value}`, { replace: false })
  };

  const fetchUsers = async () => {
    setIsLoading(true)
    const users = await apiSearchUser({ token: token, bani: baniQuery, query: debouncedQuery, page: page })
    if (users.status !== 200) {
      setIsError(true)
      setIsLoading(false)
    } else {
      setUsers(users.data)
      setTotalPage(users.data.paging.total_page)
      setIsLoading(false)
    }
  };

  const fetchUsersHannah = async () => {
    setIsLoading(true)
    const users = await apiSearchUser({ token: token, bani: 'hannah', query: debouncedQuery, page: page })
    if (users.status !== 200) {
      setIsError(true)
      setIsLoading(false)
    } else {
      setUsers(users.data)
      setTotalPage(users.data.paging.total_page)
      setIsLoading(false)
    }
  };

  const fetchUsersSalamah = async () => {
    setIsLoading(true)
    const users = await apiSearchUser({ token: token, bani: 'salamah', query: debouncedQuery, page: page })
    if (users.status !== 200) {
      setIsError(true)
      setIsLoading(false)
    } else {
      setUsers(users.data)
      setTotalPage(users.data.paging.total_page)
      setIsLoading(false)
    }
  };

  const fetchUsersAisyah = async () => {
    setIsLoading(true)
    const users = await apiSearchUser({ token: token, bani: 'aisyah', query: debouncedQuery, page: page })
    if (users.status !== 200) {
      setIsError(true)
      setIsLoading(false)
    } else {
      setUsers(users.data)
      setTotalPage(users.data.paging.total_page)
      setIsLoading(false)
    }
  };

  const fetchUsersMaryam = async () => {
    setIsLoading(true)
    const users = await apiSearchUser({ token: token, bani: 'maryam', query: debouncedQuery, page: page })
    if (users.status !== 200) {
      setIsError(true)
      setIsLoading(false)
    } else {
      setUsers(users.data)
      setTotalPage(users.data.paging.total_page)
      setIsLoading(false)
    }
  };

  const fetchUsersZainab = async () => {
    setIsLoading(true)
    const users = await apiSearchUser({ token: token, bani: 'zainab', query: debouncedQuery, page: page })
    if (users.status !== 200) {
      setIsError(true)
      setIsLoading(false)
    } else {
      setUsers(users.data)
      setTotalPage(users.data.paging.total_page)
      setIsLoading(false)
    }
  };

  const fetchUsersQomariyah = async () => {
    setIsLoading(true)
    const users = await apiSearchUser({ token: token, bani: 'qomariyah', query: debouncedQuery, page: page })
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
    if (role !== 'USER') {
      setIsAdmin(true)
    }

    if (role === 'KOORHANNAH') {
      fetchUsersHannah()
    } else if (role === 'KOORSALAMAH') {
      fetchUsersSalamah()
    } else if (role === 'KOORAISYAH') {
      fetchUsersAisyah()
    } else if (role === 'KOORMARYAM') {
      fetchUsersMaryam()
    } else if (role === 'KOORZAINAB') {
      fetchUsersZainab()
    } else if (role === 'KOORQOMARIYAH') {
      fetchUsersQomariyah()
    } else {
      fetchUsers();
    }

  }, [debouncedQuery, baniQuery, page, role]);

  return (
    <div className="flex flex-col min-h-screen items-center pt-4">
      <Input className='w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%]' onChange={(e) =>
        handleQuery(
          (e.target as HTMLInputElement)
        )} placeholder="Nama, alamat..." />
      {(role === 'ADMIN' || role === 'USER') && (
        <div className='w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%] carousel carousel-start rounded-box mt-4'>
          <div onChange={(e) => { handleOption(e.target) }} className="carousel-item gap-2 md:gap-4">
            {baniName.map((bani) => (
              <input
                value={bani.query}
                key={bani.query}
                className="join-item btn btn-sm"
                type="radio"
                name="options"
                aria-label={bani.label} />
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : (

        <div className='w-full sm:w-[80%] md:w-[80%] lg:w-[60%] mt-4'>
          {users?.data.length !== 0 ?
            <table className='table rounded-none'>
              <thead className='hidden'>
                <tr>
                  <th>Name</th>
                  <th>Bani</th>
                </tr>
              </thead>
              <tbody>
                {users?.data.map((user) => (
                  <UserTable
                    id={user.id}
                    isAdmin={isAdmin}
                    profileButton={handleProfile}
                    editButton={handleEdit}
                    deleteButton={handleDelete}
                    profileBani={user.profil?.profileBani}
                    key={user.id}
                    name={user.profil?.name}
                    bani={user.profil?.bani?.bani_name}
                    avatar={`${process.env.REACT_APP_BASE_URL}${user.profil?.avatar}`}
                    username={user.username} />
                ))}
              </tbody>
            </table>
            : <h1 className='text-center'>Data tidak ditemukan</h1>}
        </div>

      )}
      {totalPage > 1 ? <div className=" mt-4 join grid grid-cols-2 mx-4">
        {page !== 1
          ? <button onClick={prev} className="join-item btn btn-outline">Previous page</button>
          : <button disabled className="join-item btn btn-outline">Previous page</button>
        }
        {page !== totalPage
          ? <button onClick={next} className="join-item btn btn-outline">Next page</button>
          : <button disabled className="join-item btn btn-outline">Next page</button>
        }
      </div> : null}
      <div className='w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%] mt-4'>
        <Footer />
      </div>
    </div>
  );
};

export default SearchScreen