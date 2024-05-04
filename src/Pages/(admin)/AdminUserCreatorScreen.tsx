import { RiArrowLeftSLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useMultiselect } from "../../Hooks/useMultiSelect"
import { useEffect, useState } from "react"
import { apiAdminGetUserByUsername } from "../../Services/Api/AlkareemApi/Admin/get"
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { apiRegister } from "../../Services/Api/AlkareemApi/post"
import { apiCreateBaniAdmin, apiCreateProfileAdmin } from "../../Services/Api/AlkareemApi/Admin/post"
import { apiDeleteUserAdmin } from "../../Services/Api/AlkareemApi/Admin/delete"
import LayoutSideBlank from "../../Components/Layout/LayoutSideBlank"
import useAdminName from "../../Hooks/useAdminName"
import Input from "../../Components/Ui/Input"
import Button from "../../Components/Ui/Button"
import baniList from "../../JSON/selectBani.json"
import aliveList from "../../JSON/aliveOption.json"
import DropdownOption from "../../Components/Ui/DropdownOption"

const genderOption = [
    {
        "id": "MALE",
        "text": "Laki-laki"
    },
    {
        "id": "FEMALE",
        "text": "Perempuan"
    }
]

const AdminUserCreatorScreen = () => {
    const adminName = useAdminName()
    const navigate = useNavigate();
    const { getItem } = useLocalStorage()
    const token = getItem('token')
    const { selected, setSelected, isSelected, onChange } = useMultiselect([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)
    const [usernameMessage, setUsernameMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [gender, setGender] = useState('')
    const [isAlive, setIsAlive] = useState(true)

    const [baniDisable, setBaniDisable] = useState(true)

    const fetchRegister = async () => {
        const checkUser = await apiAdminGetUserByUsername({ token: token, username: username })
        if (checkUser.status === 200) {
            setUsernameMessage('Username sudah digunakan')
            setIsLoading(false)
        } else {
            const register = await apiRegister({ username: username, password: password })
            if (register.status !== 200) {
                setError(true)
                setPasswordMessage(register)
                setIsLoading(false)
            } else {
                const userId = register.data.data.id
                const createProfile = await apiCreateProfileAdmin({ token: token, name: fullName, gender: gender, alive_status: isAlive, userId: userId })
                if (createProfile.status !== 200) {
                    setError(true)
                    setIsLoading(false)
                    await apiDeleteUserAdmin({ token: token, userId: userId })
                } else {
                    for (const baniId of selected) {
                        const addBani = await apiCreateBaniAdmin({ token: token, baniId: baniId, userId: userId });
                        if (addBani.status !== 200) {
                            setError(true)
                            setIsLoading(false)
                            await apiDeleteUserAdmin({ token: token, userId: userId })
                        } else {
                            setIsLoading(false)
                            navigate(`/admin/edit/${userId}`)
                        }
                    }
                }
            }
        }
    }

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const usernameInput = event.target.value.toLowerCase();
        if (usernameInput.length < 3) {
            setError(true)
        } else {
            setUsername(usernameInput);
        }

        const pattern = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9._](?:_[a-zA-Z0-9]{1,3})?$/;

        if (!pattern.test(usernameInput)) {
            setUsernameMessage('Username tidak valid');
        } else {
            setUsernameMessage('');
        }
    }

    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 7) {
            setError(true)
            setPasswordMessage('Minimal 8 karakter')
        } else {
            setPassword(event.target.value)
            setPasswordMessage('')
        }
    }

    const fullNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        let inputValue = event.target.value.trim();

        // Check if input starts with "KH.", "HA.", or "HM."
        if (inputValue.startsWith("KH.") || inputValue.startsWith("HA.") || inputValue.startsWith("HM.")) {
            // Uppercase "KH.", "HA.", or "HM."
            inputValue = inputValue.substring(0, 3).toUpperCase() + inputValue.substring(3);
            // Capitalize the rest of the string
            inputValue = inputValue
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        } else {
            // If it doesn't start with "KH.", "HA.", or "HM.", then just capitalize the whole string
            inputValue = inputValue
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }

        if (inputValue.length < 3) {
            setError(true)
        } else {
            setFullName(inputValue)
        }
    }

    const genderHandler = (id: string, text: string) => {
        if (!id) {
            setError(true)
        } else {
            setGender(id)
            setError(false)
        }
    }

    const aliveHandler = (id: string, text: string) => {
        if (!id) {
            setError(true)
        } else {
            setBaniDisable(false)
        }
        if (text === 'Hidup' || id === '1') {
            setIsAlive(true)
        } else {
            setIsAlive(false)
        }
    }

    useEffect(() => {
        if (selected.length === 0) {
            setError(true)
        } else {
            setError(false)
        }
    }, [isSelected])

    const signUpButton = async () => {
        setIsLoading(true)
        fetchRegister()
    }

    return (
        <>
            <LayoutSideBlank>
                <div onClick={() => navigate(-1)} className="flex flex-row gap-1 mt-4 md:mt-0 font-bold text-2xl items-center cursor-pointer hover:text-white">
                    <RiArrowLeftSLine className="text-3xl" />
                    <h1 className="mr-3">Registrasi</h1>
                </div>
                <div className="flex flex-col my-12">
                    <div className="flex flex-col px-6 py-12 mx-auto text-center rounded-lg border border-gray-500 bg-base-200 shadow relative w-full">
                        <h3 className="mb-4 text-2xl font-bold">
                            Registrasi User Baru
                        </h3>
                        <p className="font-light text-md">
                            Isi data di bawah ini sesuai panduan.
                        </p>
                        <div className="flex justify-center items-baseline my-2">
                        </div>
                        <div className="my-4 space-y-4 text-left text-sm">
                            <div className="relative">
                                <h1 className="ml-2 pb-4">Username</h1>
                                <Input
                                    className="text-sm"
                                    placeholder="Username"
                                    onChange={usernameHandler} />
                                <span className="absolute text-xs italic text-red-500 -bottom-7 right-2">{usernameMessage}</span>
                            </div>
                            <div className="relative">
                                <h1 className="ml-2 pb-4">Password</h1>
                                <Input
                                    className="text-sm"
                                    type="Password"
                                    placeholder="Password"
                                    onChange={passwordHandler} />
                                <span className="absolute text-xs italic text-red-500 -bottom-7 right-2">{passwordMessage}</span>
                            </div>
                            <h1 className="ml-2">Nama Lengkap</h1>
                            <Input
                                className="text-sm"
                                placeholder="Nama Lengkap"
                                onChange={fullNameHandler} />
                            <h1 className='ml-2 -mb-2'>Jenis Kelamin</h1>
                            <DropdownOption
                                onClicked={genderHandler}
                                label='Jenis Kelamin'
                                data={genderOption} />
                            <h1 className='ml-2 -mb-2'>Status Kehidupan</h1>
                            <DropdownOption
                                onClicked={aliveHandler}
                                label='Status Kehidupan'
                                data={aliveList} />
                            <h1 className='ml-2 -mb-2'>Pilih Bani</h1>
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {baniList.map((data) => (
                                    <input
                                        id={data.id}
                                        type="checkbox"
                                        value={data.id}
                                        checked={isSelected(data.id)}
                                        disabled={baniDisable}
                                        onChange={onChange}
                                        className="join-item btn text-xs bg-gray-800 rounded-lg"
                                        name="options"
                                        aria-label={data.bani_name} />
                                ))}
                            </div>
                        </div>
                        <Button
                            onClick={signUpButton}
                            disabled={isLoading || error}
                            variant="primary"
                            className="cursor-pointer mt-4"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                'Registrasi User Baru'
                            )}
                        </Button>
                    </div>
                </div>
            </LayoutSideBlank>
        </>
    )
}

export default AdminUserCreatorScreen