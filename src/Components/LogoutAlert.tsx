import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { apiLogout } from '../Services/Api/AlkareemApi/delete';
import ModalDialog from './Ui/ModalDialog';
import { useState } from 'react';
import Modal from './Ui/Modal';
import Button from './Ui/Button';

interface Props {
    open: boolean
}

const LogoutAlert = ({ ...props }: Props) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { getItem, clearItem } = useLocalStorage()

    const token = getItem('token')
    const username = getItem('username')

    const navigate = useNavigate();

    useEffect(() => {
        if (props.open !== true) {
            setModalOpen(false)
        } else {
            setModalOpen(true)
        }
    }, [props.open])

    const logout = async () => {
        setIsLoading(true)
        const logout = await apiLogout({ token: token })
        if (logout.status !== 200) {
            setIsLoading(false)
            return;
        } else {
            clearItem()
            navigate(`/login`, { replace: true });
            setIsLoading(false)
        }
    }

    return (
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen((prev) => !prev)}
        >
            <div>
                <h1 className='font-bold text-xl'>Hai {username}</h1>
                <h1 className='py-4'>Apakah Anda yakin ingin keluar dari Alkareem?</h1>
                <div className="flex-row flex w-full justify-between my-6">
                    <Button onClick={() => setModalOpen((prev) => !prev)} disabled={isLoading} variant="ghost" className="w-[49%]">
                        Batal
                    </Button>
                    <Button onClick={logout} disabled={isLoading} variant="error" className="w-[49%]">
                        {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Ya, keluar.'}
                    </Button>
                </div>
            </div>
        </Modal>

    )
}

export default LogoutAlert