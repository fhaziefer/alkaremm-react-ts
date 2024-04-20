import DropdownOption from '../Ui/DropdownOption';
import { ReactEventHandler, useEffect, useState } from 'react';
import { IGetAddress } from '../../Types/Address/GetAddress';
import { apiCity, apiDistrict, apiPostal, apiProvince, apiVillage } from '../../Services/Api/AddressApi/addressApi';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiChangeAddress } from '../../Services/Api/AlkareemApi/patch';
import { apiCreateAddress } from '../../Services/Api/AlkareemApi/post';
import { apiGetAddressCurrent } from '../../Services/Api/AlkareemApi/get';

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SettingAddress = ({ onConfirm, onCancel, ...props }: Props) => {

    const { getItem } = useLocalStorage()
    const token = getItem('token')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const [provinceDisable, setProvinceDisable] = useState(true)
    const [cityDisable, setCityDisable] = useState(true)
    const [districtDisable, setDistrictDisable] = useState(true)
    const [villageDisable, setVillageDisable] = useState(true)
    const [postalDisable, setPostalDisable] = useState(true)
    const [streetDisable, setStreetDisable] = useState(true)

    const [province, setProvince] = useState<IGetAddress | null>(null)
    const [city, setCity] = useState<IGetAddress | null>(null)
    const [district, setDistrict] = useState<IGetAddress | null>(null)
    const [village, setVillage] = useState<IGetAddress | null>(null)
    const [postal, setPostal] = useState<IGetAddress | null>(null)

    const [provinceId, setProvinceId] = useState('')
    const [provinceText, setProvinceText] = useState('')
    const [cityId, setCityId] = useState('')
    const [cityText, setCityText] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [districtText, setDistrictText] = useState('')
    const [villageId, setVillageId] = useState('')
    const [villageText, setVillageText] = useState('')
    const [postalId, setPostalId] = useState('')
    const [postalText, setPostalText] = useState('')
    const [streetText, setStreetText] = useState('')

    const getProvince = async () => {
        setIsLoading(true)
        const address = await apiProvince()
        if (address.status !== 200) {
            setIsLoading(false)
            setProvinceDisable(false)
            return
        } else if (address.data.result.length === 0) {
            setErrorMessage('Data tidak ditemukan, periksa koneksi internet Anda')
            setIsLoading(false)
            setProvinceDisable(false)
            return
        } else {
            setProvince(address.data)
            setProvinceDisable(false)
            setIsLoading(false)
        }
    }

    const getCity = async () => {
        setIsLoading(true)
        const address = await apiCity({ id: provinceId })
        if (address.data.result.length === 0) {
            setErrorMessage('Data tidak ditemukan, periksa koneksi internet Anda')
            setIsLoading(false)
            return
        } else {
            setCity(address.data)
            setIsLoading(false)
        }
    }

    const getDistrict = async () => {
        setIsLoading(true)
        const address = await apiDistrict({ id: cityId })
        if (address.data.result.length === 0) {
            setErrorMessage('Data tidak ditemukan, periksa koneksi internet Anda')
            setIsLoading(false)
            return
        } else {
            setDistrict(address.data)
            setIsLoading(false)
        }
    }

    const getVillage = async () => {
        setIsLoading(true)
        const address = await apiVillage({ id: districtId })
        if (address.data.result.length === 0) {
            setErrorMessage('Data tidak ditemukan, periksa koneksi internet Anda')
            setIsLoading(false)
            return
        } else {
            setVillage(address.data)
            setIsLoading(false)
        }
    }

    const getPostal = async () => {
        setIsLoading(true)
        const address = await apiPostal({ cityId: cityId, districtId: districtId })
        if (address.data.result.length === 0) {
            setErrorMessage('Data tidak ditemukan, periksa koneksi internet Anda')
            setIsLoading(false)
            return
        } else {
            setPostal(address.data)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProvince()

        if (provinceId) {
            getCity()
            setCityDisable(false)
        }

        if (cityId) {
            getDistrict()
            setDistrictDisable(false)
        }

        if (districtId) {
            getVillage()
            setVillageDisable(false)
        }

        if (villageId) {
            setPostalDisable(false)
            getPostal()
            setStreetDisable(false)
        }

    }, [provinceId, cityId, districtId, villageId, postalId])

    const handleProvince = (id: string, text: string) => {
        setProvinceId(id)
        setProvinceText(text)
    }

    const handleCity = (id: string, text: string) => {
        setCityId(id)
        setCityText(text)
    }

    const handleDistrict = (id: string, text: string) => {
        setDistrictId(id)
        setDistrictText(text)
    }

    const handleVillage = (id: string, text: string) => {
        setVillageId(id)
        setVillageText(text)
    }

    const handlePostal = (id: string, text: string) => {
        setPostalId(id)
        setPostalText(text)
    }

    const handleStreet = (event: any) => {
        const streetInput = event.value;
        if (streetInput.length > 49) {
            setError(true);
            setErrorMessage('Nama Jalan/Nama Gedung tidak boleh lebih dari 50 karakter');
        } else if (streetInput.length < 8) {
            setError(true);
            setErrorMessage('Nama Jalan/Nama Gedung tidak valid');
        } else {
            setError(false);
            setErrorMessage('');
        }
        setStreetText(streetInput);
    }

    const resetDropdowns = () => {
        setProvinceId('');
        setProvinceText('');
        setCityId('');
        setCityText('');
        setDistrictId('');
        setDistrictText('');
        setVillageId('');
        setVillageText('');
        setPostalId('');
        setPostalText('');
        setStreetText('');
        setCityDisable(true);
        setDistrictDisable(true);
        setVillageDisable(true);
        setPostalDisable(true);
        setStreetDisable(true);
        setError(true)
    }

    const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);

        const street = streetText;
        const village = villageText;
        const district = districtText;
        const city = cityText;
        const province = provinceText;
        const postal = postalText;

        if (onConfirm) {
            try {
                const checkAddressResponse = await apiGetAddressCurrent({ token });

                if (checkAddressResponse.status !== 200) {
                    const createAddressResponse = await apiCreateAddress({ token, province, city, district, village, postal_code: postal, street });

                    if (createAddressResponse.status !== 200) {
                        setErrorMessage('Gagal memperbaharui alamat, coba sekali lagi');
                        setError(true);
                    } else {
                        onConfirm(event);
                        resetDropdowns();
                    }
                } else {
                    const changeAddressResponse = await apiChangeAddress({ token, province, city, district, village, postal_code: postal, street });

                    if (changeAddressResponse.status === 403) {
                        const createAddressResponse = await apiCreateAddress({ token, province, city, district, village, postal_code: postal, street });

                        if (createAddressResponse.status !== 200) {
                            setErrorMessage('Gagal memperbaharui alamat, coba sekali lagi');
                            setError(true);
                        } else {
                            onConfirm(event);
                            resetDropdowns();
                        }
                    } else if (changeAddressResponse.status === 400) {
                        setErrorMessage('Gagal memperbaharui alamat, coba sekali lagi');
                        setError(true);
                    } else {
                        onConfirm(event);
                        resetDropdowns();
                    }
                }
            } catch (error) {
                setErrorMessage('Gagal memperbaharui alamat, coba sekali lagi');
                setError(true);
            }

            setIsLoading(false);
        }
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onCancel) {
            resetDropdowns()
            onCancel(event);
        }
    }

    return (
        <>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold pl-1'>Informasi Alamat</h1>
                <h1 className='text-sm mb-4 pl-1'>Silakan pastikan alamat Anda sesuai dengan data alamat yang valid!</h1>

                <h1 className='text-xs pl-1 -mb-2'>Provinsi</h1>
                <DropdownOption
                    disabled={provinceDisable}
                    loading={isLoading}
                    onClicked={handleProvince}
                    data={province?.result}
                    label='Provinsi' />

                <h1 className='text-xs pl-1 -mb-2'>Kota/Kabupaten</h1>
                <DropdownOption
                    disabled={cityDisable}
                    loading={isLoading}
                    onClicked={handleCity}
                    data={city?.result}
                    label='Kota/Kabupaten' />

                <h1 className='text-xs pl-1 -mb-2'>Kecamatan</h1>
                <DropdownOption
                    disabled={districtDisable}
                    loading={isLoading}
                    onClicked={handleDistrict}
                    data={district?.result}
                    label='Kecamatan' />

                <h1 className='text-xs pl-1 -mb-2'>Desa/Kelurahan</h1>
                <DropdownOption
                    disabled={villageDisable}
                    loading={isLoading}
                    onClicked={handleVillage}
                    data={village?.result}
                    label='Desa/Kelurahan' />

                <h1 className='text-xs pl-1 -mb-2'>Kode Pos</h1>
                <DropdownOption
                    disabled={postalDisable}
                    loading={isLoading}
                    onClicked={handlePostal}
                    data={postal?.result}
                    label='Kode Pos' />

                <h1 className='text-xs pl-1 -mb-2'>Nama Jalan/Gedung</h1>
                {streetDisable ? <Input disabled onChange={(e) =>
                    handleStreet(
                        (e.target as HTMLInputElement)
                    )} placeholder='Nama Jalan/Gedung' /> : <Input onChange={(e) =>
                        handleStreet(
                            (e.target as HTMLInputElement)
                        )} placeholder='Nama Jalan/Gedung' />}
                <div className='relative mb-4'>
                    {error ? <span className="label-text-alt text-red-500 absolute right-0 -bottom-4 pr-1">{errorMessage}</span> : <span className="label-text-alt absolute right-0 -bottom-4 pr-1">Contoh: <i>Jl. KH. Abdul Karim Ponpes Lirboyo</i></span>}
                </div>
                <p className='text-xs mb-4 pl-1 text-justify'><strong className='text-gray-200'>Note: </strong>Untuk memastikan keakuratan informasi alamat Anda, harap lengkapi semua detail yang diperlukan, termasuk nama jalan atau nama gedung, desa/kelurahan, kecamatan, kota/kabupaten, provinsi, dan kode pos. Hal ini akan membantu dalam memastikan bahwa alamat Anda dapat diakses dengan mudah dan akurat.</p>

                <div className='flex-row flex w-full justify-between my-6'>
                    <Button
                        onClick={handleCancel}
                        variant='ghost'
                        className='w-[49%]'>
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
        </>
    )
}

export default SettingAddress