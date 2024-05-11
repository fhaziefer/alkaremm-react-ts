import React, { useEffect, useState } from 'react'
import { env } from '../../Utils/env'
import { getYearNow } from '../../Utils/birthdayConverter'

type Props = {
    name?: string
    username?: string
    gender?: string
    wali?: string
    profileBani?: ProfileBani[];
}

interface ProfileBani {
    bani?: Bani;
}

interface Bani {
    id?: number;
    bani_name?: string;
}

const UsernamePrint = ({ ...props }: Props) => {
    const year = getYearNow()
    const baseUrl = env.REACT_APP_BASE_URL

    const [passwordIsChanged, setPasswordIsChanged] = useState(false)

    useEffect(() => {
        if (props.username?.includes('alkareem')) {
            setPasswordIsChanged(false)
        } else {
            setPasswordIsChanged(true)
        }
    }, [props.username])

    return (
        <div className='flex flex-col text-center'>
            <img
                className='h-24 w-24 items-center mx-auto mt-8'
                src={`${baseUrl}/images/asset/logo.png`}
                alt="AlkareemLogo"
            />
            <h1 className='mt-2 mb-14 font-bold text-xl text-white'>Alkareem</h1>
            <h1 className='font-bold text-2xl text-white'>{props.name}</h1>
            {props.wali && <p className="text-sm pt-1 text-white">{props.gender === 'MALE' ? <span>Bin </span> : <span>Binti </span>}<span>{props.wali}</span></p>}
            <div className="pt-4 pb-2 mb-8 flex flex-row gap-2 items-center justify-center">
                {props.profileBani?.map((bani) => (
                    <div key={bani.bani?.id} className="badge badge-primary badge-sm">
                        <span className='text-white font-bold text-xs'>{bani.bani?.bani_name}</span>
                    </div>
                ))}
            </div>
            <h1 className='mt-2 text-white text-xs'>Username</h1>
            <h1 className='font-bold text-2xl text-primary'>{props.username}</h1>
            {passwordIsChanged !== true ?
                <>
                    <h1 className='mt-2 text-white text-xs'>Password</h1>
                    <h1 className='font-bold text-2xl text-primary'>{props.username}</h1>
                </>
                :
                <>
                    <h1 className='mt-2 text-white text-xs'>Password</h1>
                    <h1 className='font-bold text-sm text-primary'>Password kemungkinan sudah diganti.<br />Jika lupa, hubungi admin untuk mengubah password.</h1>
                </>
            }
            <div className='mb-14'></div>
            <h1 className='text-md italic text-gray-500'>alkareemlirboyo.com</h1>
            <p className='text-xs mt-1 mb-8 text-gray-500'>Official Website of Bani KH. Abdul Karim Lirboyo<br />Copyright Ⓒ {year}</p>
        </div>
    )
}

export default UsernamePrint