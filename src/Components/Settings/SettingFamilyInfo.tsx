import React, { useState } from 'react'
import Input from '../Ui/Input'
import Button from '../Ui/Button'
import SettingItems from '../Ui/SettingItems';

type Props = {
    onClicked?: (
        
    ) => void;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SettingFamilyInfo = ({ onClicked, onClick }: Props) => {

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold pl-1">Informasi Hubungan Keluarga</h1>
            <h1 className='text-sm mb-4 pl-1'>Silakan ubah kata sandi Anda.</h1>
            <div className='border-b border-gray-600'></div>
            <SettingItems
                size='small'
                label='Nama'
                item='Yusuf Fadlulloh'
            />
            <div className='border-b border-gray-600'></div>
            <SettingItems
                size='small'
                label='Wali'
                item='Yusuf Fadlulloh'
            />
            <div className='border-b border-gray-600'></div>
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

export default SettingFamilyInfo