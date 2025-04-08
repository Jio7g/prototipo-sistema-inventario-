import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

/**
 * Componente Layout principal
 * Contiene la estructura básica de la aplicación
 */
const Layout = ({ activeView, setActiveView, children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar activeView={activeView} />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;