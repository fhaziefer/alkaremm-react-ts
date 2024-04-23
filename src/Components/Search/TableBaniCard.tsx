import React from 'react'
import { DetailUserCardProps } from '../../Types/Components/DetailUserCardProps'

const TableBaniCard: React.FC<DetailUserCardProps> = ({ ...props }) => {
    return (
        <div className="pt-4 pb-2 flex flex-row gap-2 items-center justify-center lg:justify-start">
            {props.profileBani?.map((bani) => (
                <div key={bani.bani?.id} className="badge badge-primary badge-sm">
                    <span className='text-white font-bold text-xs'>{bani.bani?.bani_name}</span>
                </div>
            ))}
        </div>
    )
}

export default TableBaniCard