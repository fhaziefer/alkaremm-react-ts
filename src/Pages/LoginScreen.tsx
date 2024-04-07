import React, {useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Ui/Button'

type Props = {}

const LoginScreen = (props: Props) => {

  const {authenticated, setAuthenticated} = useContext(AuthContext)
  const {admin, setAdmin} = useContext(AuthContext)

  const navigate = useNavigate();
  
  const handleLogout = () => {
    setAuthenticated(false)
    setAdmin(false)
  }

  const handleAdmin = () => {

    //! SETUP POST METHOD AXIOS LOGIN AND SET ROLE

    setAuthenticated(true)
    setAdmin(true)
    console.log(admin)
    navigate('/admin/dashboard')
  }

  const handleUser = () => {
    setAuthenticated(true)
    setAdmin(false)
    console.log(authenticated)
    navigate('/')
  }

  return (
    <div className='flex flex-col gap-2 mt-40'>
    <Button onClick={handleAdmin} variant='primary'>Admin</Button>
    <Button onClick={handleUser}>User</Button>
    <Button onClick={handleLogout} variant='ghost'>Logout</Button>
    </div>
  )
}

export default LoginScreen