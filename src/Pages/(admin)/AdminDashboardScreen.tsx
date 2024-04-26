import { useEffect, useState } from "react"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import Loading from "../../Components/Loading"
import CarouselCountUser from "../../Components/CountUser/CarouselCountUser"
import GreetingTime from "../../Components/Greetings/GreetingTime"
import useAdminName from "../../Hooks/useAdminName"
import LayoutSideBlank from "../../Components/Layout/LayoutSideBlank"
import Footer from "../../Components/Footer"
import Button from "../../Components/Ui/Button"
import { FaCheck } from "react-icons/fa";

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
            name={adminName} />

          <h1>Berikut adalah beberapa hal yang bisa Anda lakukan:</h1>

          <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 mt-4">

            <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-gray-500 shadow relative">
              <h3 className="mb-4 text-2xl font-bold">Registrasi</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Membuatkan akun baru untuk anggota bani di bawah koordinasi Anda.</p>
              <div className="flex justify-center items-baseline my-2">
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left mb-20">
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-primary ml-1" />
                  <span>Username</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-primary ml-1" />
                  <span>Password</span>
                </li>
              </ul>
              <Button className="absolute bottom-6 right-6 left-6" variant="primary">Registrasi User Baru</Button>
            </div>

            <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-gray-500 shadow relative">
              <h3 className="mb-4 text-2xl font-bold">Update</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Perbaharui informasi akun anggota bani di bawah koordinasi Anda.</p>
              <div className="flex justify-center items-baseline my-2">
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left mb-20">
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-primary ml-1" />
                  <span>Nama</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-primary ml-1" />
                  <span>Wali</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-primary ml-1" />
                  <span>Pasangan</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-primary ml-1" />
                  <span>Bani</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-primary ml-1" />
                  <span>Alamat</span>
                </li>
              </ul>
              <Button className="absolute bottom-6 right-6 left-6" variant="primary">Update User</Button>
            </div>

          </div>

          <CarouselCountUser
            label="Keluarga Besar Bani KH. Abdul Karim Lirboyo" />

          <Footer />

        </LayoutSideBlank>
      }
    </>
  )
}

export default AdminDashboardScreen