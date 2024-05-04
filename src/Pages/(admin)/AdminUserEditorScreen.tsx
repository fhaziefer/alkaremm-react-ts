import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { apiAdminGetUserById } from "../../Services/Api/AlkareemApi/Admin/get"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { IGetUserByIdAdmin } from "../../Types/Alkareem/RES/AdminGetById"
import { env } from "../../Utils/env"
import { RiArrowLeftSLine } from "react-icons/ri";
import { SettingAvatar, SettingAddress, SettingContact, SettingFamilyInfo, SettingPassword, SettingProfileInfo, SettingUsername } from '../../Components/Settings/SettingComponents'
import useAdminName from "../../Hooks/useAdminName"
import Loading from "../../Components/Loading"
import LayoutSideBlank from "../../Components/Layout/LayoutSideBlank"
import SettingItems from "../../Components/Ui/SettingItems"
import Footer from "../../Components/Footer"
import Button from "../../Components/Ui/Button"
import Modal from "../../Components/Ui/Modal"
import ModalDialog from "../../Components/Ui/ModalDialog";
import { apiDeleteUserAdmin } from "../../Services/Api/AlkareemApi/Admin/delete";


const AdminUserEditorScreen = () => {

    const navigate = useNavigate();

    const { id } = useParams()
    const { getItem } = useLocalStorage()
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const adminName = useAdminName()
    const baseUrl = env.REACT_APP_BASE_URL

    //* MODAL OPEN AND CLOSE
    const [avatarOpen, setAvatarOpen] = useState(false)
    const [usernameOpen, setUsernameOpen] = useState(false)
    const [profileInfoOpen, setProfileInfoOpen] = useState(false)
    const [addressOpen, setAddressOpen] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)
    const [familyInfoOpen, setFamilyInfoOpen] = useState(false)
    const [passwordOpen, setPasswordOpen] = useState(false)
    const [deleteUserOpen, setDeleteUserOpen] = useState(false)

    //* STATING API
    const [uiGender, setUiGender] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [uiPhone, setUiPhone] = useState('')

    const token = getItem('token')
    const [userData, setUserData] = useState<IGetUserByIdAdmin | undefined>(undefined)

    const fetchUser = async () => {
        setIsLoading(true)
        const userFetch = await apiAdminGetUserById({ token: token, userId: userId })
        if (userFetch.status !== 200) {
            setError(true)
            setErrorMessage(userFetch)
            setIsLoading(false)
        } else {
            setError(false)
            setUserData(userFetch.data)
            setIsLoading(false)

            const status = userFetch?.data?.data.profil?.status

            if (!status) {
                console.log('gagal memuat data')
            }

            if (status === 'MARRIED') {
                setUserStatus('Menikah')
            } else if (status === 'SINGLE') {
                setUserStatus('Belum Menikah')
            } else {
                setUserStatus('')
            }
        }
    }

    const deleteUser = async () => {
        setIsLoading(true)
        const deleteUser = await apiDeleteUserAdmin({ token: token, userId: userId })
        if (deleteUser.status !== 200) {
            setError(true)
            setErrorMessage(deleteUser)
            setIsLoading(false)
        } else {
            navigate('/search')
            setError(false)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id) setUserId(id);
        if (adminName) setIsAdmin(true)
    }, [id, adminName]);

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId]);

    //* SHORTING API
    const street = userData?.data?.profil?.address?.street
    const village = userData?.data?.profil?.address?.village
    const district = userData?.data?.profil?.address?.district
    const city = userData?.data?.profil?.address?.city
    const province = userData?.data?.profil?.address?.province
    const addressValue = street ? `${street}, ${village}, ${district}, ${city}, ${province}` : 'Belum ditambahkan';
    const avatar = `${baseUrl}${userData?.data?.profil?.avatar}`
    const gender = userData?.data?.profil?.gender
    const phone = `0${userData?.data?.profil?.contact?.phone?.slice(2)}`

    const formattedBani = userData?.data?.profil?.profileBani?.map((data) => data.bani?.bani_name)
        .join(' ∙ ');
    const familyInfoItem = formattedBani ? `${formattedBani} ∙ ${userStatus}` : 'Belum ditambahkan';

    useEffect(() => {

        if (gender !== 'FEMALE') {
            setUiGender('Laki-laki')
        } else {
            setUiGender('Perempuan')
        }

        if (userData?.data?.profil?.contact) {
            setUiPhone(phone)
        } else {
            setUiPhone('')
        }

    }, [gender, userData?.data?.profil?.contact])

    //* HANDLER AVATAR USER
    const avatarHandler = () => {
        fetchUser()
        setAvatarOpen((prev) => !prev)
    }

    //* HANDLER USERNAME USER
    const usernameHandler = () => {
        fetchUser()
        setUsernameOpen((prev) => !prev)
    }

    //* HANDLER PROFILE INFO USER
    const profileInfohandler = () => {
        fetchUser()
        setProfileInfoOpen((prev) => !prev)
    }

    //* HANDLER ADDRESS USER
    const addressHandler = () => {
        fetchUser()
        setAddressOpen((prev) => !prev)
    }

    //* HANDLER CONTACT USER
    const contactHandler = () => {
        fetchUser()
        setContactOpen((prev) => !prev)
    }

    //* HANDLER FAMILY INFO HANDLER USER
    const familyInfoHandler = () => {
        fetchUser()
        setFamilyInfoOpen((prev) => !prev)
    }

    //* HANDLER PASSWORD USER
    const passwordHandler = () => {
        fetchUser()
        setPasswordOpen((prev) => !prev)
    }

    //* HANDLER DELETE USER
    const deleteUserHandler = () => {
        deleteUser()
        setDeleteUserOpen((prev) => !prev)
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <LayoutSideBlank>

                    <Modal
                        open={avatarOpen}
                        onClose={() => setAvatarOpen((prev) => !prev)}
                    >
                        <SettingAvatar
                            isAdmin={isAdmin}
                            id={userId}
                            avatarNow={avatar}
                            gender={gender}
                            token={token}
                            onCancel={() => setAvatarOpen((prev) => !prev)}
                            onConfirm={avatarHandler}
                        />
                    </Modal>

                    <Modal
                        open={usernameOpen}
                        onClose={
                            () => setUsernameOpen((prev) => !prev)}>
                        <SettingUsername
                            isAdmin={isAdmin}
                            id={userId}
                            token={token}
                            onCancel={() => setUsernameOpen((prev) => !prev)}
                            onConfirm={usernameHandler} />
                    </Modal>

                    <Modal
                        open={addressOpen}
                        onClose={() => setAddressOpen((prev) => !prev)}>
                        <SettingAddress
                            isAdmin={isAdmin}
                            id={userId}
                            token={token}
                            onConfirm={addressHandler}
                            onCancel={() => setAddressOpen((prev) => !prev)}
                        />
                    </Modal>

                    <Modal
                        open={contactOpen}
                        onClose={() => setContactOpen((prev) => !prev)}>
                        <SettingContact
                            isAdmin={isAdmin}
                            id={userId}
                            token={token}
                            onConfirm={contactHandler}
                            onCancel={() => setContactOpen((prev) => !prev)}
                        />
                    </Modal>

                    <Modal
                        open={passwordOpen}
                        onClose={() => setPasswordOpen((prev) => !prev)}>
                        <SettingPassword
                            isAdmin={isAdmin}
                            id={userId}
                            token={token}
                            onConfirm={passwordHandler}
                            onCancel={() => setPasswordOpen((prev) => !prev)}
                        />
                    </Modal>

                    <Modal
                        open={profileInfoOpen}
                        onClose={() => setProfileInfoOpen((prev) => !prev)}>
                        <SettingProfileInfo
                            isAdmin={isAdmin}
                            id={userId}
                            token={token}
                            onConfirm={profileInfohandler}
                            onCancel={() => setProfileInfoOpen((prev) => !prev)}
                        />
                    </Modal>

                    <Modal
                        open={familyInfoOpen}
                        onClose={() => setFamilyInfoOpen((prev) => !prev)}>
                        <SettingFamilyInfo
                            isAdmin={isAdmin}
                            id={userId}
                            token={token}
                            gender={gender !== undefined ? gender : undefined}
                            onConfirm={familyInfoHandler}
                            onCancel={() => setFamilyInfoOpen((prev) => !prev)} />
                    </Modal>

                    <Modal
                        open={deleteUserOpen}
                        onClose={() => setDeleteUserOpen((prev) => !prev)}>
                        <div>
                            <h1 className='font-bold text-xl'>Hapus Akun</h1>
                            <h1 className='py-4'>Apakah Anda yakin ingin menghapus akun <span className="font-bold">@{userData?.data?.username}</span></h1>
                            <div className="flex-row flex w-full justify-between my-6">
                                <Button onClick={() => setDeleteUserOpen((prev) => !prev)} disabled={isLoading} variant="ghost" className="w-[49%]">
                                    Batal
                                </Button>
                                <Button onClick={deleteUserHandler} disabled={isLoading} variant="error" className="w-[49%]">
                                    {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Ya, Hapus.'}
                                </Button>
                            </div>
                        </div>
                    </Modal>

                    <div onClick={() => navigate(-1)} className="flex flex-row gap-1 mt-4 md:mt-0 font-bold text-2xl items-center cursor-pointer hover:text-white">
                        <RiArrowLeftSLine className="text-3xl" />
                        <h1 className="mr-3">Edit Profil</h1>
                    </div>

                    <div
                        className="flex items-center mx-auto flex-col w-48 my-16 shadow-xl rounded-full cursor-pointer hover:opacity-75 avatar"
                        onClick={() => setAvatarOpen((prev) => !prev)}
                    >
                        <div className="w-48 h-48 mask mask-squircle rounded-full">
                            <img className="rounded-full shadow-xl" src={avatar} />
                        </div>
                    </div>

                    <SettingItems
                        onClick={() => setUsernameOpen((prev) => !prev)}
                        label='Username'
                        item={`@${userData?.data?.username || 'Belum ditambahkan'}`} />

                    <SettingItems
                        onClick={() => setProfileInfoOpen((prev) => !prev)}
                        label='Informasi Profil'
                        subLabel='Edit Nama dan Jenis Kelamin'
                        item={gender ? `${userData?.data?.profil?.name} ∙ ${uiGender}` : userData?.data?.profil?.name || 'Belum ditambahkan'} />

                    <SettingItems
                        onClick={() => setFamilyInfoOpen((prev) => !prev)}
                        label='Informasi Hubungan Keluarga'
                        subLabel='Edit Bani, status pernikahan, orang tua, dll...'
                        item={familyInfoItem}
                    />

                    <SettingItems
                        onClick={() => setAddressOpen((prev) => !prev)}
                        label='Alamat'
                        subLabel='Edit alamat'
                        item={addressValue} />

                    <SettingItems
                        onClick={() => setContactOpen((prev) => !prev)}
                        label='Informasi Kontak'
                        subLabel='Edit WhatsApp dan Instagram'
                        item={(userData?.data?.profil?.contact?.phone && userData?.data?.profil?.contact?.instagram) ?
                            `${uiPhone} ∙ ${userData?.data.profil?.contact?.instagram}` :
                            (uiPhone ? uiPhone : 'Belum ditambahkan')} />

                    <SettingItems
                        onClick={() => setPasswordOpen((prev) => !prev)}
                        label='Keamanan'
                        subLabel='Ubah kata sandi' />

                    <div className="flex flex-col items-center mx-4 my-4">
                        <Button onClick={() => setDeleteUserOpen((prev) => !prev)} variant="error" className="w-full">
                            Hapus Akun @{userData?.data?.username}
                        </Button>
                    </div>

                    <div className="divider px-4 md:px-0"></div>

                    <div className='w-full mt-4 px-4'>
                        <Footer />
                    </div>

                </LayoutSideBlank>
            )}
        </>

    )
}

export default AdminUserEditorScreen