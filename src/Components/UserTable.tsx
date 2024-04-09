import React from 'react'
import Button from './Ui/Button'
import { UserListProps } from '../Types/Components/UserTable'
import { Datum, TypeUsers } from '../Types/Alkareem/GetAllUserRes'

const UserTable: React.FC<UserListProps> = ({ ...props }) => {
    return (
        <div className="max-w-[850px] w-screen min-w-screen md:min-w-[370px]">
            <div className="flex flex-col overflow-x-auto justify-between items-center border-b-2 border-gray-800">
                <table className="table">
                    <tr>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 rounded-full">
                                        <img src={props.avatar} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold xs:max-w-[200px]"> {props.name}</div>
                                    <div className="text-sm opacity-50">@{props.username}</div>
                                </div>
                            </div>
                        </td>
                        {props.isAdmin ? <td className='items-end'>
                            <div className='flex flex-col items-end gap-2'>
                                <Button size='tiny' variant='outline' className='w-[70px] text-xs'>
                                    Edit
                                </Button>
                                <Button size='tiny' variant='outline' className='w-[70px] text-xs'>
                                    Delete
                                </Button>
                            </div>
                        </td> : <td className='items-end'>
                            <div className='flex flex-col items-end gap-2'>
                            <div className="badge badge-neutral">{props.bani}</div>
                            </div>
                        </td>}
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default UserTable