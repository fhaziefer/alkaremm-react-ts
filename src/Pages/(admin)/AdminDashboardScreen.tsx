import CarouselCountUser from "../../Components/CountUser/CarouselCountUser"
import GreetingTime from "../../Components/Greetings/GreetingTime"
import useAdminName from "../../Hooks/useAdminName"
import LayoutSideBlank from "../../Components/Layout/LayoutSideBlank"
import Footer from "../../Components/Footer"
import AdminOption from "../../Components/AdminDashboard/AdminOption"
import { useNavigate } from "react-router-dom"

const AdminDashboardScreen = () => {

  const navigate = useNavigate();

  const adminName = useAdminName()

  const signUpHandler = () => {
    alert('SignUp')
  }

  const updateHandler = () => {
    navigate('/search', { replace: false })
  }

  return (
    <LayoutSideBlank>

      <GreetingTime
        name={adminName}
      />

      <h1>Berikut adalah beberapa hal yang bisa Anda lakukan:</h1>

      <AdminOption
        signUpButton={signUpHandler}
        updateButton={updateHandler}
      />

      <CarouselCountUser
        label="Keluarga Besar Bani KH. Abdul Karim Lirboyo"
      />

      <Footer />

    </LayoutSideBlank>
  )
}

export default AdminDashboardScreen