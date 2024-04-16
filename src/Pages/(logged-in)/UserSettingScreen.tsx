import React, { useState } from 'react'
import SettingAddress from '../../Components/SettingAddress'
import SettingItems from '../../Components/Ui/SettingItems'
import Footer from '../../Components/Footer'
import Modal from '../../Components/Ui/Modal'
import LogoutAlert from '../../Components/LogoutAlert'

const UserSettingScreen = () => {

  const [settingOpen, setSettingOpen] = useState(false)

  const [logoutOpen, setLogoutOpen] = useState(false)

  const addressHandler = (
    street: string,
    village: string,
    district: string,
    city: string,
    province: string,
    postal: string) => {
    alert({street, village, district, city, province, postal})
    setSettingOpen((prev) => !prev)
  }

  const logoutHandler = () => {
    setLogoutOpen((prev) => !prev)
}


  const clickHandler = () => {
    alert('Clicked')
  }

  return (
    <div className='flex items-center'>

      <Modal open={settingOpen} onClose={() => setSettingOpen((prev) => !prev)}><SettingAddress onClicked={addressHandler} /></Modal>

      <LogoutAlert open={logoutOpen}/>

      <div className='mt-0 mb-4 md:mt-20 lg:mt-24 w-full sm:w-[80%] md:w-[80%] lg:w-[60%] mx-auto'>

        <h1 className='text-4xl p-4 font-bold'>Pengaturan dan Privasi</h1>

        <SettingItems
          onClick={clickHandler}
          label='Username'
          item='@fadlulloh.abdurrohman' />

        <SettingItems
          onClick={clickHandler}
          label='Bio'
          item='Seni adalah konsistensi' />

        <SettingItems
          onClick={clickHandler}
          label='Informasi Profil'
          subLabel='Edit foto profil, nama, dll...'
          item='M. Yusuf Fadlulloh' />

        <SettingItems
          onClick={clickHandler}
          label='Tanggal Lahir'
          item='1 Agustus 2000' />

        <SettingItems
          onClick={() => setSettingOpen((prev) => !prev)}
          label='Alamat'
          subLabel='Edit alamat Anda'
          item='Ponpes Hidayatus Sholihin, Turus Gurah Kediri Jawa Timur, 64181.' />

        <SettingItems
          onClick={clickHandler}
          label='Informasi Kontak'
          subLabel='Edit WhatsApp dan Instagram'
          item='@fadlulloh.abdurrohman ∙ 6285843908203' />

        <SettingItems
          onClick={clickHandler}
          label='Informasi Hubungan Keluarga'
          subLabel='Edit Bani, status pernikahan, putra-putri, dll...'
          item='Bani Hannah ∙ Menikah' />

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
  )
}

export default UserSettingScreen