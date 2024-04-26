import React from 'react'

interface Props {
    label?: string,
    sublabel?: string,
    number?: string | number
}

const CountUser = ({ ...props }: Props) => {
    return (
        <>
            <div className="w-auto mx-3 flex flex-col items-center my-4">
                {props.number &&
                    <h1 className="text-6xl font-bold">
                        {props.number}
                    </h1>
                }
                {props.sublabel &&
                    <h1 className='text-xs italic'>{props.sublabel}</h1>
                }
                {props.label &&
                    <h1 className='text-xs'>{props.label}</h1>
                }
            </div>
        </>
    )
}

export default CountUser