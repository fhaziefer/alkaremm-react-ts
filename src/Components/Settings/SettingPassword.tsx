import React, { useEffect, useState } from 'react';
import Button from '../Ui/Button';
import Input from '../Ui/Input';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiChangePassword } from '../../Services/Api/AlkareemApi/patch';
import { apiChangePasswordAdmin } from '../../Services/Api/AlkareemApi/Admin/patch';

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    token?: string
    id?: string;
    isAdmin?: boolean;
};

const SettingPassword = ({ isAdmin = false, token, onConfirm, onCancel, ...props }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };

    const handleRetypePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRetypePassword = event.target.value;
        setRetypePassword(newRetypePassword);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (password !== retypePassword) {
            setError(true);
            setErrorMessage('Kata Sandi dan Konfirmasi Kata Sandi tidak cocok');
            return;
        } else {
            setError(false)
        }

        if (password.length < 8) {
            setError(true);
            setErrorMessage('Kata Sandi harus terdiri dari minimal 8 karakter');
            return;
        } else {
            setError(false)
        }

    }, [password, retypePassword])

    const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        if (onConfirm) {
            if (isAdmin === true) {
                var changePassword = await apiChangePasswordAdmin({ token: token, password: retypePassword, userId:props.id })
            } else {
                var changePassword = await apiChangePassword({ token: token, password: retypePassword })
            }
            if (changePassword.status !== 200) {
                setErrorMessage('Gagal memperbaharui password, coba ulangi.')
                setPassword('');
                setRetypePassword('');
                setIsLoading(false)
                setError(true)
            } else {
                setPassword('');
                setRetypePassword('');
                setErrorMessage('');
                onConfirm(event)
                setIsLoading(false)
                setError(false)
            }
        }
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPassword('');
        setRetypePassword('');
        setErrorMessage('');
        setError(false);
        if (onCancel) {
            onCancel(event);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold pl-1">Keamanan</h1>
            <h1 className='text-sm mb-4 pl-1'>Silakan ubah kata sandi Anda.</h1>
            <div className="flex flex-col gap-4">
                <h1 className='text-xs pl-1 -mb-2'>Kata Sandi Baru</h1>
                <label className="input input-bordered flex items-center relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordInput}
                        className='w-[90%]'
                        variant='join'
                        placeholder="Kata Sandi Baru"
                    />
                    <div className='absolute right-0 pr-5'>
                        {showPassword ? (
                            <FaEyeSlash className='text-gray-200 cursor-pointer' onClick={toggleShowPassword} />
                        ) : (
                            <FaEye className='text-gray-200 cursor-pointer' onClick={toggleShowPassword} />
                        )}
                    </div>
                </label>
                <h1 className='text-xs pl-1 -mb-2'>Ulangi Kata Sandi Baru</h1>
                <label className="input input-bordered flex items-center relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={retypePassword}
                        onChange={handleRetypePasswordInput}
                        className='w-[90%]'
                        variant='join'
                        placeholder="Ulangi Kata Sandi Baru"
                    />
                    <div className='absolute right-0 pr-5'>
                        {showPassword ? (
                            <FaEyeSlash className='text-gray-200 cursor-pointer' onClick={toggleShowPassword} />
                        ) : (
                            <FaEye className='text-gray-200 cursor-pointer' onClick={toggleShowPassword} />
                        )}
                    </div>
                    {error && (
                        <span className="label-text-alt text-red-500 absolute right-1 -bottom-7">{errorMessage}</span>
                    )}
                </label>
            </div>
            <div className="flex-row flex w-full justify-between my-6">
                <Button
                    onClick={handleCancel}
                    disabled={isLoading}
                    variant="ghost"
                    className="w-[49%]"
                >
                    Batal
                </Button>
                {error ?
                    <Button
                        onClick={handleButton}
                        disabled
                        variant="primary"
                        className="w-[49%]"
                    >
                        Simpan
                    </Button>
                    :
                    <Button
                        onClick={handleButton}
                        disabled={isLoading}
                        variant="primary"
                        className="w-[49%]"
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            'Simpan'
                        )}
                    </Button>
                }
            </div>
        </div>
    );
};

export default SettingPassword;
