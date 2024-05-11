import React, { useEffect, useState } from 'react'
import { DetailUserCardProps } from '../../Types/Components/DetailUserCardProps'
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import TableDetailChildrenCard from './TableDetailChildrenCard';
import TableDetailWives from './TableDetailWives';
import TableBaniCard from './TableBaniCard';
import Button from '../Ui/Button';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import Modal from '../Ui/Modal';
import UsernamePrint from './UsernamePrint';

const DetailUserCard: React.FC<DetailUserCardProps> = ({ ...props }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [usernamePrintModalOpen, setUsernamePrintModalOpen] = useState(false)

    const navigate = useNavigate();
    const { getItem } = useLocalStorage()
    const profileId = getItem('id');
    const role = getItem('role')
    
    const parentClickHandler = () => {
        if (props.waliId !== profileId) {
            navigate(`/${props.waliId}`, { replace: false });
        } else {
            navigate(`/profile`, { replace: false });
        }
    }

    const husbandClickHandler = () => {
        if (props.husbandId !== profileId) {
            navigate(`/${props.husbandId}`, { replace: false });
        } else {
            navigate(`/profile`, { replace: false });
        }
    }

    useEffect(()=>{
        if (role !== 'USER'){
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [role])
    
    const fullAddress = props.street + ', ' + props.village + ', ' + props.district + ', ' + props.city + ', ' + props.province + ', ' + props.postal

    return (
        <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider" >
            <Modal
            open={usernamePrintModalOpen}
            onClose={() => setUsernamePrintModalOpen((prev) => !prev)}
            >
                <UsernamePrint
                profileBani={props.profileBani}
                username={props.username}
                wali={props.wali}
                name={props.name}
                gender={props.gender}
                />
            </Modal>
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 relative">
                <div id="profile" className="w-full lg:w-4/5 rounded-xl lg:rounded-l-lg lg:rounded-r-lg shadow-2xl bg-gray-300 mx-6 lg:mx-0">
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center avatar">
                            <img src={props.avatar} className='rounded-full h-48 w-48' />
                        </div>
                        {props.generasi && props.generasi !== 'Generasi Satu' &&
                            <div className="badge badge-primary badge-sm mt-4">
                                <span className='text-white font-bold text-xs'>{props.generasi}</span>
                            </div>
                        }
                        <h1 className="text-3xl font-bold mt-2 lg:pt-0 lg:max-w-[70%] md:max-w[60%]">{props.name}{props.user_alive ? null : <span>*</span>}{props.username?.includes('alkareem') ? null : <span className="text-gray-400 font-bold text-sm"> (@{props.username})</span>}</h1>

                        {props.wali && <p className="text-gray-600 text-sm pt-1">{props.gender === 'MALE' ? <span>Bin </span> : <span>Binti </span>}<span onClick={parentClickHandler} className='hover:font-bold hover:text-primary hover:cursor-pointer'>{props.wali}</span>{props.parent_alive ? null : <span>*</span>}</p>}

                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-primary opacity-25"></div>

                        {props.profileBani && <TableBaniCard profileBani={props.profileBani} />}

                        {props.bio && <><div className="mx-auto lg:mx-0 w-4/5 lg:max-w-[80%] md:max-w[60%] py-1 border-b-2 border-primary opacity-25"></div><div className='my-4 lg:max-w-[80%] md:max-w[60%]'><strong><i className="text-sm">
                            "{props.bio}"
                        </i></strong></div><div className="mx-auto lg:mx-0 w-4/5 pb-1 mb-2 border-b-2 border-primary opacity-25"></div></>}

                        {props.wife && <TableDetailWives wife={props.wife} />}
                        {props.husband && <h1 className="text-xs">
                            Suami: <span className='hover:font-bold hover:text-primary hover:cursor-pointer'
                            onClick={husbandClickHandler}>{props.husband}</span>{props.husband_alive ? null : <span>*</span>}
                        </h1>}


                        {props.children && <TableDetailChildrenCard children={props.children} />}

                        {props.phone ? (
                            <div className="mt-6 pb-16 lg:pb-0 w-2/6 lg:w-2/6 mx-auto flex flex-wrap items-center justify-between">
                                {props.village && <a className="link" href={'https://maps.google.com/?q=' + fullAddress} data-tippy-content="@maps_handle"><FaLocationDot className='h-7 w-7 text-primary hover:text-sky-500' /></a>}
                                {props.phone && <a className="link" href={'https://wa.me/' + props.phone} data-tippy-content="@whatsapp_handle"><FaWhatsapp className='h-7 w-7 text-primary hover:text-green-500' /></a>}
                                {props.instagram && <a className="link" href={'https://instagram.com/' + props.instagram} data-tippy-content="@instagram_handle"><FaInstagram className='h-7 w-7 text-primary hover:text-rose-400' /></a>}
                            </div>
                        ) : (
                            props.village && (
                                <div className='mt-4 mb-8 md:mb-4  lg:mb-4 lg:ml-1'>
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = 'https://maps.google.com/?q=' + fullAddress;
                                    }} variant='primary' color='primary' className='rounded-full'>Dapatkan Lokasi</Button>
                                </div>
                            )
                        )}
                        {isAdmin && <div className='mt-4 mb-8 md:mb-4  lg:mb-4 lg:ml-1'><Button onClick={()=> setUsernamePrintModalOpen(true)} variant='primary' color='primary' className='rounded-full'>Cetak Username</Button></div>}
                    </div>
                </div>
                <div className="absolute right-16 order-first h-72 w-72 rounded-full hidden lg:block avatar">
                    <img src={props.avatar} className="rounded-full lg:rounded-full shadow-2xl" />
                </div>
            </div>
        </div>
    )
}

export default DetailUserCard