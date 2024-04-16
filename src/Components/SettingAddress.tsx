import DropdownOption from './Ui/InputWithSearch';
import { useEffect, useState } from 'react';
import { IGetAddress, IReqAddress } from '../Types/Address/GetAddress';
import { apiCity, apiDistrict, apiPostal, apiProvince, apiVillage } from '../Services/Api/AddressApi/addressApi';
import Input from './Ui/Input';

const SettingAddress = () => {

    const [isLoading, setIsLoading] = useState(true)
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

    const [provinceId, setProvinceId] = useState('1000')
    const [provinceText, setProvinceText] = useState('')
    const [cityId, setCityId] = useState('1000')
    const [cityText, setCityText] = useState('')
    const [districtId, setDistrictId] = useState('1000')
    const [districtText, setDistrictText] = useState('')
    const [villageId, setVillageId] = useState('')
    const [villageText, setVillageText] = useState('')
    const [postalId, setPostalId] = useState('')
    const [postalText, setPostalText] = useState('')
    const [streetText, setStreetText] = useState('')

    const getProvince = async () => {
        setIsLoading(true)
        const address = await apiProvince()
        if (address.data.result.length === 0) {
            console.log('Data tidak ditemukan')
            setIsLoading(false)
            return
        } else {
            setProvince(address.data)
            getCity()
            setIsLoading(false)
        }
    }

    const getCity = async () => {
        setIsLoading(true)
        const address = await apiCity({ query: provinceId })
        if (address.data.result.length === 0) {
            console.log('Data tidak ditemukan')
            setIsLoading(false)
            return
        } else {
            setCity(address.data)
            getDistrict()
            setIsLoading(false)
        }
    }

    const getDistrict = async () => {
        setIsLoading(true)
        const address = await apiDistrict({ query: cityId })
        if (address.data.result.length === 0) {
            console.log('Data tidak ditemukan')
            setIsLoading(false)
            return
        } else {
            setDistrict(address.data)
            getVillage()
            setIsLoading(false)
        }
    }

    const getVillage = async () => {
        setIsLoading(true)
        const address = await apiVillage({ query: districtId })
        if (address.data.result.length === 0) {
            console.log('Data tidak ditemukan')
            setIsLoading(false)
            return
        } else {
            setVillage(address.data)
            getPostal()
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
    }, [provinceId, cityId, districtId])

    const handleProvince = (id: string, text: string) => {
        setProvinceId(id)
        setProvinceText(text)
        if (!id) {
            setCityDisable(true)
        } else {
            setCityDisable(false)
        }
    }

    const handleCity = (id: string, text: string) => {
        setCityId(id)
        setCityText(text)
        if (!id) {
            setDistrictDisable(true)
        } else {
            setDistrictDisable(false)
        }
    }

    const handleDistrict = (id: string, text: string) => {
        setDistrictId(id)
        setDistrictText(text)
        if (!id) {
            setVillageDisable(true)
        } else {
            setVillageDisable(false)
        }
    }

    const handleVillage = (id: string, text: string) => {
        setVillageId(id)
        setVillageText(text)
        if (!id) {
            setPostalDisable(true)
        } else {
            setPostalDisable(false)
        }
    }

    const handlePostal = (id: string, text: string) => {
        setPostalId(id)
        setPostalText(text)
        if (!id) {
            setStreetDisable(true)
        } else {
            setStreetDisable(false)
        }
    }

    const handleQuery = (event: any) => {
        const streetInput = event.value
        setStreetText(streetInput);
    }

    return (
        <>
            <div className='flex flex-col gap-4'>
                <DropdownOption loading={isLoading} onClicked={handleProvince} data={province?.result} label='Provinsi' />
                <DropdownOption disabled={cityDisable} loading={isLoading} onClicked={handleCity} data={city?.result} label='Kabupaten/Kota' />
                <DropdownOption disabled={districtDisable} loading={isLoading} onClicked={handleDistrict} data={district?.result} label='Kecamatan' />
                <DropdownOption disabled={villageDisable} loading={isLoading} onClicked={handleVillage} data={village?.result} label='Desa' />
                <DropdownOption disabled={postalDisable} loading={isLoading} onClicked={handlePostal} data={postal?.result} label='Kode Pos' />
                {streetDisable ? <Input disabled onChange={(e) =>
                    handleQuery(
                        (e.target as HTMLInputElement)
                    )} placeholder='Jalan, gedung, dll..' /> : <Input onChange={(e) =>
                        handleQuery(
                            (e.target as HTMLInputElement)
                        )} placeholder='Jalan, gedung, dll..' /> }

                <ul className='pt-12 text-xl font-bold flex flex-col gap-4'>
                    <li><span>Provinsi: </span><span>{provinceText}</span></li>
                    <li><span>Kota/Kabupaten: </span><span>{cityText}</span></li>
                    <li><span>Kecamatan: </span><span>{districtText}</span></li>
                    <li><span>Desa: </span><span>{villageText}</span></li>
                    <li><span>Kode Pos: </span><span>{postalText}</span></li>
                    <li><span>Alamat: </span><span>{streetText}</span></li>
                </ul>
            </div>
        </>
    )
}

export default SettingAddress