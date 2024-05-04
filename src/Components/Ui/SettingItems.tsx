import { ReactElement, ReactEventHandler, ReactNode } from 'react'
import { cva } from 'class-variance-authority';

type Props = {
    label: string
    subLabel?: string
    item?: string
    clasname?: string
    onClick?: ReactEventHandler
    image?: string
    size?: 'normal' | 'tiny' | 'small' | 'large'
    color?: 'normal' | 'error'
}



export default function SettingItems({ size, color, ...props }: Props) {

    return (
        <>
            <div
                className={`flex justify-between hover:opacity-75 ${SizeVariants({ size })} cursor-pointer`}
                onClick={props.onClick}>
                <div className='flex items-center w-[50%]'>
                    <ul>
                        {/* label of list */}
                        <li className={ColorVariants({ color })}>
                            {props.label}
                        </li>

                        {/* sublabel of list */}
                        {props.subLabel &&
                            <li className='text-gray-500 mt-1 text-xs line-clamp-1'>
                                {props.subLabel}
                            </li>
                        }
                    </ul>
                </div>

                {/* item show list */}
                {props.item &&
                    <div className='flex items-center w-[45%]'>
                        <ul className='w-[100%]'>
                            {props.item &&
                                <li className='text-gray-500 text-sm text-right overflow-hidden whitespace-nowrap overflow-ellipsis'>
                                    {props.item}
                                </li>}
                        </ul>
                    </div>
                }
                {props.image &&
                    <div className="avatar mr-1 flex items-center">
                        <div className="rounded-full mask mask-squircle w-12 h-12 items-center">
                            <img alt="User avatar" src={props.image} />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

const SizeVariants = cva(
    '',
    {
        variants: {
            size: {
                tiny: 'px-4 py-0 h-8 text-xs',
                small: 'px-4 py-0 h-12 text-sm',
                normal: 'p-4 h-20',
                large: 'p-4 h-24'
            }
        },
        defaultVariants: {
            size: 'normal'
        }
    }
)

const ColorVariants = cva(
    '',
    {
        variants: {
            color: {
                normal: '',
                error: 'text-red-500'
            }
        },
        defaultVariants: {
            color: 'normal'
        }
    }
)