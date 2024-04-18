import { useState, ReactEventHandler } from 'react'
import Button from '../Ui/Button'
import Input from '../Ui/Input'

type Props = {
    onClicked?: (
        phone?: string | undefined,
        instagram?: string | undefined
    ) => void;
    onClick?: ReactEventHandler | undefined;
}

const SettingContact = ({ ...props }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [phone, setPhone] = useState('')
    const [instagram, setInstagram] = useState('')

    const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneInput = event.target.value;
        const pattern = /^[1-9][0-9]{8,10}$/;

        if (!pattern.test(phoneInput)) {
            setError(true);
            setErrorMessage('Nomor tidak Valid');
        } else {
            setPhone(`+62${phoneInput}`);
            setError(false);
            setErrorMessage('');
        }
    }

    const handleInstagramInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInstagram(event.target.value)
        if (event.target.value.length < 3) {
            setError(false)
        }
    }

    const handleButton = () => {
        //! SET API HERE
        setIsLoading(true)
        setTimeout(() => {
            if (props.onClicked) {
                props.onClicked(phone, instagram);
                setErrorMessage('');
                setError(true)
                setIsLoading(false)
            }
        }, 5000);
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPhone('')
        setInstagram('')
        setErrorMessage('')
        setError(true)
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1
                className='text-3xl font-bold pl-1'>
                Informasi Kontak
            </h1>
            <h1
                className='text-sm mb-4 pl-1'>
                Silakan perbarui nomor WhatsApp dan akun Instagram Anda untuk memastikan informasi kontak yang akurat dan terkini.
            </h1>

            <div className='flex flex-col gap-4'>

            <h1 className='text-xs pl-1 -mb-2'>Nomor WhatsApp</h1>
                
                <label className="input input-bordered flex items-center relative">
                    <div className='w-10 h-full flex items-center'>
                        <span className='font-bold text-white text-end'>+62</span>
                    </div>
                    <Input
                        type='text'
                        onChange={handlePhoneInput}
                        className='w-[90%]'
                        variant='join'
                        placeholder='Nomor WhatsApp'
                    />
                    {error && <span className="label-text-alt text-red-500 absolute right-0 pr-4">{errorMessage}</span>}
                </label>

                <h1 className='text-xs pl-1 -mb-2'>Instagram</h1>
                <label className="input input-bordered flex items-center relative">
                    <div className='w-10 h-full flex items-center'>
                        <span className='font-bold text-white'>@</span>
                    </div>
                    <Input
                        onChange={handleInstagramInput}
                        className='w-[90%]'
                        variant='join'
                        placeholder='Instagram'
                    />
                    <span className="label-text-alt text-gray-600 absolute right-0 pr-4">(oposional)</span>
                </label>

            </div>
            <p className='text-xs mb-4 pl-1 text-justify'><strong className='text-gray-200'>Note: </strong>Untuk memastikan keakuratan informasi kontak, pengisian nomor WhatsApp diperlukan. Jika tidak ada, mohon berikan nomor WhatsApp orang tua atau kontak terdekat yang dapat dihubungi. Penambahan akun Instagram bersifat opsional, dapat dikosongkan jika tidak dimiliki.</p>
            <div
                className='flex-row flex w-full justify-between my-6'>
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
                    {isLoading ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        'Konfirmasi'
                    )}
                </Button>
            </div>
        </div>
    )
}

export default SettingContact