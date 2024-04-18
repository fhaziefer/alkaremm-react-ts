import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../Services/Api/AlkareemApi/post';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import Button from '../Components/Ui/Button'
import LoginForm from '../Components/LoginForm';
import Modal from '../Components/Ui/Modal';

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

  }, [])

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

  return (
    <>
      <div className='flex flex-col gap-2 mt-40'>
        <Modal open={modalOpen} onClose={handleModal} body={error} />
        <LoginForm {...{ username, setUsername, password, setPassword }} />
        {isLoading
          ? <Button onClick={handleLogin} variant='primary' disabled><span className="loading loading-spinner loading-lg"></span></Button>
          : <Button onClick={handleLogin} variant='primary'>Login</Button>
        }
      </div>
    </>
  )
}

export default LoginScreen
