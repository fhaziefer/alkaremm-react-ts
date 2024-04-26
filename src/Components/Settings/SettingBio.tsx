import { ChangeEvent, useState } from 'react';
import { apiChangeBio } from '../../Services/Api/AlkareemApi/patch';
import Button from '../Ui/Button';

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    token?: string
    id?: string;
    isAdmin?: boolean;
}

const SettingBio = ({ isAdmin=false, token, onConfirm, onCancel, ...props }: Props) => {
    const [bio, setBio] = useState('')
    const [charCount, setCharCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const maxChars = 60;
    const isMaxCharsReached = charCount >= maxChars;
    const charPercentage = (charCount / maxChars) * 100;
    let progressBarClass = '';

    if (charPercentage >= 100) {
        progressBarClass = 'progress-error';
    } else if (charPercentage >= 70) {
        progressBarClass = 'progress-warning';
    } else {
        progressBarClass = 'progress-success';
    }

    const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newBio = event.target.value;
        if (newBio.length <= maxChars) {
            setBio(newBio);
            setCharCount(newBio.length);
            setError(false)
        }
    };

    const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true)
        const bioNew = bio
        //! SET API HERE
        if (onConfirm) {
            const changeBio = await apiChangeBio({ token: token, bio: bioNew })
            if (changeBio.status !== 200) {
                setErrorMessage('Gagal memperbaharui bio, coba ulangi.')
                setBio('')
                setIsLoading(false)
                setError(true)
            } else {
                onConfirm(event)
                setErrorMessage('');
                setBio('')
                setCharCount(0)
                setIsLoading(false)
            }
        }
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');
        setBio('')
        setCharCount(0)
        setError(true)
        if (onCancel) {
            onCancel(event);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold pl-1'>Bio</h1>
            <h1 className='text-sm mb-4 pl-1'>Tulislah bio Anda, yang nantinya akan ditampilkan di halaman profil Anda.</h1>
            <div className='relative'>
                <textarea
                    className="textarea textarea-bordered w-full h-36 resize-none"
                    placeholder='Bio'
                    value={bio}
                    onChange={handleBioChange}
                    maxLength={maxChars}
                />
                <div className='absolute bottom-4 w-full' >
                    <span className={`absolute bottom-0 right-0 pr-4 pb-7 text-xs ${isMaxCharsReached ? 'text-red-500' : ''}`}>
                        {charCount}/{maxChars}
                    </span>
                    <progress className={`progress w-full ${progressBarClass}`} value={charPercentage} max="100"></progress>
                </div>
                <div className='relative mb-4'>
                    {error && <span className="label-text-alt text-red-500 absolute right-0 -bottom-6 pr-1">{errorMessage}</span>}
                </div>
            </div>
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
    );
}

export default SettingBio;
