import React, { useState } from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import Button from '../common/Button';
import { Download } from 'lucide-react';
import { activityLogs } from '../../data/movements';

/**
 * Componente para mostrar registro de actividades
 */
const ActivityLog = () => {
  // Estado para filtros
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    user: '',
    action: ''
  });

  // Opciones de tipos de acciones
  const actionTypes = [
    'Inicio de sesión',
    'Cierre de sesión',
    'Generación de reporte',
    'Entrada de stock',
    'Salida de stock',
    'Modificación de usuario',
    'Modificación de producto'
  ];

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filtrar actividades según los criterios
  const filteredLogs = activityLogs.filter(log => {
    const dateMatch = !filters.dateFrom || new Date(log.datetime) >= new Date(filters.dateFrom);
    const dateToMatch = !filters.dateTo || new Date(log.datetime) <= new Date(filters.dateTo);
    const userMatch = !filters.user || log.user.toLowerCase().includes(filters.user.toLowerCase());
    const actionMatch = !filters.action || log.action === filters.action;
    
    return dateMatch && dateToMatch && userMatch && actionMatch;
  });

  // Exportar registro a CSV
  const handleExport = () => {
    console.log('Exportando registro de actividades');
    // Aquí iría la lógica para exportar a CSV
  };

  // Definición de columnas para la tabla
  const columns = [
    {
      header: 'Fecha y Hora',
      accessor: 'datetime',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.datetime}</span>
      )
    },
    {
      header: 'Usuario',
      accessor: 'user',
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.user}</span>
      )
    },
    {
      header: 'Acción',
      accessor: 'action',
      render: (row) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        
        if (row.action === 'Inicio de sesión' || row.action === 'Cierre de sesión') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
        } else if (row.action.includes('Generación')) {
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-800';
        } else if (row.action.includes('Entrada')) {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
        } else if (row.action.includes('Salida')) {
          bgColor = 'bg-red-100';
          textColor = 'text-red-800';
        } else if (row.action.includes('Modificación')) {
          bgColor = 'bg-purple-100';
          textColor = 'text-purple-800';
        }
        
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
            {row.action}
          </span>
        );
      }
    },
    {
      header: 'Detalle',
      accessor: 'detail',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.detail}</span>
      )
    },
    {
      header: 'IP',
      accessor: 'ip',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.ip}</span>
      )
    }
  ];

  return (
    <Card 
      title="Registro de Actividades Recientes"
      actions={
        <Button 
          variant="secondary" 
          size="sm" 
          outline={true}
          icon={<Download size={16} />}
          onClick={handleExport}
        >
          Exportar Registro
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Desde</label>
          <input 
            type="date" 
            className="w-full border rounded-md px-3 py-1 text-sm"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Hasta</label>
          <input 
            type="date" 
            className="w-full border rounded-md px-3 py-1 text-sm"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Usuario</label>
          <input 
            type="text" 
            className="w-full border rounded-md px-3 py-1 text-sm"
            placeholder="Filtrar por usuario"
            name="user"
            value={filters.user}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Acción</label>
          <select 
            className="w-full border rounded-md px-3 py-1 text-sm"
            name="action"
            value={filters.action}
            onChange={handleFilterChange}
          >
            <option value="">Todas las acciones</option>
            {actionTypes.map((action, index) => (
              <option key={index} value={action}>{action}</option>
            ))}
          </select>
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredLogs} 
        emptyMessage="No hay actividades registradas que coincidan con los filtros"
      />
    </Card>
  );
};

export default ActivityLog;