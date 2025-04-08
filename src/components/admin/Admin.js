import React, { useState } from 'react';
import AdminModules from './AdminModules';
import UserManagement from './UserManagement';
import ActivityLog from './ActivityLog';
import Card from '../common/Card';

/**
 * Componente principal para la sección de administración
 */
const Admin = () => {
  // Estado para el módulo actualmente seleccionado
  const [activeModule, setActiveModule] = useState('users');

  // Módulos implementados completamente
  const implementedModules = ['users', 'logs'];

  // Manejar selección de módulo
  const handleModuleSelect = (moduleId) => {
    setActiveModule(moduleId);
  };

  // Renderizar el contenido según el módulo seleccionado
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'users':
        return <UserManagement />;
      case 'logs':
        return <ActivityLog />;
      default:
        // Para los módulos no implementados, mostrar mensaje de "próximamente"
        return (
          <Card>
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Módulo en desarrollo
              </h3>
              <p className="text-gray-500">
                El módulo "{activeModule}" se encuentra en desarrollo y estará disponible próximamente.
              </p>
              <div className="mt-6 text-4xl text-blue-400">
                🚧
              </div>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Administración del Sistema</h2>
          <p className="text-gray-500">Gestiona usuarios, roles y configuraciones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <AdminModules 
            activeModule={activeModule}
            onSelectModule={handleModuleSelect}
          />
        </div>
        
        <div className="lg:col-span-2">
          {renderModuleContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;