import React, { useState } from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import Button from '../common/Button';
import { Search, Plus, Edit, Lock, Unlock } from 'lucide-react';
import Modal from '../common/Modal';

/**
 * Componente para la gestión de usuarios
 */
const UserManagement = () => {
  // Estado para el modal de usuario (nuevo/editar)
  const [userModalOpen, setUserModalOpen] = useState(false);
  
  // Estado para el usuario que se está editando
  const [currentUser, setCurrentUser] = useState(null);
  
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo de usuarios
  const users = [
    {
      id: 1,
      username: 'admin',
      name: 'Administrador Sistema',
      role: 'Administrador',
      status: 'Activo',
      lastAccess: '2025-04-08 09:15'
    },
    {
      id: 2,
      username: 'gerenteop',
      name: 'Gerente de Operaciones',
      role: 'Gerente',
      status: 'Activo',
      lastAccess: '2025-04-08 08:42'
    },
    {
      id: 3,
      username: 'almacen1',
      name: 'Personal de Almacén',
      role: 'Operador',
      status: 'Activo',
      lastAccess: '2025-04-07 16:30'
    },
    {
      id: 4,
      username: 'ventas1',
      name: 'Personal de Ventas',
      role: 'Consulta',
      status: 'Inactivo',
      lastAccess: '2025-04-05 11:20'
    }
  ];

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para nuevo usuario
  const handleAddUser = () => {
    setCurrentUser(null);
    setUserModalOpen(true);
  };

  // Abrir modal para editar usuario
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setUserModalOpen(true);
  };

  // Manejar cambio de estado (activar/desactivar)
  const handleToggleStatus = (user) => {
    console.log(`${user.status === 'Activo' ? 'Desactivar' : 'Activar'} usuario:`, user);
    // Aquí iría la lógica para cambiar el estado del usuario
  };

  // Definición de columnas para la tabla
  const columns = [
    {
      header: 'Usuario',
      accessor: 'username',
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.username}</span>
      )
    },
    {
      header: 'Nombre',
      accessor: 'name',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.name}</span>
      )
    },
    {
      header: 'Rol',
      accessor: 'role',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.role}</span>
      )
    },
    {
      header: 'Estado',
      accessor: 'status',
      render: (row) => {
        const isActive = row.status === 'Activo';
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Último Acceso',
      accessor: 'lastAccess',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.lastAccess}</span>
      )
    },
    {
      header: 'Acciones',
      accessor: 'id',
      render: (row) => {
        const isActive = row.status === 'Activo';
        return (
          <div className="flex space-x-2">
            <button 
              className="text-blue-600 hover:text-blue-800"
              onClick={() => handleEditUser(row)}
              title="Editar"
            >
              <Edit size={16} />
            </button>
            <button 
              className={isActive ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"}
              onClick={() => handleToggleStatus(row)}
              title={isActive ? "Bloquear" : "Activar"}
            >
              {isActive ? <Lock size={16} /> : <Unlock size={16} />}
            </button>
          </div>
        );
      }
    }
  ];

  // Configuración del formulario de usuario
  const userRoles = ['Administrador', 'Gerente', 'Operador', 'Consulta'];

  return (
    <Card title="Gestión de Usuarios">
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar usuario..." 
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="primary"
          icon={<Plus size={18} />}
          onClick={handleAddUser}
        >
          Nuevo Usuario
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        data={filteredUsers} 
        emptyMessage="No se encontraron usuarios"
      />

      {/* Modal de nuevo/editar usuario */}
      <Modal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        title={currentUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        footer={
          <>
            <Button 
              variant="secondary" 
              outline={true}
              onClick={() => setUserModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              {currentUser ? 'Actualizar' : 'Crear'} Usuario
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
            <input 
              type="text" 
              id="username" 
              className="w-full border rounded-md px-3 py-2" 
              placeholder="usuario123"
              defaultValue={currentUser?.username}
              disabled={!!currentUser} // No editable si estamos editando
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              id="name" 
              className="w-full border rounded-md px-3 py-2" 
              placeholder="Nombre Apellido"
              defaultValue={currentUser?.name}
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select 
              id="role" 
              className="w-full border rounded-md px-3 py-2"
              defaultValue={currentUser?.role}
            >
              <option value="">Seleccionar rol</option>
              {userRoles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              className="w-full border rounded-md px-3 py-2" 
              placeholder="usuario@ejemplo.com"
            />
          </div>
          {!currentUser && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full border rounded-md px-3 py-2" 
                  placeholder="********"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  className="w-full border rounded-md px-3 py-2" 
                  placeholder="********"
                />
              </div>
            </>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="active" 
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              defaultChecked={currentUser ? currentUser.status === 'Activo' : true}
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
              Usuario activo
            </label>
          </div>

          {currentUser && (
            <div className="mt-4">
              <Button 
                variant="secondary" 
                size="sm"
                outline={true}
              >
                Resetear Contraseña
              </Button>
              <p className="mt-1 text-xs text-gray-500">
                Se enviará un correo electrónico al usuario con instrucciones para establecer una nueva contraseña.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </Card>
  );
};

export default UserManagement;