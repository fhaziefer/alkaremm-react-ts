import { useEffect } from "react"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"

const AdminDashboardScreen = () => {
  const { getItem } = useLocalStorage()
  const role = getItem('role')
  const navigate = useNavigate();

  //* CHECK ADMIN STATUS
  useEffect(() => {
    if (role === 'USER') {
      navigate('/', { replace: false });
    }
  }, [role])

  return (
    <div className="w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%] mx-auto p-4">
      Admin Dashboard Screen
    </div>
  )
}

export default AdminDashboardScreen