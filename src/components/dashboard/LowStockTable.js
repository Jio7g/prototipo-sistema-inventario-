import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';

/**
 * Componente para mostrar tabla de productos con bajo stock
 * 
 * @param {Array} products - Productos con bajo stock
 * @param {Function} onOrderClick - Función para manejar clic en "Ordenar"
 */
const LowStockTable = ({ products, onOrderClick }) => {
  // Definición de columnas para la tabla
  const columns = [
    {
      header: 'Producto',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.sku}</div>
        </div>
      )
    },
    {
      header: 'Stock Actual',
      accessor: 'quantity',
      render: (row) => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          {row.quantity}
        </span>
      )
    },
    {
      header: 'Stock Mínimo',
      accessor: 'minStock',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.minStock}</span>
      )
    },
    {
      header: 'Acciones',
      accessor: 'id',
      render: (row) => (
        <button 
          className="text-blue-600 hover:text-blue-800"
          onClick={() => onOrderClick && onOrderClick(row)}
        >
          Ordenar
        </button>
      )
    }
  ];

  return (
    <Card 
      title="Productos con Bajo Stock"
      actions={<button className="text-blue-500 text-sm">Ver todos</button>}
    >
      <Table 
        columns={columns} 
        data={products} 
        emptyMessage="No hay productos con bajo stock"
      />
    </Card>
  );
};

export default LowStockTable;