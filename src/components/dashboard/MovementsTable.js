import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';

/**
 * Componente para mostrar tabla de movimientos recientes
 * 
 * @param {Array} movements - Movimientos recientes
 * @param {Function} onViewHistory - Función para ver historial completo
 */
const MovementsTable = ({ movements, onViewHistory }) => {
  // Definición de columnas para la tabla
  const columns = [
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
    {
      header: 'Fecha',
      accessor: 'date',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.date}</span>
      )
    }
  ];

  return (
    <Card 
      title="Movimientos Recientes"
      actions={
        <button 
          className="text-blue-500 text-sm"
          onClick={onViewHistory}
        >
          Ver historial
        </button>
      }
    >
      <Table 
        columns={columns} 
        data={movements} 
        emptyMessage="No hay movimientos recientes"
      />
    </Card>
  );
};

export default MovementsTable;