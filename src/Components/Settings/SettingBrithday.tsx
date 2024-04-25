import React, { useState } from 'react'
import Button from '../Ui/Button';
import DropdownOption from '../Ui/DropdownOption';
import dateList from '../../JSON/date.json'
import monthList from '../../JSON/month.json'
import yearList from '../../JSON/year.json'
import { apiChangeBrithday } from '../../Services/Api/AlkareemApi/patch';

type Props = {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    token?: string;
}

const SettingBrithday = ({ token, onConfirm, onCancel, ...props }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const [date, setDate] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [monthDisable, setMonthDisable] = useState(true)
    const [yearDisable, setYearDisable] = useState(true)

    const resetDropdowns = () => {
        setDate('');
        setMonth('');
        setYear('');
        setMonthDisable(true);
        setYearDisable(true);
        setError(true);
    };

    const handleDate = (id: string, text: string) => {
        setDate(id)
        setMonthDisable(false)
    }
    const handleMonth = (id: string, text: string) => {
        setMonth(id)
        setYearDisable(false)
    }
    const handleYear = (id:string, text: string) => {
        setYear(text)
        setError(false)
    }

    const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true)
        const birthday = `${year}-${month}-${date}`
        //! SET API HERE
        if (onConfirm) {
            const changeBrithday = await apiChangeBrithday({ token: token, birthday: birthday })
            if (changeBrithday.status !== 200) {
                setErrorMessage('Gagal memperbaharui tanggal lahir, coba lagi.')
                resetDropdowns();
                setIsLoading(false)
            } else {
                resetDropdowns();
                onConfirm(event)
                setIsLoading(false)
                setError(false)
            }
        }
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onCancel) {
            resetDropdowns();
            onCancel(event);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold pl-1'>Tanggal Lahir</h1>
            <h1 className='text-sm mb-4 pl-1'>Silakan perbarui tanggal lahir Anda sesuai dengan data yang benar.</h1>
            <div className='flex flex-row gap-2 items-center justify-between relative mb-4'>
                <DropdownOption
                    label='Tanggal'
                    data={dateList.data}
                    onClicked={handleDate}
                />
                <DropdownOption
                    label='Bulan'
                    disabled={monthDisable}
                    data={monthList.data}
                    onClicked={handleMonth}
                />
                <DropdownOption
                    label='Tahun'
                    disabled={yearDisable}
                    data={yearList.data}
                    onClicked={handleYear}
                />
                {error && <span className="label-text-alt text-red-500 absolute right-0 -bottom-8 pr-1">{errorMessage}</span>}
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
    )
}

export default SettingBrithday