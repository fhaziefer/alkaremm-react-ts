import React, { useEffect, useState } from 'react'
import Input from '../Ui/Input'
import Button from '../Ui/Button'
import DropdownOption from '../Ui/DropdownOption';
import { useLocalStorage } from '../../Hooks/useLocalStorage';

type Props = {
    onClicked?: (
        name: string,
        gender: string,
        avatarUrl: string
    ) => void;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    avatarNow?: string
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

const SettingProfileInfo = ({ onClicked, onClick, ...props }: Props) => {

    const [error, setError] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState({ preview: "", raw: "" });
    const [avatarUrl, setAvatarUrl] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')

    const { getItem } = useLocalStorage()
    const userDataFromLocal = getItem('USER_DATA')
    const userGender = userDataFromLocal?.data.profil?.gender

    const handleChangeAvatar = () => {

    }

    const handleRemoveAvatar = () => {
        setError(false)
        if (userGender === 'FEMALE') {
            alert('user is female')
        } else if (userGender === 'MALE') {
            alert('user is male')
        } else {
            alert('user is unknown')
        }
    }

    const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        console.log(inputValue)
        setError(false)
        setName(inputValue)
    };

    const handleGenderInput = (
        id: string
    ) => {
        console.log(id)
        setGender(id)
        setError(false)
    }

    const handleButton = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (onClicked) {
                setName('')
                setGender('')
                onClicked(name, gender, avatarUrl)
                setError(true);
                setIsLoading(false);
            }
        }, 3000);
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setName('')
        setGender('')
        setError(true)
        if (onClick) {
            onClick(event);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold pl-1 mb-4">Informasi Profil</h1>

            <div className="flex flex-col gap-4">

                <div className='flex-row flex h-24'>
                    <div className="avatar p-1 cursor-pointer w-24  relative ">
                        <div className="rounded-full hover:ring ring-offset-base-100 ring-offset-2 hover:ring-primary">
                            <img src={props.avatarNow} />
                        </div>
                    </div>
                    <div className='flex flex-col ml-4 w-[67%] gap-2'>
                        <div className='h-7 flex flex-row gap-4 items-center'>
                            <label htmlFor="upload-button" className='text-sm cursor-pointer text-primary hover:font-bold'>Update</label>
                            <span onClick={handleRemoveAvatar} className='text-sm cursor-pointer text-error hover:font-bold'>Remove</span>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleChangeAvatar}
                            />
                        </div>
                        <span className='text-xs text-justify w-full'>Gunakan format JPG atau PNG dengan bentuk persegi, minimal 1.000 piksel per sisi. Maksimal 1 Mb.</span>
                    </div>
                </div>

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