import { useEffect, useState } from "react"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { getGreeting } from "../../Utils/birthdayConverter"
import { apiCountUser } from "../../Services/Api/AlkareemApi/get"
import { ICountTotalUsers } from "../../Types/Alkareem/RES/CountUser"
import Loading from "../../Components/Loading"
import CountUser from "../../Components/CountUser/CountUser"
import CarouselCountUser from "../../Components/CountUser/CarouselCountUser"

const AdminDashboardScreen = () => {
  const { getItem } = useLocalStorage()
  const adminToken = getItem('token')
  const role = getItem('role')
  const navigate = useNavigate();
  const greeting = getGreeting();

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [adminName, setAdminName] = useState('')
  const [countUser, setCountUser] = useState<ICountTotalUsers | null>(null)

  const fetchTotalUser = async () => {
    setIsLoading(true)
    const data = await apiCountUser({ token: adminToken })
    if (data.status !== 200) {
      setError(true)
      setIsLoading(false)
      return data
    } else {
      setCountUser(data.data)
      setIsLoading(false)
    }
  }

  //* CHECK ADMIN STATUS
  useEffect(() => {

    fetchTotalUser()

    if (role === 'USER') {
      navigate('/', { replace: false });
    }

    if (role === 'ADMIN') {
      setAdminName('Super User')
    } else if (role === 'KOORHANNAH') {
      setAdminName('Koordinator Bani Hannah')
    } else if (role === 'KOORSALAMAH') {
      setAdminName('Koordinator Bani Salamah')
    } else if (role === 'KOORAISYAH') {
      setAdminName('Koordinator Bani Aisyah')
    } else if (role === 'KOORMARYAM') {
      setAdminName('Koordinator Bani Maryam')
    } else if (role === 'KOORZAINAB') {
      setAdminName('Koordinator Bani Zainab')
    } else if (role === 'KOORQOMARIYAH') {
      setAdminName('Koordinator Bani Maryam')
    }

  }, [role, adminToken])

  return (
    <>
      {isLoading ?
        <Loading />
        :
        <div className="w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%] mx-auto p-4 mt-0 md:mt-16 lg:mt-16">
          
          <div className="font-bold text-4xl my-4">
            <h1>
              Selamat {greeting},
            </h1>
            <h1>
              {adminName}.
            </h1>
          </div>

          <CarouselCountUser
          label="Keluarga Besar Bani KH. Abdul Karim Lirboyo"/>

        </div>
      }
    </>
  )
}

export default AdminDashboardScreen