import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import { pendingOrders } from '../../data/movements';

/**
 * Componente para mostrar órdenes pendientes
 * 
 * @param {Function} onViewOrder - Función para ver detalles de una orden
 * @param {Function} onReceiveOrder - Función para recibir una orden
 */
const PendingOrders = ({ onViewOrder, onReceiveOrder }) => {
  // Definición de columnas para la tabla
  const columns = [
    {
      header: '# Orden',
      accessor: 'id',
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.id}</span>
      )
    },
    {
      header: 'Proveedor',
      accessor: 'supplier',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.supplier}</span>
      )
    },
    {
      header: 'Fecha Orden',
      accessor: 'orderDate',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.orderDate}</span>
      )
    },
    {
      header: 'Fecha Esperada',
      accessor: 'expectedDate',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.expectedDate}</span>
      )
    },
    {
      header: 'Estado',
      accessor: 'status',
      render: (row) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        
        if (row.status === 'En tránsito') {
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-800';
        } else if (row.status === 'Confirmada') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
        } else if (row.status === 'Pendiente') {
          bgColor = 'bg-orange-100';
          textColor = 'text-orange-800';
        } else if (row.status === 'Completada') {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
        }
        
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Acciones',
      accessor: 'id',
      render: (row) => (
        <div>
          <button 
            className="text-blue-600 hover:text-blue-800 mr-2"
            onClick={() => onViewOrder(row)}
          >
            Ver detalle
          </button>
          {row.status === 'En tránsito' && (
            <button 
              className="text-green-600 hover:text-green-800"
              onClick={() => onReceiveOrder(row)}
            >
              Recibir
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <Card 
      title="Movimientos Pendientes"
      actions={
        <div className="flex justify-between text-sm text-gray-500">
          <p>Ordenes pendientes por recibir</p>
          <button className="text-blue-600 hover:text-blue-800 ml-4">Ver todas</button>
        </div>
      }
    >
      <Table 
        columns={columns} 
        data={pendingOrders} 
        emptyMessage="No hay órdenes pendientes"
      />
    </Card>
  );
};

export default PendingOrders;