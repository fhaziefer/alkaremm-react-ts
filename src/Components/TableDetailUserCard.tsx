import React from 'react'
import { DetailUserCardProps } from '../Types/Components/DetailUserCardProps'

const TableDetailUserCard: React.FC<DetailUserCardProps> = ({ ...props }) => {
    return (
        <div className='pt-2 pb-1'>
            {props.children?.length !== 0 ? <h1 className='text-sm'>Putra-putri:</h1> : null}
            <div className="w-64 lg:w-full mx-auto lg:mx-0 text-black">
                <table className="table table-xs table-pin-rows table-pin-cols rounded-none">
                    <thead className='hidden'>
                        <tr className='border-none'>
                            <th className='w-1 p-1 text-left'></th>
                            <th>Putra-putri</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.children?.map((child) => (
                            <tr key={child.anak_ke} className='border-none'>
                                <td className='w-1 p-1'>{child.anak_ke}.</td>
                                <td>{child.name}{child.alive_status ? null : <span>*</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default TableDetailUserCard