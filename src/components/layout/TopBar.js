import React, { useState } from 'react';
import { Search, Bell, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { getLowStockProducts } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente TopBar
 * Muestra el encabezado y controles superiores
 */
const TopBar = ({ activeView }) => {
  // Obtener el contexto de autenticación
  const { user, logout } = useAuth();
  
  // Estado para el menú de usuario
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Obtener productos con bajo stock para la notificación
  const lowStockProducts = getLowStockProducts();
  
  // Mapeo de vistas a títulos
  const viewTitles = {
    dashboard: 'Dashboard',
    products: 'Gestión de Productos',
    inventory: 'Control de Inventario',
    reports: 'Reportes y Análisis',
    admin: 'Administración del Sistema'
  };

  // Alternar menú de usuario
  const toggleUserMenu = () => {
    setShowUserMenu(prev => !prev);
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">
          {viewTitles[activeView] || 'Dashboard'}
        </h1>
      </div>
      <div className="flex items-center">
        <div className="relative mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 relative mr-3">
          <Bell size={20} />
          {lowStockProducts.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {lowStockProducts.length}
            </span>
          )}
        </button>
        
        {/* Menú de usuario */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={toggleUserMenu}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              {user?.avatar || 'U'}
            </div>
            <span className="font-medium hidden md:block">{user?.name || 'Usuario'}</span>
            <ChevronDown size={16} className="text-gray-500 hidden md:block" />
          </button>
          
          {/* Menú desplegable */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <a 
                href="#profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <User size={16} className="mr-2" />
                Perfil
              </a>
              <a 
                href="#settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Settings size={16} className="mr-2" />
                Configuración
              </a>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;