import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/Ui/Button'

type Props = {}

const AdminDashboardScreen = (props:Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/login', { replace: true })
  }

  return (
    <div className='flex flex-col gap-2 mt-40'>
      <Button onClick={handleClick} variant='primary'>Login</Button>
    </div>
  )
}

export default AdminDashboardScreen