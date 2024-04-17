import React, { useState, ReactEventHandler } from 'react'
import Button from '../Ui/Button';
import DropdownOption from '../Ui/DropdownOption';
import dateList from '../../JSON/date.json'
import monthList from '../../JSON/month.json'
import yearList from '../../JSON/year.json'

type Props = {
    onClicked?: (
        birthdayNew: string,
    ) => void;
    birthdayNow?: string;
    onClick?: ReactEventHandler | undefined;
}

const SettingBrithday = ({ ...props }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(true)

    const [date, setDate] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const handleDate = (id: string, text: string) => {
        setDate(id)
        setDisable(false)
    }
    const handleMonth = (id: string, text: string) => {
        setMonth(id)
        setDisable(false)
    }
    const handleYear = (id: string, text: string) => {
        setYear(text)
        setDisable(false)
    }

    const handleButton = () => {
        setIsLoading(true)
        const brithdayNew = `${year}-${month}-${date}`
        //! SET API HERE
        setTimeout(() => {
            if (props.onClicked) {
                props.onClicked(brithdayNew);
                setDisable(true)
                setIsLoading(false)
            }
        }, 5000);
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDate('')
        setMonth('')
        setYear('')
        setDisable(true)
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold pl-1'>Tanggal Lahir</h1>
            <h1 className='text-sm mb-4 pl-1'>Silakan perbarui tanggal lahir Anda sesuai dengan data yang benar.</h1>
            <div className='flex flex-row gap-2 items-center justify-between'>
                <DropdownOption
                    label='Tanggal'
                    data={dateList.data}
                    onClicked={handleDate}
                />
                <DropdownOption
                    label='Bulan'
                    data={monthList.data}
                    onClicked={handleMonth}
                />
                <DropdownOption
                    label='Tahun'
                    data={yearList.data}
                    onClicked={handleYear}
                />
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
                    disabled={isLoading || disable}
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