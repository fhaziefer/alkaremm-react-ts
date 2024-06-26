import { useEffect, useState } from 'react'
import DetailUserCard from '../../Components/Search/DetailUserCard'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import { IUserById } from '../../Types/Alkareem/RES/UserById'
import { IChildren } from '../../Types/Alkareem/RES/ChildrenById'
import { env } from '../../Utils/env'
import { apiChildren, apiDetailUser } from '../../Services/Api/AlkareemApi/get'
import { Wife } from '../../Types/Alkareem/RES/Wives'
import Loading from '../../Components/Loading'

const ProfileScreen = () => {

  const { getItem } = useLocalStorage()
  const token = getItem('token')
  const id = getItem('id')

  const [userData, setUserData] = useState<IUserById | null>(null)
  const [childrenData, setChildrenData] = useState<IChildren | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = env.REACT_APP_BASE_URL

  const fetchUsers = async () => {
    setIsLoading(true)

    const user = await apiDetailUser({ token: token, id: id })
    if (user.status !== 200) {
      setIsLoading(false)
      setChildrenData(null)
    } else {
      setUserData(user.data)
      if (user.data.data.profil.status === 'SINGLE' || user.data.data.profil.status === 'UNKNOWN') {
        setIsLoading(false)
        setChildrenData(null)
        return;
      } else {
        if (user.data.data.profil.children.length !== 0) {
          var children = await apiChildren({ token: token, id: id })
        } else {
          if (user.data.data.profil?.gender !== 'FEMALE') {
            if (user.data.data.profil?.wives === null) {
              setIsLoading(false)
              setChildrenData(null)
              return
            } else {
              const wives = user.data.data.profil?.wives
              let wifeId = undefined
              if (wives && wives.length > 0) {
                wives.forEach((wife: Wife) => {
                  wifeId = wife.userId
                });
              } else {
                console.log("No wife data available.");
                setIsLoading(false)
                setChildrenData(null)
              }
              var children = await apiChildren({ token: token, id: wifeId })
            }
          } else {
            if (user.data.data.profil.husband === null) {
              setIsLoading(false)
              setChildrenData(null)
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
    <div>
      {isLoading
        ? <Loading />
        :
        <DetailUserCard
          name={userData?.data.profil?.name}
          user_alive={userData?.data.profil?.alive_status}
          parent_alive={userData?.data.profil?.parent?.alive_status}
          husband_alive={userData?.data.profil?.husband?.alive_status}
          username={userData?.data.username}
          bio={userData?.data.profil?.bio}
          birthday={userData?.data.profil?.birthday}
          bani={userData?.data.profil?.bani?.bani_name}
          avatar={baseUrl + userData?.data.profil?.avatar}
          gender={userData?.data.profil?.gender}
          husbandId={userData?.data.profil?.husband?.userId}
          waliId={userData?.data.profil?.parent?.userId}
          generasi={userData?.data.profil?.generasi?.generasi_name}
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
          profileBani={userData?.data.profil?.profileBani}
        />
      }
    </div>
  )
}

export default ProfileScreen