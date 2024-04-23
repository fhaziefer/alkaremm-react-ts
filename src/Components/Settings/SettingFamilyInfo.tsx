import React, { useEffect, useState } from 'react'
import Button from '../Ui/Button'
import baniList from '../../JSON/selectBani.json'
import generasiList from '../../JSON/generasiOption.json'
import statusList from '../../JSON/statusOption.json'
import { useMultiselect } from '../../Hooks/useMultiSelect';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { apiGetBani, apiSearchProfile } from '../../Services/Api/AlkareemApi/get';
import { apiCreateBani } from '../../Services/Api/AlkareemApi/post';
import { apiDeleteBani } from '../../Services/Api/AlkareemApi/delete';
import DropdownOption from '../Ui/DropdownOption';
import AutoComplete from '../Ui/AutoComplete'
import { useDebounce } from '../../Hooks/useDebounce'
import { ISearchProfile } from '../../Types/Alkareem/RES/SearchProfile'

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SettingFamilyInfo = ({ onConfirm, onCancel }: Props) => {

    const { getItem } = useLocalStorage()
    const token = getItem('token')
    const [users, setUsers] = useState<ISearchProfile | null>(null);
    const [error, setError] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [generasiDisable, setGenerasiDisable] = useState(true)
    const [statusDisable, setStatusDisable] = useState(true)
    const [orangtuaDisable, setOrangtuaDisable] = useState(true)
    const [partnerDisable, setPartnerDisable] = useState(true)

    const [query, setQuery] = useState('')
    const [generasi, setGenerasi] = useState('')
    const [status, setStatus] = useState('')

    const debouncedQuery = useDebounce(query);

    const { selected, setSelected, isSelected, onChange } = useMultiselect([]);

    useEffect(() => {

        fetchSearchProfil()

        if (selected.length > 0) {
            setError(false)
            setGenerasiDisable(false)
        } else {
            setError(true)
            setGenerasiDisable(true)
            setStatusDisable(true)
        }

    }, [selected, debouncedQuery, status])

    const fetchAddBani = async () => {
        const numbers = ['1', '2', '3', '4', '5', '6', '7'];
        try {
            if (selected.length > 0) {
                for (const number of numbers) {

                    await apiDeleteBani({ token: token, baniId: number });

                }

                const checkBani = await apiGetBani({ token: token });

                if (checkBani.data.data.length === 0) {
                    for (const baniId of selected) {
                        const addBani = await apiCreateBani({ token: token, baniId: baniId });
                        if (addBani.status !== 200) {
                            throw new Error('Gagal memperbaharui data bani, coba sekali lagi');
                        }
                    }
                    setError(false);
                    setIsLoading(false);

                } else {
                    throw new Error('Gagal memperbaharui data bani, coba sekali lagi');
                }
            }
        } catch (error) {
            setError(true);
            setErrorMessage('Gagal memperbaharui data bani, coba sekali lagi');
            setIsLoading(false);
        }
    };

    const fetchSearchProfil = async () => {
        const profilData = await apiSearchProfile({ token: token, query: debouncedQuery })
        if (profilData.status !== 200) {
        } else {
            setUsers(profilData.data)
        }
    }

    const generasiHandler = (id: string, text: string) => {
        if (!id) {
            setStatusDisable(true)
        } else {
            setStatusDisable(false)
            setGenerasi(id)
        }
    }

    const statusHandler = (id: string, text: string) => {
        setStatus(id)
        if (id !== 'SINGLE') {
            setPartnerDisable(false)
        } else {
            setPartnerDisable(true)
        }
        if (!id) {
            setOrangtuaDisable(true)
        } else {
            setOrangtuaDisable(false)
        }
    }

    const orangtuaHandler = (id: string, text: string) => {
        console.log(`${id}, ${text}`)
    }

    const partnerHandler = (id: string, text: string) => {
        console.log(`${id}, ${text}`)
    }

    const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        if (onConfirm) {
            fetchAddBani().then(() => onConfirm(event)).catch(() => setIsLoading(false));
        }
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setError(true);
        if (onCancel) {
            setSelected([])
            onCancel(event);
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold pl-1 mb-9">Informasi Hubungan Keluarga</h1>

            <div className='flex flex-row justify-between gap-2 p-4 items-end'>
                {/* FORM BANI */}
                <div className='form-control w-[49%]'>
                    <h1 className='mb-2 text-sm'>Pilih Bani Anda</h1>
                    {baniList.map((data) => (
                        <label key={data.id} className="label cursor-pointer hover:text-gray-200">
                            <input
                                id={data.id}
                                type="checkbox"
                                value={data.id}
                                checked={isSelected(data.id)}
                                onChange={onChange}
                                className='checkbox checkbox-primary checkbox-xs'
                            />
                            <span className={`text-sm w-full ml-3 ${isSelected(data.id) ? 'text-gray-200' : ''}`}>{data.bani_name}</span>
                        </label>
                    ))}
                </div>

                <div className='flex w-[49%] flex-col gap-4'>
                    <div className='form-control'>
                        <h1 className='mb-2 text-sm'>Pilih generasi</h1>
                        <DropdownOption onClicked={generasiHandler} disabled={generasiDisable} data={generasiList.data} label='Generasi' />
                    </div>
                    <div className='form-control'>
                        <h1 className='mb-2 text-sm'>Pilih status pernikahan</h1>
                        <DropdownOption onClicked={statusHandler} disabled={statusDisable} data={statusList.data} label='Status' />
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <AutoComplete
                    index={2}
                    label='Pilih Orang tua'
                    disabled={orangtuaDisable}
                    placeholder='Orang tua'
                    helper='Orang tua dari keturunan KH. Abdul Karim'
                    onQueryChange={(e) => setQuery(e)}
                    data={users?.data}
                    onClicked={orangtuaHandler} />
            </div>
            <div className='p-4'>
                <AutoComplete
                    index={1}
                    label='Pilih Pasangan'
                    disabled={partnerDisable}
                    placeholder='Pasangan'
                    onQueryChange={(e) => setQuery(e)}
                    data={users?.data}
                    onClicked={partnerHandler} />
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