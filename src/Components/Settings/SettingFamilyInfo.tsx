import React, { useEffect, useState } from 'react'
import Button from '../Ui/Button'
import DropdownOption from '../Ui/DropdownOption';
import AutoComplete from '../Ui/AutoComplete'
import baniList from '../../JSON/selectBani.json'
import generasiList from '../../JSON/generasiOption.json'
import statusList from '../../JSON/statusOption.json'
import anakKeList from '../../JSON/anakKeOption.json'
import { useMultiselect } from '../../Hooks/useMultiSelect';
import { apiGetBani, apiSearchProfile } from '../../Services/Api/AlkareemApi/get';
import { apiCreateBani } from '../../Services/Api/AlkareemApi/post';
import { apiDeleteBani } from '../../Services/Api/AlkareemApi/delete';
import { useDebounce } from '../../Hooks/useDebounce'
import { ISearchProfile } from '../../Types/Alkareem/RES/SearchProfile'
import { apiChangeAnakKe, apiChangeGenerasi, apiChangeHusband, apiChangeParent, apiChangeStatus } from '../../Services/Api/AlkareemApi/patch';
import { apiAdminGetBaniById } from '../../Services/Api/AlkareemApi/Admin/get';
import { apiCreateBaniAdmin } from '../../Services/Api/AlkareemApi/Admin/post';
import { apiDeleteBaniAdmin } from '../../Services/Api/AlkareemApi/Admin/delete';
import { apiChangeAnakKeAdmin, apiChangeGenerasiAdmin, apiChangeHusbandAdmin, apiChangeParentAdmin, apiChangeStatusAdmin } from '../../Services/Api/AlkareemApi/Admin/patch';

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    gender?: string
    token?: string
    id?: string;
    isAdmin?: boolean;
};

const SettingFamilyInfo = ({ isAdmin = false, onConfirm, onCancel, gender, token, ...props }: Props) => {

    const [users, setUsers] = useState<ISearchProfile | null>(null);
    const [error, setError] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [anakKeDisable, setAnakKeDisable] = useState(true)
    const [generasiDisable, setGenerasiDisable] = useState(true)
    const [statusDisable, setStatusDisable] = useState(true)
    const [orangtuaDisable, setOrangtuaDisable] = useState(true)
    const [pasanganDisable, setPasanganDisable] = useState(true)

    const [query, setQuery] = useState('')
    const [anakKe, setAnakKe] = useState('')
    const [generasi, setGenerasi] = useState('')
    const [status, setStatus] = useState('')
    const [orangtua, setOrangtua] = useState('')
    const [pasangan, setPasangan] = useState('')

    const debouncedQuery = useDebounce(query);

    const { selected, setSelected, isSelected, onChange } = useMultiselect([]);

    const fetchSearchProfil = async () => {
        const profilData = await apiSearchProfile({ token: token, query: debouncedQuery })
        if (profilData.status !== 200) {
        } else {
            setUsers(profilData.data)
        }
    }

    useEffect(() => {

        fetchSearchProfil()

        if (selected.length > 0) {
            setAnakKeDisable(false)
        } else {
            setAnakKeDisable(true)
            setError(true)
        }

    }, [selected, debouncedQuery])

    const fetchAddBani = async () => {
        const numbers = ['1', '2', '3', '4', '5', '6', '7'];
        try {
            if (selected.length > 0) {
                for (const number of numbers) {
                    if (isAdmin === true) {
                        await apiDeleteBaniAdmin({ token: token, baniId: number, userId: props.id });
                    } else {
                        await apiDeleteBani({ token: token, baniId: number });
                    }
                }
                if (isAdmin === true) {
                    var checkBani = await apiAdminGetBaniById({ token: token, userId: props.id });
                } else {
                    var checkBani = await apiGetBani({ token: token });
                }
                if (checkBani.data.data.length === 0) {
                    for (const baniId of selected) {
                        if (isAdmin === true) {
                            var addBani = await apiCreateBaniAdmin({ token: token, baniId: baniId, userId: props.id });
                        } else {
                            var addBani = await apiCreateBani({ token: token, baniId: baniId });
                        }
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

    const fetchUpdateAnakKe = async () => {
        try {
            if (anakKe.length !== 0) {
                if (isAdmin === true) {
                    var updateAnakKe = await apiChangeAnakKeAdmin({ token: token, anak_ke: anakKe, userId: props.id });
                } else {
                    var updateAnakKe = await apiChangeAnakKe({ token: token, anak_ke: anakKe });
                }
                if (updateAnakKe.status === 200) {
                    setError(false);
                    setIsLoading(false);
                } else {
                    throw new Error('Gagal memperbaharui data anak ke, status: ' + updateAnakKe.status);
                }
            } else {
                throw new Error('Gagal memperbaharui data anak ke: Anak ke tidak valid');
            }
        } catch (error: any) {
            setError(true);
            setErrorMessage('Gagal memperbaharui data anak ke: ' + error.message);
            setIsLoading(false);
        }
    }


    const fetchUpdateGenerasi = async () => {
        try {
            if (generasi.length !== 0) {
                if (isAdmin === true) {
                    var updateGenerasi = await apiChangeGenerasiAdmin({ token: token, generasiId: generasi, userId: props.id });
                } else {
                    var updateGenerasi = await apiChangeGenerasi({ token: token, generasiId: generasi });
                }
                if (updateGenerasi.status === 200) {
                    setError(false);
                    setIsLoading(false);
                } else {
                    throw new Error('Gagal memperbaharui data generasi, status: ' + updateGenerasi.status);
                }
            } else {
                throw new Error('Gagal memperbaharui data generasi');
            }
        } catch (error: any) {
            setError(true);
            setErrorMessage('Gagal memperbaharui data generasi: ' + error.message);
            setIsLoading(false);
        }
    }

    const fetchUpdateStatus = async () => {
        try {
            if (orangtua.length !== 0) {
                if (isAdmin === true) {
                    var updateStatus = await apiChangeStatusAdmin({ token: token, status: status, userId: props.id });
                } else {
                    var updateStatus = await apiChangeStatus({ token: token, status: status });
                }
                if (updateStatus.status === 200) {
                    setError(false);
                    setIsLoading(false);
                } else {
                    throw new Error('Gagal memperbaharui data status, status: ' + updateStatus.status);
                }
            } else {
                throw new Error('Gagal memperbaharui data status');
            }
        } catch (error: any) {
            setError(true);
            setErrorMessage('Gagal memperbaharui data status: ' + error.message);
            setIsLoading(false);
        }
    }

    const fetchUpdateOrangtua = async () => {
        try {
            if (orangtua.length !== 0) {
                if (isAdmin === true) {
                    var updateOrangtua = await apiChangeParentAdmin({ token: token, parentId: orangtua, userId: props.id });
                } else {
                    var updateOrangtua = await apiChangeParent({ token: token, parentId: orangtua });
                }
                if (updateOrangtua.status === 200) {
                    setError(false);
                    setIsLoading(false);
                } else {
                    throw new Error('Gagal memperbaharui data orangtua, status: ' + updateOrangtua.status);
                }
            } else {
                throw new Error('Gagal memperbaharui data orangtua');
            }
        } catch (error: any) {
            setError(true);
            setErrorMessage('Gagal memperbaharui data orangtua: ' + error.message);
            setIsLoading(false);
        }
    }

    const fetchUpdatePasangan = async () => {
        try {
            if (pasangan.length !== 0) {
                if (isAdmin === true) {
                    var updateOrangtua = await apiChangeHusbandAdmin({ token: token, husbandId: pasangan, userId: props.id });
                } else {
                    var updateOrangtua = await apiChangeHusband({ token: token, husbandId: pasangan });
                }
                if (updateOrangtua.status === 200) {
                    setError(false);
                    setIsLoading(false);
                } else {
                    throw new Error('Gagal memperbaharui data suami, status: ' + updateOrangtua.status);
                }
            } else {
                throw new Error('Gagal memperbaharui data suami');
            }
        } catch (error: any) {
            setError(true);
            setErrorMessage('Gagal memperbaharui data suami: ' + error.message);
            setIsLoading(false);
        }
    }

    const anakKeHandler = (id: string, text: string) => {
        if (!id) {
            setGenerasiDisable(true)
        } else {
            setGenerasiDisable(false)
            setAnakKe(id)
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
            if (gender === 'FEMALE') {
                setPasanganDisable(false)
            } else {
                setPasanganDisable(true)
            }
        } else {
            setPasanganDisable(true)
        }

        if (!id) {
            setOrangtuaDisable(true)
        } else {
            setOrangtuaDisable(false)
        }
    }

    const orangtuaHandler = (id: string, text: string) => {
        if (!id) {
            setError(true)
        } else {
            setError(false)
        }
        setOrangtua(id)
    }

    const partnerHandler = (id: string, text: string) => {
        if (!id) {
            setError(true)
        } else {
            setError(false)
        }
        setPasangan(id)
    }

    const resetData = () => {
        setSelected([])
        setAnakKe('')
        setGenerasi('')
        setStatus('')
        setOrangtua('')
        setPasangan('')
        setAnakKeDisable(true)
        setGenerasiDisable(true)
        setStatusDisable(true)
        setOrangtuaDisable(true)
        setPasanganDisable(true)
    }

    const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        Promise.all([fetchAddBani(), fetchUpdateAnakKe(), fetchUpdateGenerasi(), fetchUpdateStatus(), fetchUpdateOrangtua(), fetchUpdatePasangan()])
            .then(() => {
                onConfirm && onConfirm(event);
            })
            .catch(() => {
                console.error('An error occurred while fetching or updating data.');
            })
            .finally(() => {
                setIsLoading(false);
            });
        resetData();
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setError(true);
        if (onCancel) {
            resetData()
            onCancel(event);
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold pl-1 mb-9">Informasi Hubungan Keluarga</h1>

            <div className='flex flex-row justify-between gap-2 p-4 items-atart'>
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
                        <h1 className='mb-2 text-sm'>Anak ke?</h1>
                        <DropdownOption onClicked={anakKeHandler} disabled={anakKeDisable} data={anakKeList.data} label='Anak ke' />
                    </div>
                    <div className='form-control'>
                        <h1 className='mb-2 text-sm'>Generasi</h1>
                        <DropdownOption onClicked={generasiHandler} disabled={generasiDisable} data={generasiList.data} label='Generasi' />
                    </div>
                    <div className='form-control'>
                        <h1 className='mb-2 text-sm'>Status Pernikahan</h1>
                        <DropdownOption onClicked={statusHandler} disabled={statusDisable} data={statusList.data} label='Status' />
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <AutoComplete
                    index={1}
                    label='Nama Orang tua'
                    disabled={orangtuaDisable}
                    placeholder='Nama Orang tua'
                    helper='Orang tua dari keturunan KH. Abdul Karim'
                    onQueryChange={(e) => setQuery(e)}
                    data={users?.data}
                    onClicked={orangtuaHandler} />
            </div>
            <div className='p-4'>
                <AutoComplete
                    index={0}
                    label='Nama Suami'
                    disabled={pasanganDisable}
                    placeholder='Nama Suami'
                    onQueryChange={(e) => setQuery(e)}
                    data={users?.data}
                    onClicked={partnerHandler} />
            </div>
            <p className='text-xs mb-4 p-4 text-justify'><strong className='text-gray-200'>Note: </strong>Untuk memastikan informasi hubungan keluarga Anda yang akurat, harap isi semua detail yang diminta, seperti daftar bani, urutan anak dalam keluarga, nama generasi, status pernikahan, nama orang tua asli KH. Abdul Karim (kosongkan jika Anda adalah menantu), dan nama suami (jika Anda perempuan).</p>
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