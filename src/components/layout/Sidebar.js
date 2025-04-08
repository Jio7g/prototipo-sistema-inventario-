import React from 'react';
import { 
  Home, 
  PackageCheck, 
  ListChecks, 
  FileBarChart, 
  UserCog 
} from 'lucide-react';

/**
 * Componente Sidebar
 * Maneja la navegación principal
 */
const Sidebar = ({ activeView, setActiveView }) => {
  // Array de elementos de navegación
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Productos', icon: PackageCheck },
    { id: 'inventory', label: 'Inventario', icon: ListChecks },
    { id: 'reports', label: 'Reportes', icon: FileBarChart },
    { id: 'admin', label: 'Administración', icon: UserCog }
  ];

  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 h-screen">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold">XYZ Inventario</h2>
      </div>
      <nav className="p-2">
        <ul>
          {navItems.map(item => (
            <li key={item.id} className="mb-1">
              <button 
                onClick={() => setActiveView(item.id)}
                className={`flex items-center p-3 w-full rounded-md ${
                  activeView === item.id 
                    ? 'bg-blue-600' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <item.icon className="mr-3" size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;