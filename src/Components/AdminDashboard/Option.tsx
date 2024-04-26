import React from 'react'
import Button from '../Ui/Button';
import { FaCheck } from "react-icons/fa";

interface Props {
    signUpButton: () => void;
    updateButton: () => void;
}

const Option = ({ signUpButton, updateButton, ...props }: Props) => {

    const signUpItems = [
        {
            "item": "Username"
        },
        {
            "item": "Password"
        },
    ]

    const updateItems = [
        {
            "item": "Nama"
        },
        {
            "item": "Wali"
        },
        {
            "item": "Pasangan"
        },
        {
            "item": "Bani"
        },
        {
            "item": "Alamat"
        },
        {
            "item": "Kontak"
        },
        {
            "item": "Foto Profil"
        },
    ]

    return (
        <div>
            <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 mt-4">

                <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-gray-500 bg-base-200 shadow relative">
                    <h3 className="mb-4 text-2xl font-bold">Registrasi</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Membuatkan akun baru untuk anggota bani di bawah koordinasi Anda.</p>
                    <div className="flex justify-center items-baseline my-2">
                    </div>
                    <ul role="list" className="mb-8 space-y-4 text-left mb-20">
                        {signUpItems.map((data) => (
                            <li className="flex items-center space-x-3">
                                <FaCheck className="text-primary ml-1" />
                                <span>{data.item}</span>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={signUpButton} className="absolute bottom-6 right-6 left-6" variant="primary">Registrasi User Baru</Button>
                </div>

                <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-gray-500 bg-base-200 shadow relative">
                    <h3 className="mb-4 text-2xl font-bold">Update</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Perbaharui informasi akun anggota bani di bawah koordinasi Anda.</p>
                    <div className="flex justify-center items-baseline my-2">
                    </div>
                    <ul role="list" className="mb-8 space-y-4 text-left mb-20">
                        {updateItems.map((data) => (
                            <li className="flex items-center space-x-3">
                                <FaCheck className="text-primary ml-1" />
                                <span>{data.item}</span>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={updateButton} className="absolute bottom-6 right-6 left-6" variant="primary">Update User</Button>
                </div>

            </div>
        </div>
    )
}

export default Option