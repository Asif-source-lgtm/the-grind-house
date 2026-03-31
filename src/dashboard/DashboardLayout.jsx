import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-bg-dark text-text-primary overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 w-full scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
