import React from 'react'
import UserTable from '../../Components/UserTable'
import Button from '../../Components/Ui/Button'
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Column (Sticky with Fixed Height) */}
            <div
                className="sticky left-0 top-0 bottom-0 w-64 h-screen bg-gray-800 text-white overflow-auto p-4 hidden md:block"
                style={{ position: "fixed" }}
            >
                Kolom Kiri (Sticky)
            </div>

            {/* Center Column (Scrollable Content) with max-width and flexbox */}
            <div className="flex-grow overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 px-2">
                <div className="flex flex-col min-h-screen justify-content-center items-center"> {/* Centered Content */}
                    <h1>Hai</h1>
                </div>
            </div>

            {/* Right Column (Sticky with Fixed Height) */}
            <div
                className="sticky right-0 top-0 bottom-0 w-64 h-screen bg-gray-800 text-white overflow-auto p-4 hidden md:block"
                style={{ position: "fixed" }}
            >
                Kolom Kanan (Sticky)
            </div>
        </div>
    )
}

export default Table