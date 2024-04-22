import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiChildren, apiDetailUser } from '../../Services/Api/AlkareemApi/get';
import { env } from '../../Utils/env';
import ProfileCard from '../../Components/DetailUserCard';
import Loading from '../../Components/Loading';
import { ICurrentUser } from '../../Types/Alkareem/RES/CurrentUser';
import { IChildren } from '../../Types/Alkareem/RES/ChildrenById';
import { Wife } from '../../Types/Alkareem/RES/Wives';

const UserDetailScreen = () => {

  const { id } = useParams()
  const { getItem } = useLocalStorage()
  const token = getItem('token')

  const [userData, setUserData] = useState<ICurrentUser | null>(null)
  const [childrenData, setChildrenData] = useState<IChildren | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const url = env.REACT_APP_BASE_URL

  const fetchUsers = async () => {

    const user = await apiDetailUser({ token: token, id: id })
    if (user.status !== 200) {
      setIsLoading(false)
      // setIsError(true)
    } else {
      setUserData(user.data)
      if (user.data.data.profil.status === 'SINGLE' || user.data.data.profil.status === 'UNKNOWN') {
        setIsLoading(false)
        return;
      } else {

        if (user.data.data.profil.children.length !== 0) {

          var children = await apiChildren({ token: token, id: id })

        } else {

          if (user.data.data.profil?.gender !== 'FEMALE') {

            if (user.data.data.profil?.wives === null) {
              setIsLoading(false)
              return
            } else {

              const wives = user.data.data.profil?.wives
              let wifeId1 = undefined

              if (wives && wives.length > 0) {
                wives.forEach((wife: Wife) => {
                  wifeId1 = wife.userId
                });
              } else {
                console.log("No wife data available.");
              }

              var children = await apiChildren({ token: token, id: wifeId1 })
            }

          } else {

            if (user.data.data.profil.husband === null) {
              setIsLoading(false)
              return
            } else {
              const husbandId = user.data.data.profil.husband.userId
              var children = await apiChildren({ token: token, id: husbandId })
            }

          }

        }

      }
      if (children.status !== 200) {
        setIsLoading(false)
      } else {
        setChildrenData(children.data)
        setIsLoading(false)
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  return (
    <>
      {isLoading
        ? <Loading />
        :
        <ProfileCard
          name={userData?.data.profil?.name}
          user_alive={userData?.data.profil?.alive_status}
          parent_alive={userData?.data.profil?.parent?.alive_status}
          husband_alive={userData?.data.profil?.husband?.alive_status}
          username={userData?.data.username}
          bio={userData?.data.profil?.bio}
          birthday={userData?.data.profil?.birthday}
          bani={userData?.data.profil?.bani?.bani_name}
          avatar={url + userData?.data.profil?.avatar}
          gender={userData?.data.profil?.gender}
          husband={userData?.data.profil?.husband?.name}
          wife={userData?.data.profil?.wives}
          children={childrenData?.data.profil?.children}
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
    </>

  )
}

export default UserDetailScreen