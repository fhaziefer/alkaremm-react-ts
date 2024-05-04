import React, { useEffect, useState } from 'react'
import Input from '../Ui/Input'
import Button from '../Ui/Button'
import DropdownOption from '../Ui/DropdownOption';
import { apiGetProfile } from '../../Services/Api/AlkareemApi/get';
import { apiCreateProfile } from '../../Services/Api/AlkareemApi/post';
import { apiChangeProfileInfo } from '../../Services/Api/AlkareemApi/patch';
import { apiAdminGetProfileById } from '../../Services/Api/AlkareemApi/Admin/get';
import { apiCreateProfileAdmin } from '../../Services/Api/AlkareemApi/Admin/post';
import { apiChangeProfileInfoAdmin } from '../../Services/Api/AlkareemApi/Admin/patch';

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    token?: string;
    id?: string;
    isAdmin?: boolean;
};

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

const SettingProfileInfo = ({ isAdmin = false, token, onConfirm, onCancel, ...props }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')

    const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        setName(inputValue);
    };


    const handleGenderInput = (
        id: string, text: string
    ) => {
        setGender(id)
    }

    useEffect(() => {
        if (name.length !== 0 && gender.length !== 0) {
            setError(false)
        }
    }, [name, gender])

    const resetInput = () => {
        setError(true)
        setName('')
        setGender('')
    }

    const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        if (onConfirm) {
            if (isAdmin === true) {
                var checkProfile = await apiAdminGetProfileById({ token: token, userId: props.id })
            } else {
                var checkProfile = await apiGetProfile({ token: token })
            }
            if (checkProfile.status !== 200) {
                if (isAdmin === true) {
                    var createProfile = await apiCreateProfileAdmin({ token: token, name: name, gender: gender, userId: props.id })
                } else {
                    var createProfile = await apiCreateProfile({ token: token, name: name, gender: gender })
                }
                if (createProfile.status !== 200) {
                    setIsLoading(false)
                    setError(true)
                    setErrorMessage('Gagal memperbaharui informasi profil, coba lagi.')
                } else {
                    onConfirm(event)
                    setIsLoading(false);
                    resetInput()
                }
            } else {
                if (isAdmin === true) {
                    var changeProfile = await apiChangeProfileInfoAdmin({ token: token, name: name, gender: gender, userId: props.id })
                } else {
                    var changeProfile = await apiChangeProfileInfo({ token: token, name: name, gender: gender })
                }
                console.log(changeProfile)
                if (changeProfile.status !== 200) {
                    setIsLoading(false)
                    setError(true)
                    setErrorMessage('Gagal memperbaharui informasi profil, coba lagi.')
                } else {
                    onConfirm(event)
                    setIsLoading(false);
                    resetInput()
                }
            }
        }
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setName('')
        setGender('')
        setError(true)
        if (onCancel) {
            onCancel(event);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold pl-1 mb-4">Informasi Profil</h1>

            <div className="flex flex-col gap-4">

                <h1 className='text-xs pl-1 -mb-2'>Nama Lengkap</h1>
                <Input
                    type='text'
                    onChange={handleNameInput}
                    className='text-sm'
                    placeholder="Nama Lengkap"
                />
                <h1 className='text-xs pl-1 -mb-2'>Jenis Kelamin</h1>
                <DropdownOption
                    onClicked={handleGenderInput}
                    label='Jenis Kelamin'
                    data={genderOption} />

            </div>

            <p className='text-xs mb-2 pl-1 text-justify'><strong className='text-gray-200'>Note: </strong>Silakan masukkan nama lengkap dan jenis kelamin sesuai dengan dokumen identitas resmi negara.</p>

            <div className="flex-row flex w-full justify-between my-6">
                <Button
                    onClick={handleCancel}
                    disabled={isLoading}
                    variant="ghost"
                    className="w-[49%]"
                >
                    Batal
                </Button>
                <Button
                    onClick={handleButton}
                    disabled={isLoading || error}
                    variant="primary"
                    className="w-[49%]"
                >
                    {isLoading ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        'Simpan'
                    )}
                </Button>
            </div>
        </div>
    )
}

export default SettingProfileInfo