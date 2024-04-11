import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Ui/Button'
import LoginForm from '../Components/LoginForm';

type Props = {}

const LoginScreen = (props: Props) => {

  const { authenticated, setAuthenticated } = useContext(AuthContext)
  const { isAdmin, setIsAdmin } = useContext(AuthContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthenticated(false)
    setIsAdmin(false)
  }

  const handleAdmin = () => {

    //! SETUP POST METHOD AXIOS LOGIN AND SET ROLE

    setAuthenticated(true)
    setIsAdmin(true)
    navigate('/admin/dashboard')
  }

  const handleUser = () => {
    setAuthenticated(true)
    setIsAdmin(false)
    navigate('/')
  }

  return (
    <div className='flex flex-col gap-2 mt-40'>
      <LoginForm {...{username, setUsername, password, setPassword}} />
      <Button onClick={handleAdmin} variant='primary'>Admin</Button>
      <Button onClick={handleUser}>User</Button>
      <Button onClick={handleLogout} variant='ghost'>Logout</Button>
    </div>
  )
}

export default LoginScreen