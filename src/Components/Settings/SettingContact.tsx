import { useState, ReactEventHandler } from 'react'
import Button from '../Ui/Button'
import Input from '../Ui/Input'
import { apiGetContactCurrent } from '../../Services/Api/AlkareemApi/get';
import { apiCreateContact } from '../../Services/Api/AlkareemApi/post';
import { apiChangeContact, apiChangePhone } from '../../Services/Api/AlkareemApi/patch';

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    token?: string;
    id?: string;
    isAdmin?: boolean;
};

const SettingContact = ({ isAdmin=false, token, onCancel, onConfirm, ...props }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [phone, setPhone] = useState('')
    const [instagram, setInstagram] = useState('')

    const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneInput = event.target.value;
        const pattern = /^[1-9][0-9]{8,11}$/;

        if (!pattern.test(phoneInput)) {
            setError(true);
            setErrorMessage('Nomor tidak Valid');
        } else {
            setPhone(`62${phoneInput}`);
            setError(false);
            setErrorMessage('');
        }
    }

    const handleInstagramInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInstagram(event.target.value)
        if (event.target.value.length < 3 && phone.length !== 0) {
            setError(false)
        }
    }

    const resetInput = () => {
        setInstagram('')
        setPhone('')
        setError(true)
        setIsLoading(false)
    }

    const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        //! SET API HERE
        setIsLoading(true)
        if (onConfirm) {
            try {
                const checkContact = await apiGetContactCurrent({ token: token })
                if (checkContact.status !== 200) {
                    const createContact = await apiCreateContact({ token: token, phone: phone, instagram: instagram })
                    if (createContact.status !== 200) {
                        setError(true)
                        setErrorMessage('Gagal memperbaharui, coba sekali lagi')
                    } else {
                        onConfirm(event)
                        resetInput()
                    }
                } else {
                    if (instagram.length === 0) {
                        const changePhone = await apiChangePhone({ token: token, phone: phone })
                        if (changePhone.status !== 200) {
                            setError(true)
                            setErrorMessage('Gagal memperbaharui, coba sekali lagi')
                        } else {
                            onConfirm(event)
                            resetInput()
                        }
                    } else {
                        const changeContact = await apiChangeContact({ token: token, phone: phone, instagram: instagram })
                        if (changeContact.status !== 200) {
                            setError(true)
                            setErrorMessage('Gagal memperbaharui, coba sekali lagi')
                        } else {
                            onConfirm(event)
                            resetInput()
                        }
                    }
                }
            } catch (error) {
                setError(true)
                setErrorMessage('Gagal memperbaharui, coba sekali lagi')
            }
            setIsLoading(false);
        }
    }


    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onCancel) {
            resetInput()
            onCancel(event);
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