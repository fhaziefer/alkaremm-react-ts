import DropdownOption from '../Ui/DropdownOption';
import { ReactEventHandler, useEffect, useState } from 'react';
import { IGetAddress } from '../../Types/Address/GetAddress';
import { apiCity, apiDistrict, apiPostal, apiProvince, apiVillage } from '../../Services/Api/AddressApi/addressApi';
import Input from '../Ui/Input';
import Button from '../Ui/Button';

type Props = {
    onClicked?: (
        street: string,
        village: string,
        district: string,
        city: string,
        province: string,
        postal: string
    ) => void;
    streetNow?: string
    villageNow?: string
    districtNow?: string
    cityNow?: string
    provinceNow?: string
    postalNow?: string
    onClick?: ReactEventHandler;
};

const SettingAddress = ({ ...props }: Props) => {

    const [isLoading, setIsLoading] = useState(true)

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
        setProvinceDisable(true)
        const address = await apiProvince()
        if (address.status !== 200) {
            setIsLoading(false)
            setProvinceDisable(false)
            return
        } else if (address.data.result.length === 0) {
            console.log('Data tidak ditemukan')
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
            console.log('Data tidak ditemukan')
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
            console.log('Data tidak ditemukan')
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
            console.log('Data tidak ditemukan')
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
            console.log('Data tidak ditemukan')
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
            getPostal()
            setPostalDisable(false)
        }

        if (postalId) {
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
        const streetInput = event.value
        setStreetText(streetInput);
    }

    const handleButton = () => {
        //! SET API HERE
        const street = streetText
        const village = villageText
        const district = districtText
        const city = cityText
        const province = provinceText
        const postal = postalText
        if (props.onClicked) {
            props.onClicked(street, village, district, city, province, postal);
        }
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold pl-1'>Informasi Alamat</h1>
                <h1 className='text-sm mb-4 pl-1'>Sesuaikan alamat Anda dengan data alamat yang valid!</h1>
                <h1 className='text-sm pl-3'>Provinsi</h1>
                <DropdownOption disabled={provinceDisable} loading={isLoading} onClicked={handleProvince} data={province?.result} label={props.provinceNow || 'Belum diatur'} />
                <h1 className='text-sm pl-3'>Kota/Kabupaten</h1>
                <DropdownOption disabled={cityDisable} loading={isLoading} onClicked={handleCity} data={city?.result} label={props.cityNow || 'Belum diatur'} />
                <h1 className='text-sm pl-3'>Kecamatan</h1>
                <DropdownOption disabled={districtDisable} loading={isLoading} onClicked={handleDistrict} data={district?.result} label={props.districtNow || 'Belum diatur'} />
                <h1 className='text-sm pl-3'>Desa/Kelurahan</h1>
                <DropdownOption disabled={villageDisable} loading={isLoading} onClicked={handleVillage} data={village?.result} label={props.villageNow || 'Belum diatur'} />
                <h1 className='text-sm pl-3'>Kode Pos</h1>
                <DropdownOption disabled={postalDisable} loading={isLoading} onClicked={handlePostal} data={postal?.result} label={props.postalNow || 'Belum diatur'} />
                <h1 className='text-sm pl-3'>Nama jalan/gedung</h1>
                {streetDisable ? <Input disabled onChange={(e) =>
                    handleStreet(
                        (e.target as HTMLInputElement)
                    )} placeholder={props.streetNow || 'Belum diatur'} /> : <Input onChange={(e) =>
                        handleStreet(
                            (e.target as HTMLInputElement)
                        )} placeholder={props.streetNow || 'Belum diatur'} />}
                <div className='flex-row flex w-full justify-between my-6'>
                    <Button
                        onClick={handleCancel}
                        variant='ghost'
                        className='w-[49%]'>
                        Batal
                    </Button>
                    {streetText.length > 4 ?
                        <Button
                            onClick={handleButton}
                            variant='primary'
                            className='w-[49%]'>
                            Konfirmasi
                        </Button>
                        : <Button
                            className='w-[49%]'
                            disabled>
                            Konfirmasi
                        </Button>
                    }
                </div>
            </div>
        </>
    )
}

export default SettingAddress