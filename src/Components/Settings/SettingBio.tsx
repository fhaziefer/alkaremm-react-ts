import { ChangeEvent, ReactEventHandler, useState } from 'react';
import Button from '../Ui/Button';

type Props = {
    onClicked?: (bio: string) => void;
    bioNow?: string;
    bioValue?: string;
    onClick?: ReactEventHandler | undefined;
}

const SettingBio = ({ ...props }: Props) => {
    const [bio, setBio] = useState<string>(props.bioValue || '');
    const [charCount, setCharCount] = useState<number>(props.bioValue ? props.bioValue.length : 0);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
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
        }
    };

    const handleButton = () => {
        setIsLoading(true)
        const bioNew = bio
        //! SET API HERE
        setTimeout(() => {
            if (props.onClicked) {
                props.onClicked(bioNew);
                setErrorMessage('');
                setBio('')
                setIsLoading(false)
            }
        }, 5000);
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');
        setBio('')
        setCharCount(0)
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold pl-1'>Bio</h1>
            <h1 className='text-sm mb-4 pl-1'>Tulislah bio Anda, yang nantinya akan ditampilkan di halaman profil Anda.</h1>
            <div className='relative'>
                <textarea
                    className="textarea textarea-bordered w-full h-36 resize-none"
                    placeholder={props.bioNow}
                    value={bio}
                    onChange={handleBioChange}
                    maxLength={maxChars}
                />
                <div className='absolute bottom-0 w-full' >
                    <span className={`absolute bottom-0 right-0 pr-4 pb-7 text-xs ${isMaxCharsReached ? 'text-red-500' : ''}`}>
                        {charCount}/{maxChars}
                    </span>
                    <progress className={`progress w-full ${progressBarClass}`} value={charPercentage} max="100"></progress>
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
