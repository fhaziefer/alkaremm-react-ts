import { useState } from "react"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import Loading from "../../Components/Loading"
import CarouselCountUser from "../../Components/CountUser/CarouselCountUser"
import GreetingTime from "../../Components/Greetings/GreetingTime"
import useAdminName from "../../Hooks/useAdminName"
import LayoutSideBlank from "../../Components/Layout/LayoutSideBlank"
import Footer from "../../Components/Footer"
import Option from "../../Components/AdminDashboard/Option"

const AdminDashboardScreen = () => {

  const { getItem } = useLocalStorage()
  const adminToken = getItem('token')
  const role = getItem('role')
  const navigate = useNavigate();

  const [isLoading] = useState(false)
  const [error, setError] = useState(false)

  const adminName = useAdminName()

  const signUpHandler = () => {
    alert('SignUp')
  }

  const updateHandler = () => {
    alert('SignUp')
  }

  return (
    <>
      {isLoading ?
        <Loading />
        :
        <LayoutSideBlank>

          <GreetingTime
            name={adminName} />

          <h1>Berikut adalah beberapa hal yang bisa Anda lakukan:</h1>

          <Option
          signUpButton={signUpHandler}
          updateButton={updateHandler}
          />

          <CarouselCountUser
            label="Keluarga Besar Bani KH. Abdul Karim Lirboyo" />

          <Footer />

        </LayoutSideBlank>
      }
    </>
  )
}

export default AdminDashboardScreen