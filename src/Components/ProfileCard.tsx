import React from 'react'
import { ProfileCardProps } from '../Types/Components/ProfileCardProps'
import Button from './Ui/Button'
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaLocationDot, FaUserGroup } from "react-icons/fa6";

const ProfileCard: React.FC<ProfileCardProps> = ({ ...props }) => {

    return (
            <body className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover" >
                <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                    <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-lg shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                        <div className="p-4 md:p-12 text-center lg:text-left">
                            <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                                <img src={props.avatar} className='w-full h-full rounded-full' />
                            </div>
                            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{props.name}</h1>
                            {props.wali ? <p className="text-gray-600 text-sm pt-1">{props.gender === 'MALE' ? <span>Bin </span> : <span>Binti </span>}{props.wali}</p> : null}

                            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-primary opacity-25"></div>

                            {props.village ? <div className="pt-4  flex items-center justify-center lg:justify-start"><FaLocationDot className='text-primary mr-3 h-4 w-4'/> <p className='text-gray-600 text-xs lg:text-sm'>{props.city}, {props.province}</p></div> : null}

                            {props.bani ? <div className="pt-2  flex items-center justify-center lg:justify-start"><FaUserGroup className='text-primary mr-3 h-4 w-4'/> <p className='text-gray-600 text-xs lg:text-sm'>{props.bani}</p></div> : null}

                            <p className="pt-8 text-sm">
                            Seni adalah konsistensi
                            </p>
                            <div className="pt-12 pb-8">

                                {props.phone ? <a className='link' href={'https://wa.me/' + props.phone}><Button variant='outline' className='rounded-full outline-gray-900 text-gray-900 hover:text-white mx-2'>
                                    Detail
                                </Button></a> : null}
                            </div>
                            <div className="mt-6 pb-16 lg:pb-0 w-2/6 lg:w-2/6 mx-auto flex flex-wrap items-center justify-between">
                                <a className="link" href={'https://maps.google.com/?q=' + props.street + ', ' + props.village + ', ' + props.district + ', ' + props.city + ', ' + props.province + ', ' + props.postal} data-tippy-content="@instagram_handle"><FaLocationDot className='h-7 w-7 hover:text-primary' /></a>
                                <a className="link" href={'https://wa.me/' + props.phone} data-tippy-content="@instagram_handle"><FaWhatsapp className='h-7 w-7 hover:text-green-500' /></a>
                                <a className="link" href={'https://instagram.com/' + props.instagram} data-tippy-content="@instagram_handle"><FaInstagram className='h-7 w-7 hover:text-rose-400' /></a>

                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5 px-6 py-6 bg-white opacity-75 rounded-l-none rounded-r-full hidden lg:block">
                        <img src={props.avatar} className="rounded-full lg:rounded-full shadow-2xl" />
                    </div>
                </div>
            </body>
    )
}

export default ProfileCard