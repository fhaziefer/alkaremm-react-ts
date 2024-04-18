import React, { useEffect, useState } from 'react'
import Input from '../Ui/Input'
import Button from '../Ui/Button'
import DropdownOption from '../Ui/DropdownOption';

type Props = {
    onClicked?: () => void;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    avatar?: string
};

const SettingProfileInfo = ({ onClicked, onClick, ...props }: Props) => {

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const gender = [
        {
            "id": "MALE",
            "text": "Laki-laki"
        },
        {
            "id": "FEMALE",
            "text": "Perempuan"
        }
    ]

    const handleButton = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (onClicked) {
                onClicked()
                setError(false);
                setIsLoading(false);
            }
        }, 3000);
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setError(false);
        if (onClick) {
            onClick(event);
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold pl-1 mb-4">Informasi Profil</h1>

            <div className="flex flex-col gap-4">

                <div className='flex-row flex h-24'>
                    <div className="avatar p-1 cursor-pointer w-24  relative ">
                        <div className="rounded-full hover:ring ring-offset-base-100 ring-offset-2 hover:ring-primary">
                            <img src={props.avatar} />
                        </div>
                    </div>
                    <div className='flex flex-col ml-4 w-[67%] gap-2'>
                    <div className='h-7 flex flex-row gap-4  items-center'>
                        <span className='text-sm cursor-pointer text-primary hover:font-bold'>Update</span>
                        <span className='text-sm cursor-pointer text-error hover:font-bold'>Remove</span>
                    </div>
                        <span className='text-xs text-justify w-full'>Gunakan format JPG atau PNG dengan bentuk persegi, minimal 1.000 piksel per sisi. Maksimal 1 Mb.</span>
                    </div>
                </div>

                <h1 className='text-xs pl-1 -mb-2'>Nama Lengkap</h1>
                <Input
                    type='text'
                    onChange={handleInput}
                    className='text-sm'
                    placeholder="Nama Lengkap"
                />
                <h1 className='text-xs pl-1 -mb-2'>Jenis Kelamin</h1>
                <DropdownOption
                    label='Jenis Kelamin'
                    data={gender} />
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