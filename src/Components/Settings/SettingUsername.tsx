import { ReactEventHandler, useEffect, useState } from 'react';
import Input from '../Ui/Input';
import { LuAtSign } from "react-icons/lu";
import Button from '../Ui/Button';

type Props = {
    onClicked?: (
        usernameNew: string,
    ) => void;
    usernameNow?: string;
    onClick?: ReactEventHandler | undefined;
}

const SettingUsername = ({ ...props }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [usernameValue, setUsernameValue] = useState('')

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        const usernameInput = event.target.value.toLowerCase();

        setUsernameValue(usernameInput);

        const pattern = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9._](?:_[a-zA-Z0-9]{1,3})?$/;

        if (!pattern.test(usernameInput)) {
            setError(true);
            setErrorMessage('Username baru tidak valid');
        } else {
            setError(false);
            setErrorMessage('');
        }
    }

    const handleButton = () => {
        //! SET API HERE
        setIsLoading(true)
        const usenameNew = usernameValue
        setTimeout(() => {
            if (props.onClicked) {
                props.onClicked(usenameNew);
                setErrorMessage('');
                setUsernameValue('')
                setIsLoading(false)
            }
        }, 5000);
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');
        setUsernameValue('')
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold pl-1'>Username</h1>
            <h1 className='text-sm mb-4 pl-1'>Sesuaikan username Anda!</h1>
            <h1 className='text-sm -mb-2 pl-3'>Username</h1>
            <label className="input input-bordered flex items-center relative">
                <LuAtSign className='text-white' />
                <Input
                    onChange={handleInput}
                    className='w-[90%]'
                    variant='join'
                    placeholder={props.usernameNow || 'Belum diatur'}
                    value={usernameValue}
                />
                {error && <span className="label-text-alt text-red-500 absolute right-0 pr-4">{errorMessage}</span>}
            </label>
            <div className='flex-row flex w-full justify-between my-6'>
                <Button
                    onClick={handleCancel}
                    disabled={isLoading}
                    variant='ghost'
                    className='w-[49%]'
                >
                    Batal
                </Button>
                <Button
                    onClick={handleButton}
                    disabled={isLoading || error}
                    variant='primary'
                    className='w-[49%]'
                >
                    {isLoading ?
                        (
                            <span
                                className="loading loading-spinner loading-md">
                            </span>
                        ) : (
                            'Konfirmasi'
                        )}
                </Button>
            </div>

        </div>
    )
}

export default SettingUsername