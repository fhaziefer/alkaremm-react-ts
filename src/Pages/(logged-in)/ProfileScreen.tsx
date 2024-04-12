import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiDetailUser } from '../../Services/Api/AlkareemApi/alkareemApi';
import { IDetailUser } from '../../Types/Alkareem/GetDetailUser';
import { env } from '../../Utils/env';
import ProfileCard from '../../Components/ProfileCard';
import Loading from '../../Components/Loading';

const ProfileScreen = () => {

  const { id } = useParams()
  const { getItem } = useLocalStorage()

  const [userData, setUserData] = useState<IDetailUser | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const url = env.REACT_APP_BASE_URL

  const fetchUsers = async () => {
    const token = getItem('token')
    const user = await apiDetailUser({ token: token, id: id })
    if (user.status !== 200) {
      setIsLoading(false)
      // setIsError(true)
      // setIsLoading(false)
    } else {
      setUserData(user.data)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  return (
    <>
      {isLoading
        ? <Loading/>
        :
        <ProfileCard
          name={userData?.data.profil?.name}
          bani={userData?.data.profil?.bani?.bani_name}
          avatar={url + userData?.data.profil?.avatar}
          gender={userData?.data.profil?.gender}
          wali={userData?.data.profil?.parent?.name}
          street={userData?.data.profil?.address?.street}
          village={userData?.data.profil?.address?.village}
          district={userData?.data.profil?.address?.district}
          city={userData?.data.profil?.address?.city}
          province={userData?.data.profil?.address?.province}
          postal={userData?.data.profil?.address?.postal_code}
          phone={userData?.data.profil?.contact?.phone}
          instagram={userData?.data.profil?.contact?.instagram}
        />
      }
    </ >

  )
}

export default ProfileScreen