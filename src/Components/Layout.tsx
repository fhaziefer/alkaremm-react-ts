import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar'; // Import Sidebar component

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
    return (
        <div className="flex h-screen">
            <SideBar />
            <main className="flex-grow overflow-x-auto p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;