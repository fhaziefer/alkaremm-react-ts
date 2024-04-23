import React from 'react'
import { DetailUserCardProps } from '../../Types/Components/DetailUserCardProps'

const TableDetailWives: React.FC<DetailUserCardProps> = ({ ...props }) => {
    return (
        <div className='pt-2 pb-1'>
            {props.wife?.length === 1 ?
                <h1 className='text-xs'>Istri: {props.wife?.map((wife) => (<span key={wife.istri_ke} className='text-xs'>{wife.name}{wife.alive_status ? null : <span>*</span>}</span>)
                )}</h1>
                : null}
            {props.wife!.length > 1 ? <h1 className='text-xs mb-1 font-bold'>Istri:</h1> : null}
            {props.wife!.length > 1 ?
                <div className="w-64 lg:w-full mx-auto lg:mx-0 text-black">
                    <table className="table table-xs table-pin-rows table-pin-cols rounded-none">
                        <thead className='hidden'>
                            <tr className='border-none'>
                                <th className='w-1 p-1 text-left'></th>
                                <th>Istri</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.wife?.map((wife) => (
                                <tr key={wife.istri_ke} className='border-none'>
                                    <td className='w-1 p-1'>{wife.istri_ke}.</td>
                                    <td>{wife.name}{wife.alive_status ? null : <span>*</span>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : null}
        </div>
    )
}

export default TableDetailWives