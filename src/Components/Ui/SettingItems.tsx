import { ReactEventHandler } from 'react'
import { cn } from '../../Utils/cn';

type Props = {
    label: string
    subLabel?: string
    item?: string
    clasname?: string
    onClick?: ReactEventHandler
}

const SettingItems = ({ ...props }: Props) => {
    return (
        <div className='flex justify-between p-4 hover:opacity-75 h-[75px] cursor-pointer' onClick={props.onClick}>
            <div className='flex items-center w-[50%]'>
                <ul>
                    <li className={cn(props.clasname)}>{props.label}</li>
                    {props.subLabel &&
                        <li className='text-gray-500 mt-1 text-xs line-clamp-1'>
                            {props.subLabel}
                        </li>
                    }
                </ul>
            </div>
            {props.item &&
                <div className='flex items-center w-[45%]'>
                    <ul className='w-[100%]'>
                        <li className='text-gray-500 text-sm text-right overflow-hidden whitespace-nowrap overflow-ellipsis'>
                            {props.item}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default SettingItems