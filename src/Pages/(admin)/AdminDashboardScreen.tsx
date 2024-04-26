import { useEffect, useState } from "react"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import Loading from "../../Components/Loading"
import CarouselCountUser from "../../Components/CountUser/CarouselCountUser"
import GreetingTime from "../../Components/Greetings/GreetingTime"
import useAdminName from "../../Hooks/useAdminName"
import LayoutSideBlank from "../../Components/Layout/LayoutSideBlank"

const AdminDashboardScreen = () => {

  const { getItem } = useLocalStorage()
  const adminToken = getItem('token')
  const role = getItem('role')
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const adminName = useAdminName()

  return (
    <>
      {isLoading ?
        <Loading />
        :
        <LayoutSideBlank>
          <GreetingTime
          name={adminName}/>

          <CarouselCountUser
          label="Keluarga Besar Bani KH. Abdul Karim Lirboyo"/>
          
        </LayoutSideBlank>
      }
    </>
  )
}

export default AdminDashboardScreen