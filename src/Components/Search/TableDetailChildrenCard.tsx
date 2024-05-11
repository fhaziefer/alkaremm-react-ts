import React from 'react'
import { DetailUserCardProps } from '../../Types/Components/DetailUserCardProps'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';

const TableDetailChildrenCard: React.FC<DetailUserCardProps> = ({ ...props }) => {

    const navigate = useNavigate();
    const { getItem } = useLocalStorage()
    const profileId = getItem('id');

    const childrenClickHandler = (event: any) => {
        const value = event.currentTarget.getAttribute('id')
        if (value !== profileId) {
            navigate(`/${value}`, { replace: false });
        } else {
            navigate(`/profile`, { replace: false })
        }
    }

    return (
        <div className='pt-2 pb-1'>
            {props.children?.length !== 0 ? <h1 className='text-xs font-bold mb-1'>Putra-putri:</h1> : null}
            <div className="w-72 lg:w-[70%] mx-auto lg:mx-0 text-black">
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
                                <td>
                                    <span
                                        onClick={childrenClickHandler}
                                        id={child.userId}
                                        className='hover:font-bold hover:text-primary hover:cursor-pointer'
                                    >
                                        {child.name}
                                    </span>
                                    {child.alive_status ? null : <span>*</span>}
                                    {child.status === 'MARRIED' && (
                                        <>
                                            <span> + </span>
                                            {child.gender === 'FEMALE' && child.husband && (
                                                <>
                                                    <span
                                                        onClick={childrenClickHandler}
                                                        id={child.husband.userId}
                                                        className='hover:font-bold hover:text-primary hover:cursor-pointer'
                                                    >
                                                        {child.husband.name}
                                                    </span>
                                                    {!child.husband.alive_status && <span>*</span>}
                                                </>
                                            )}
                                            {child.gender === 'MALE' && child.wives && (
                                                <>
                                                    {child.wives.map((wife, index) => (
                                                        <span key={index}>
                                                            <span
                                                                onClick={childrenClickHandler}
                                                                id={wife.userId}
                                                                className='hover:font-bold hover:text-primary hover:cursor-pointer'
                                                            >
                                                                {wife.name}
                                                            </span>
                                                            {!wife.alive_status && <span>*</span>}
                                                            {index !== child.wives!.length - 1 && " + "}
                                                        </span>
                                                    ))}
                                                </>
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableDetailChildrenCard