import { useEffect, useState } from 'react'
import { apiGetUserCurrent } from '../../Services/Api/AlkareemApi/get'
import { IDetailUser } from '../../Types/Alkareem/GetDetailUser'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import { getAge, getStringDate } from '../../Utils/birthdayConverter'
import { env } from '../../Utils/env'

import Loading from '../../Components/Loading'
import Footer from '../../Components/Footer'
import LogoutAlert from '../../Components/LogoutAlert'
import Modal from '../../Components/Ui/Modal'
import SettingItems from '../../Components/Ui/SettingItems'

import { SettingAddress, SettingBio, SettingBrithday, SettingContact, SettingFamilyInfo, SettingPassword, SettingProfileInfo, SettingUsername } from '../../Components/Settings/SettingComponents'

const UserSettingScreen = () => {

  const { getItem } = useLocalStorage()
  const [isLoading, setIsLoading] = useState(true)

  //* MODAL OPEN AND CLOSE
  const [usernameOpen, setUsernameOpen] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const [profileInfoOpen, setProfileInfoOpen] = useState(false)
  const [birthdayOpen, setBirthdayOpen] = useState(false)
  const [addressOpen, setAddressOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [familyInfoOpen, setFamilyInfoOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)

  //* STATING API
  const [userData, setUserData] = useState<IDetailUser | null>(null)
  const [userStatus, setUserStatus] = useState('')
  const apiUrl = env.REACT_APP_BASE_URL
  const token = getItem('token')

  //* API CALLING
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

  //* SHORTING API
  const birthday = getStringDate(userData?.data.profil?.birthday)
  const street = userData?.data.profil?.address?.street
  const village = userData?.data.profil?.address?.village
  const district = userData?.data.profil?.address?.district
  const city = userData?.data.profil?.address?.city
  const province = userData?.data.profil?.address?.province
  const age = getAge(userData?.data.profil?.birthday)
  const addressValue = street ? `${street}, ${village}, ${district}, ${city}, ${province}` : 'Belum ditambahkan';
  const avatar = `${apiUrl}${userData?.data.profil?.avatar}`

  //* HANDLER USERNAME USER
  const usernameHandler = () => {
    getUserData()
    setUsernameOpen((prev) => !prev)
  }

  //* HANDLER BIO USER
  const bioHandler = () => {
    getUserData()
    setBioOpen((prev) => !prev)
  }

  //* HANDLER PROFILE INFO USER
  const profileInfohandler = (
    name: string,
    gender: string,
    avatar: string
  ) => {
    getUserData()
    setProfileInfoOpen((prev) => !prev)
    alert(`${name}, ${gender}, ${avatar}`)
  }

  //* HANDLER BIRTHDAY USER
  const birthdayHandler = () => {
    getUserData()
    setBirthdayOpen((prev) => !prev)
  }

  //* HANDLER ADDRESS USER
  const addressHandler = () => {
    getUserData()
    setAddressOpen((prev) => !prev)
  }

  //* HANDLER CONTACT USER
  const contactHandler = (
    phone: string | undefined, instagram: string | undefined
  ) => {
    getUserData()
    setContactOpen((prev) => !prev)
    alert(`${phone} & ${instagram}`)
  }

  //* HANDLER FAMILY INFO HANDLER USER
  const familyInfoHandler = () => {
    getUserData()
    setFamilyInfoOpen((prev) => !prev)
  }

  //* HANDLER PASSWORD USER
  const passwordHandler = () => {
    getUserData()
    setPasswordOpen((prev) => !prev)
  }

  const clickHandler = () => {
    alert('Clicked')
  }

  return (
    <>
      {isLoading ? <Loading /> :

        <div className='flex items-center'>

          <Modal
            open={usernameOpen}
            onClose={
              () => setUsernameOpen((prev) => !prev)}>
            <SettingUsername
              onCancel={() => setUsernameOpen((prev) => !prev)}
              onConfirm={usernameHandler} />
          </Modal>

          <Modal
            open={bioOpen}
            onClose={() => setBioOpen((prev) => !prev)}>
            <SettingBio
              onConfirm={bioHandler}
              onCancel={() => setBioOpen((prev) => !prev)}
            />
          </Modal>

          <Modal
            open={birthdayOpen}
            onClose={() => setBirthdayOpen((prev) => !prev)}>
            <SettingBrithday
              onConfirm={birthdayHandler}
              onCancel={() => setBirthdayOpen((prev) => !prev)}
            />
          </Modal>

          <Modal
            open={addressOpen}
            onClose={() => setAddressOpen((prev) => !prev)}>
            <SettingAddress
              onConfirm={addressHandler}
              onCancel={() => setAddressOpen((prev) => !prev)}
            />
          </Modal>

          <Modal
            open={contactOpen}
            onClose={() => setContactOpen((prev) => !prev)}>
            <SettingContact
              onClicked={contactHandler}
              onClick={() => setContactOpen((prev) => !prev)}
            />
          </Modal>

          <Modal
            open={passwordOpen}
            onClose={() => setPasswordOpen((prev) => !prev)}>
            <SettingPassword
              onConfirm={passwordHandler}
              onCancel={() => setPasswordOpen((prev) => !prev)}
            />
          </Modal>

          <Modal
            open={profileInfoOpen}
            onClose={() => setProfileInfoOpen((prev) => !prev)}>
            <SettingProfileInfo
              avatarNow={avatar}
              onClicked={profileInfohandler}
              onClick={() => setProfileInfoOpen((prev) => !prev)}
            />
          </Modal>

          <Modal
            open={familyInfoOpen}
            onClose={() => setFamilyInfoOpen((prev) => !prev)}>
            <SettingFamilyInfo
              onClicked={familyInfoHandler}
              onClick={() => setFamilyInfoOpen((prev) => !prev)} />
          </Modal>

          <LogoutAlert open={logoutOpen} />

          <div className='mt-0 mb-4 md:mt-20 lg:mt-24 w-full sm:w-[80%] md:w-[80%] lg:w-[60%] mx-auto'>

            <h1 className='text-4xl p-4 font-bold'>Pengaturan dan Privasi</h1>

            <SettingItems
              onClick={() => setUsernameOpen((prev) => !prev)}
              label='Username'
              item={`@${userData?.data.username || 'Belum ditambahkan'}`} />

            <SettingItems
              onClick={() => setBioOpen((prev) => !prev)}
              label='Bio'
              item={userData?.data.profil?.bio || 'Belum ditambahkan'} />

            <SettingItems
              onClick={() => setProfileInfoOpen((prev) => !prev)}
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
              onClick={() => setFamilyInfoOpen((prev) => !prev)}
              label='Informasi Hubungan Keluarga'
              subLabel='Edit Bani, status pernikahan, putra-putri, dll...'
              item={(userData?.data.profil?.bani?.bani_name && userStatus) ?
                `${userData?.data.profil?.bani?.bani_name} ∙ ${userStatus}` :
                (userData?.data.profil?.bani?.bani_name || 'Belum ditambahkan')} />

            <SettingItems
              onClick={() => setPasswordOpen((prev) => !prev)}
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
              color='error'
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