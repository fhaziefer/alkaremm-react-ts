import React, { useEffect, useState } from 'react'
import Button from '../Ui/Button'
import { UserListProps } from '../../Types/Components/UserTable'

const UserTable: React.FC<UserListProps> = ({ ...props }) => {
    const [username, setUsername] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (props.username && props.username.includes('alkareem')) {
            setUsername(undefined);
        } else {
            setUsername(props.username);
        }
    }, [props.username]);

    return (
        <tr className="hover:bg-gray-900 focus:bg-gray-900 cursor-pointer" key={props.id}>
            <td id={props.id} onClick={props.profileButton}>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 rounded-full">
                            <img src={props.avatar}/>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-xs"> {props.name} {props.is_alive === false && <span>*</span>}</div>
                        {username !== undefined && <div className="text-xs opacity-50">@{username}</div>}
                    </div>
                </div>
            </td>
            {props.isAdmin
                ?
                <td className='items-end'>
                    <div className='flex flex-col items-end gap-2'>
                        <Button id={props.id} onClick={props.editButton} size='tiny' variant='outline' className='w-[70px] text-xs'>
                            Edit
                        </Button>
                        <Button id={props.id} onClick={props.deleteButton} size='tiny' variant='outline' className='w-[70px] text-xs'>
                            Delete
                        </Button>
                    </div>
                </td>
                :
                <td key={props.id} className='items-end'>
                    <div className='flex flex-col items-end gap-3'>
                        {props.profileBani?.map((data) => (
                            <div key={data.bani?.id}
                                className="badge badge-neutral badge-sm text-xs text-gray-400 text-right">
                                <span>{data.bani?.bani_name}</span>
                            </div>
                        ))}
                    </div>
                </td>
            }
        </tr>
    )
}

export default UserTable