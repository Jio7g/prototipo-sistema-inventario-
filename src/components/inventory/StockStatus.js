import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import { sampleProducts, categories } from '../../data/products';

/**
 * Componente para mostrar el estado actual del inventario por categorías
 */
const StockStatus = () => {
  // Agrupar productos por categoría
  const inventoryByCategory = categories.map(category => {
    const productsInCategory = sampleProducts.filter(
      product => product.category === category
    );
    
    const totalQuantity = productsInCategory.reduce(
      (sum, product) => sum + product.quantity, 0
    );
    
    const totalValue = productsInCategory.reduce(
      (sum, product) => sum + (product.price * product.quantity), 0
    );
    
    return {
      category,
      quantity: totalQuantity,
      value: totalValue
    };
  });

  // Calcular totales
  const totalQuantity = inventoryByCategory.reduce(
    (sum, item) => sum + item.quantity, 0
  );
  
  const totalValue = inventoryByCategory.reduce(
    (sum, item) => sum + item.value, 0
  );

  // Definición de columnas para la tabla
  const columns = [
    {
      header: 'Categoría',
      accessor: 'category',
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.category}</span>
      )
    },
    {
      header: 'Productos',
      accessor: 'quantity',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.quantity} unidades</span>
      )
    },
    {
      header: 'Valor Total',
      accessor: 'value',
      render: (row) => (
        <span className="text-sm text-gray-500">${row.value.toFixed(2)}</span>
      )
    }
  ];

  return (
    <Card title="Estado Actual del Inventario">
      <Table 
        columns={columns} 
        data={inventoryByCategory} 
        emptyMessage="No hay información de inventario disponible"
      />
      
      {/* Fila de totales */}
      <div className="mt-2 bg-gray-50 p-3 rounded-b-md">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm font-bold text-gray-900">Total</div>
          <div className="text-sm font-bold text-gray-900">{totalQuantity} unidades</div>
          <div className="text-sm font-bold text-gray-900">${totalValue.toFixed(2)}</div>
        </div>
      </div>
    </Card>
  );
};

export default StockStatus;