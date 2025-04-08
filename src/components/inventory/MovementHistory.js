import React, { useState } from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import { recentMovements } from '../../data/movements';
import { Download } from 'lucide-react';
import Button from '../common/Button';

/**
 * Componente para mostrar historial de movimientos
 * 
 * @param {Boolean} simple - Si es true, muestra una versión simplificada para el dashboard
 * @param {Number} limit - Límite de movimientos a mostrar (para versión simple)
 * @param {Function} onViewAll - Función para ver historial completo (para versión simple)
 */
const MovementHistory = ({ simple = false, limit = 4, onViewAll }) => {
  // Estado para filtros (solo en versión completa)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    type: '',
    product: ''
  });

  // Aplicar filtros a los movimientos
  const filteredMovements = recentMovements
    // Aplicar filtros solo en la versión completa
    .filter(movement => {
      if (simple) return true;
      
      const dateMatch = !filters.dateFrom || new Date(movement.date) >= new Date(filters.dateFrom);
      const dateToMatch = !filters.dateTo || new Date(movement.date) <= new Date(filters.dateTo);
      const typeMatch = !filters.type || movement.type === filters.type;
      const productMatch = !filters.product || movement.product.toLowerCase().includes(filters.product.toLowerCase());
      
      return dateMatch && dateToMatch && typeMatch && productMatch;
    })
    // Limitar en versión simple
    .slice(0, simple ? limit : undefined);

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Definición de columnas para la tabla
  const columns = [
    ...(simple ? [] : [
      {
        header: 'Fecha',
        accessor: 'date',
        render: (row) => (
          <span className="text-sm text-gray-500">{row.date}</span>
        )
      }
    ]),
    {
      header: 'Producto',
      accessor: 'product',
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.product}</span>
      )
    },
    {
      header: 'Tipo',
      accessor: 'type',
      render: (row) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          row.type === 'Entrada' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.type}
        </span>
      )
    },
    {
      header: 'Cantidad',
      accessor: 'quantity',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.quantity}</span>
      )
    },
    ...(simple ? [] : [
      {
        header: 'Usuario',
        accessor: 'user',
        render: (row) => (
          <span className="text-sm text-gray-500">{row.user}</span>
        )
      }
    ])
  ];

  return (
    <Card 
      title="Historial de Movimientos"
      actions={simple ? (
        <button 
          className="text-blue-500 text-sm"
          onClick={onViewAll}
        >
          Ver historial completo
        </button>
      ) : (
        <Button 
          variant="secondary" 
          size="sm" 
          outline={true}
          icon={<Download size={16} />}
        >
          Exportar
        </Button>
      )}
    >
      {/* Filtros (solo en versión completa) */}
      {!simple && (
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
            <label className="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
            <select 
              className="w-full border rounded-md px-3 py-1 text-sm"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="Entrada">Entradas</option>
              <option value="Salida">Salidas</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Producto</label>
            <input 
              type="text" 
              className="w-full border rounded-md px-3 py-1 text-sm"
              placeholder="Buscar producto..."
              name="product"
              value={filters.product}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}

      <Table 
        columns={columns} 
        data={filteredMovements} 
        emptyMessage="No hay movimientos registrados"
      />
    </Card>
  );
};

export default MovementHistory;