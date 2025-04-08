import React from 'react';
import Card from '../common/Card';
import { 
  UserCog, 
  Settings, 
  Bell, 
  Truck, 
  FileText, 
  Shield, 
  Layers, 
  Database
} from 'lucide-react';

/**
 * Componente para mostrar los módulos administrativos del sistema
 * 
 * @param {Function} onSelectModule - Función para seleccionar un módulo
 * @param {String} activeModule - Módulo actualmente seleccionado
 */
const AdminModules = ({ onSelectModule, activeModule }) => {
  // Lista de módulos administrativos
  const modules = [
    {
      id: 'users',
      name: 'Gestión de Usuarios',
      icon: UserCog,
      description: 'Administrar usuarios y permisos'
    },
    {
      id: 'roles',
      name: 'Roles y Permisos',
      icon: Shield,
      description: 'Configurar roles y permisos de usuarios'
    },
    {
      id: 'alerts',
      name: 'Configuración de Alertas',
      icon: Bell,
      description: 'Configurar notificaciones y alertas del sistema'
    },
    {
      id: 'suppliers',
      name: 'Gestión de Proveedores',
      icon: Truck,
      description: 'Administrar proveedores y contactos'
    },
    {
      id: 'logs',
      name: 'Registro de Actividades',
      icon: FileText,
      description: 'Ver historial de acciones en el sistema'
    },
    {
      id: 'backup',
      name: 'Copias de Seguridad',
      icon: Database,
      description: 'Gestionar respaldos de la base de datos'
    },
    {
      id: 'categories',
      name: 'Categorías de Productos',
      icon: Layers,
      description: 'Administrar categorías del catálogo'
    },
    {
      id: 'settings',
      name: 'Configuración General',
      icon: Settings,
      description: 'Ajustes generales del sistema'
    }
  ];

  return (
    <Card title="Módulos del Sistema">
      <ul className="space-y-2">
        {modules.map((module) => (
          <li key={module.id}>
            <button 
              className={`flex items-center w-full text-left p-2 rounded hover:bg-gray-100 ${
                activeModule === module.id ? 'bg-blue-50 text-blue-600' : 'text-blue-600'
              }`}
              onClick={() => onSelectModule(module.id)}
            >
              <module.icon size={16} className="mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">{module.name}</div>
                {module.description && (
                  <div className="text-xs text-gray-500">{module.description}</div>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AdminModules;