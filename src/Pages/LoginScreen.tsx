import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../Services/Api/AlkareemApi/post';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import Button from '../Components/Ui/Button'
import LoginForm from '../Components/LoginForm';
import Modal from '../Components/Ui/Modal';
import { env } from '../Utils/env';

type Props = {}

const LoginScreen = (props: Props) => {

  const { setAuthenticated } = useContext(AuthContext)
  const { setIsAdmin } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const { setItem } = useLocalStorage()

  const navigate = useNavigate();

  const { getItem } = useLocalStorage()
  const token = getItem('token')
  const admin = getItem('role')

  useEffect(() => {
    setIsLoading(true)

    if (token) {
      setAuthenticated(true)
      if (admin !== 'USER') {
        setIsAdmin(true)
      }
      setIsLoading(false)
      navigate('/')
    } else {
      setIsLoading(false)
    }

  }, [token])

  const login = async () => {
    setIsLoading(true)
    const userLogin = await apiLogin({ username, password })
    if (userLogin.status !== 200) {
      setError(userLogin)
      setIsLoading(false)
      setModalOpen((prev) => !prev)
      return;
    } else {
      setItem('id', userLogin.data.data.id)
      setItem('token', userLogin.data.data.token)
      setItem('role', userLogin.data.data.role)
      setItem('username', userLogin.data.data.username)
      setItem('LOGIN_STATUS', true)
      if (userLogin.data.data.role !== 'USER') {
        setIsAdmin(true)
        setAuthenticated(true)
        setIsLoading(false)
        navigate('/')
      } else {
        setIsAdmin(false)
        setAuthenticated(true)
        setIsLoading(false)
        navigate('/')
      }
    }
  }

  const handleLogin = () => {
    login()
  }

  const handleModal = () => setModalOpen((prev) => !prev)

  const baseUrl = env.REACT_APP_BASE_URL

  return (

    <div className="space-y-8 mx-6 lg:grid sm:gap-6 xl:gap-10 lg:space-y-0 mt-24">
      <Modal open={modalOpen} onClose={handleModal} body={error} />
      <form onSubmit={handleLogin}>
        <div className="w-full md:w-[50%] flex flex-col p-6 mx-auto max-w-lg text-left rounded-lg border border-gray-500 bg-base-200 shadow relative">
          <div className='mx-auto my-16 w-36 h-36'>
            <img src={`${baseUrl}/images/asset/logo.png`} />
          </div>
          <h1 className="ml-4 mb-4 text-2xl font-bold text-4xl text-left">
            Selamat Datang!
          </h1>
          <h2 className='ml-4 text-gray-500 text-sm'>Silakan masukkan username dan password Anda untuk melanjutkan ke <strong>Alkareem</strong></h2>
          <LoginForm {...{ username, setUsername, password, setPassword }} />
          <p className='ml-4 text-sm text-gray-500'>Belum punya akun? <a href={'https://wa.me/085843908203'} className='hover:font-bold hover:text-primary cursor-pointer'>Hubungi Admin</a></p>
          {isLoading
            ? <Button className='m-4' onClick={handleLogin} variant='primary' disabled><span className="loading loading-spinner loading-lg"></span></Button>
            : <Button className='m-4' onClick={handleLogin} variant='primary'>Login</Button>
          }
        </div>
      </form>
    </div>

  )
}

export default LoginScreen
