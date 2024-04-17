import { useEffect, useState } from 'react'
import SettingAddress from '../../Components/Settings/SettingAddress'
import SettingItems from '../../Components/Ui/SettingItems'
import Footer from '../../Components/Footer'
import Modal from '../../Components/Ui/Modal'
import LogoutAlert from '../../Components/LogoutAlert'
import { apiGetUserCurrent } from '../../Services/Api/AlkareemApi/alkareemApi'
import { IDetailUser } from '../../Types/Alkareem/GetDetailUser'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import { getAge, getStringDate } from '../../Utils/birthdayConverter'
import Loading from '../../Components/Loading'
import SettingUsername from '../../Components/Settings/SettingUsername'
import SettingBio from '../../Components/Settings/SettingBio'
import SettingBrithday from '../../Components/Settings/SettingBrithday'
import SettingContact from '../../Components/Settings/SettingContact'
import SettingPassword from '../../Components/Settings/SettingPassword'

const UserSettingScreen = () => {

  const { getItem } = useLocalStorage()
  const token = getItem('token')

  const [isLoading, setIsLoading] = useState(true)

  const [userData, setUserData] = useState<IDetailUser | null>(null)
  const [userStatus, setUserStatus] = useState('')

  const [usernameOpen, setUsernameOpen] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const [birthdayOpen, setBirthdayOpen] = useState(false)
  const [addressOpen, setAddressOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)

  const addressHandler = (
    street: string,
    village: string,
    district: string,
    city: string,
    province: string,
    postal: string) => {
    alert(`${street}, ${village}, ${district}, ${city}, ${province}, ${postal}.`)
    setAddressOpen((prev) => !prev)
  }

  const usernameHandler = (
    usernameNow: string) => {
    alert(`${usernameNow}`)
    setUsernameOpen((prev) => !prev)
  }

  const bioHandler = (
    bioNew: string) => {
    alert(`${bioNew}`)
    setBioOpen((prev) => !prev)
  }

  const birthdayHandler = (
    birthdayNew: string) => {
    alert(`${birthdayNew}`)
    setBirthdayOpen((prev) => !prev)
  }

  const contactHandler = (
    phoneNew: string | undefined, instagramNew: string | undefined
  ) => {
    alert(`${phoneNew} & ${instagramNew}`)
    setContactOpen((prev) => !prev)
  }

  const passwordHandler = (
    password: string) => {
    alert(`${password}`)
    setPasswordOpen((prev) => !prev)
  }

  const clickHandler = () => {
    alert('Clicked')
  }

  const getUserData = async () => {
    const dataFetch = await apiGetUserCurrent({ token: token })
    if (dataFetch.status !== 200) {
      setIsLoading(false)
    } else {
      setUserData(dataFetch.data)

      const status = dataFetch?.data?.data?.profil?.status

      if (status === 'MARRIED') {
        setUserStatus('Menikah')
      } else if (status === 'SINGLE') {
        setUserStatus('Belum Menikah')
      } else {
        setUserStatus('')
      }

      setIsLoading(false)
    }
  }


  useEffect(() => {
    getUserData()
  }, [token])

  const birthday = getStringDate(userData?.data.profil?.birthday)
  const age = getAge(userData?.data.profil?.birthday)

  const address = `${userData?.data.profil?.address?.street}, ${userData?.data.profil?.address?.village}, ${userData?.data.profil?.address?.district}, ${userData?.data.profil?.address?.city}, ${userData?.data.profil?.address?.province}, ${userData?.data.profil?.address?.postal_code}`;

  const postalCode = userData?.data.profil?.address?.postal_code;
  const addressValue = postalCode ? address : 'Belum ditambahkan';


  return (

    <>
      {isLoading ? <Loading /> :

        <div className='flex items-center'>

          <Modal
            open={usernameOpen}
            onClose={
              () => setUsernameOpen((prev) => !prev)
            }
          >
            <SettingUsername
              usernameNow={userData?.data.username || 'Belum ditambahkan'}
              onClick={() => setUsernameOpen((prev) => !prev)}
              onClicked={usernameHandler} />
          </Modal>

          <Modal
            open={bioOpen}
            onClose={() => setBioOpen((prev) => !prev)}
          >
            <SettingBio
              bioNow={userData?.data.profil?.bio || 'Belum ditambahkan'}
              onClick={() => setBioOpen((prev) => !prev)}
              onClicked={bioHandler}
            />
          </Modal>

          <Modal
            open={birthdayOpen}
            onClose={() => setBirthdayOpen((prev) => !prev)}
          >
            <SettingBrithday
              birthdayNow={birthday || 'Belum ditambahkan'}
              onClick={() => setBirthdayOpen((prev) => !prev)}
              onClicked={birthdayHandler}
            />
          </Modal>

          <Modal
            open={addressOpen}
            onClose={
              () => setAddressOpen((prev) => !prev)
            }>
            <SettingAddress
              provinceNow={userData?.data.profil?.address?.province}
              cityNow={userData?.data.profil?.address?.city}
              districtNow={userData?.data.profil?.address?.district}
              villageNow={userData?.data.profil?.address?.village}
              postalNow={userData?.data.profil?.address?.postal_code}
              streetNow={userData?.data.profil?.address?.street}
              onClick={() => setAddressOpen((prev) => !prev)}
              onClicked={addressHandler}
            />
          </Modal>

          <Modal
            open={contactOpen}
            onClose={
              () => setContactOpen((prev) => !prev)
            }
          >
            <SettingContact
              onClicked={contactHandler}
              onClick={() => setContactOpen((prev) => !prev)} />
          </Modal>

          <Modal
            open={passwordOpen}
            onClose={
              () => setPasswordOpen((prev) => !prev)
            }
          >
            <SettingPassword
              onClicked={passwordHandler}
              onClick={() => setPasswordOpen((prev) => !prev)}
            />
          </Modal>

          <LogoutAlert open={logoutOpen} />

          <div className='mt-0 mb-4 md:mt-20 lg:mt-24 w-full sm:w-[80%] md:w-[80%] lg:w-[60%] mx-auto'>

            <h1 className='text-4xl p-4 font-bold'>Pengaturan dan Privasi</h1>

            <SettingItems
              onClick={
                () => setUsernameOpen((prev) => !prev)
              }
              label='Username'
              item={`@${userData?.data.username || 'Belum ditambahkan'}`} />


            <SettingItems
              onClick={
                () => setBioOpen((prev) => !prev)
              }
              label='Bio'
              item={userData?.data.profil?.bio || 'Belum ditambahkan'}
            />

            <SettingItems
              onClick={clickHandler}
              label='Informasi Profil'
              subLabel='Edit foto profil, nama, dll...'
              item={userData?.data.profil?.name || 'Belum ditambahkan'} />


            <SettingItems
              onClick={() => setBirthdayOpen((prev) => !prev)}
              label='Tanggal Lahir'
              item={(userData?.data.profil?.alive_status && age) ?
                `${birthday} ∙ ${age}` :
                (birthday || 'Belum ditambahkan')} />


            <SettingItems
              onClick={() => setAddressOpen((prev) => !prev)}
              label='Alamat'
              subLabel='Edit alamat Anda'
              item={addressValue} />

            <SettingItems
              onClick={() => setContactOpen((prev) => !prev)}
              label='Informasi Kontak'
              subLabel='Edit WhatsApp dan Instagram'
              item={(userData?.data.profil?.contact?.phone && userData?.data.profil?.contact?.instagram) ?
                `${userData?.data.profil?.contact?.phone} ∙ ${userData?.data.profil?.contact?.instagram}` :
                (userData?.data.profil?.contact?.phone || 'Belum ditambahkan')} />

            <SettingItems
              onClick={clickHandler}
              label='Informasi Hubungan Keluarga'
              subLabel='Edit Bani, status pernikahan, putra-putri, dll...'
              item={(userData?.data.profil?.bani?.bani_name && userStatus) ?
                `${userData?.data.profil?.bani?.bani_name} ∙ ${userStatus}` :
                (userData?.data.profil?.bani?.bani_name || 'Belum ditambahkan')} />

            <SettingItems
              onClick={()=>setPasswordOpen((prev)=>!prev)}
              label='Keamanan'
              subLabel='Ubah kata sandi Anda' />

            <div className="divider px-4 md:px-0"></div>

            <SettingItems
              onClick={clickHandler}
              label='Bantuan'
              subLabel='Hubungi Admin' />

            <SettingItems
              onClick={clickHandler}
              label='Tentang' />

            <div className="divider px-4 md:px-0"></div>

            <SettingItems
              clasname='text-rose-500'
              onClick={() => setLogoutOpen((prev) => !prev)}
              label='Keluar'
              subLabel='Keluar dari akun Anda' />

            <div className='w-full mt-4'>
              <Footer />
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default UserSettingScreen