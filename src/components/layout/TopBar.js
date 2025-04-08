import React from 'react';
import { Search, Bell } from 'lucide-react';
import { getLowStockProducts } from '../../data/products';

/**
 * Componente TopBar
 * Muestra el encabezado y controles superiores
 */
const TopBar = ({ activeView }) => {
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
        <button className="p-2 relative">
          <Bell size={20} />
          {lowStockProducts.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {lowStockProducts.length}
            </span>
          )}
        </button>
        <div className="ml-4 flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            GP
          </div>
          <span className="ml-2 font-medium">Gerente Productos</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;