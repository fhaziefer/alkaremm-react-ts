import React from 'react';
import Button from './Ui/Button';

interface SidebarProps { }

const SideBar: React.FC<SidebarProps> = () => {

    return (
        <div
            className="w-64 bg-gray-800 fixed top-0 left-0 h-full overflow-y-auto hidden md:block"
            style={{ position: "fixed" }}>
            <div className='flex flex-col items-start gap-4 p-4'>
                <Button className='w-full'>Home</Button>
                <Button className='w-full'>Profile</Button>
                <Button className='w-full'>Setting</Button>
            </div>
        </div>
    );
};

export default SideBar;