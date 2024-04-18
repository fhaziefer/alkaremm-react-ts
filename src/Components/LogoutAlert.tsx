import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { apiLogout } from '../Services/Api/AlkareemApi/delete';
import ModalDialog from './Ui/ModalDialog';
import { useState } from 'react';

interface Props {
    open: boolean
}

const LogoutAlert = ({ ...props }: Props) => {

    const [modalOpen, setModalOpen] = useState(false)

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
        const logout = await apiLogout({ token: token })
        if (logout.status !== 200) {
            return;
        } else {
            clearItem()
            navigate(`/login`, { replace: true });
        }
    }

    const handleModal = () => setModalOpen((prev) => !prev)

    return (
        <ModalDialog
            btn
            label={`Hai ${username}`}
            body={`Apakah Anda yakin ingin keluar dari aplikasi Alkareem?`}
            btnYesLabel='Ya, keluar'
            open={modalOpen}
            onClose={handleModal}
            onYes={logout}
        />

    )
}

export default LogoutAlert