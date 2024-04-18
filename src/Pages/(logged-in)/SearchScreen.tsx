import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISearchUsers } from '../../Types/Alkareem/GetAllUserRes';
import UserTable from '../../Components/UserTable';
import Footer from '../../Components/Footer';
import Loading from '../../Components/Loading';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiSearchUser } from '../../Services/Api/AlkareemApi/get';
import baniName from '../../JSON/baniName.json'
import Input from '../../Components/Ui/Input';

type Props = {};

const SearchScreen = (props: Props) => {
  const [users, setUsers] = useState<ISearchUsers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isError, setIsError] = useState(false)
  const [query, setQuery] = useState('')
  const [baniQuery, setBaniQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const { getItem } = useLocalStorage()
  const navigate = useNavigate();

  const handleQuery = (event: any) => {
    const inputQuery = event.value.toLowerCase()
    setQuery(inputQuery);
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
    navigate(`/${value}`, { replace: false });
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
    const users = await apiSearchUser({ token: token, bani: baniQuery, query: query, page: page })
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
  }, [query, baniQuery, page]);

  return (
    <div className="flex flex-col min-h-screen items-center pt-4">
      <Input className='w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%]' onChange={(e) =>
        handleQuery(
          (e.target as HTMLInputElement)
        )} placeholder="Nama, alamat..." />
      <div className='w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%] carousel carousel-start rounded-box my-4'>
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className='w-full sm:w-[80%] md:w-[80%] lg:w-[60%]'>
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
                    key={user.id}
                    name={user.profil.name}
                    bani={user.profil.bani.bani_name}
                    avatar={`${process.env.REACT_APP_BASE_URL}${user.profil.avatar}`}
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
      <div className='w-full mt-4'>
        <Footer />
      </div>
    </div>
  );
};

export default SearchScreen