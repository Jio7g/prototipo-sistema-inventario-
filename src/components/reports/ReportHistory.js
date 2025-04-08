import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import { Download, Trash2 } from 'lucide-react';
import { recentReports } from '../../data/movements';

/**
 * Componente para mostrar historial de reportes generados
 * 
 * @param {Function} onDownload - Función para descargar un reporte
 * @param {Function} onDelete - Función para eliminar un reporte
 */
const ReportHistory = ({ onDownload, onDelete }) => {
  // Definición de columnas para la tabla
  const columns = [
    {
      header: 'Nombre',
      accessor: 'name',
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.name}</span>
      )
    },
    {
      header: 'Generado',
      accessor: 'generated',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.generated}</span>
      )
    },
    {
      header: 'Tipo',
      accessor: 'type',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.type}</span>
      )
    },
    {
      header: 'Formato',
      accessor: 'format',
      render: (row) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        
        if (row.format === 'Excel') {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
        } else if (row.format === 'PDF') {
          bgColor = 'bg-red-100';
          textColor = 'text-red-800';
        } else if (row.format === 'CSV') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
        }
        
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
            {row.format}
          </span>
        );
      }
    },
    {
      header: 'Usuario',
      accessor: 'user',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.user}</span>
      )
    },
    {
      header: 'Acciones',
      accessor: 'id',
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            className="text-blue-600 hover:text-blue-800 flex items-center"
            onClick={() => onDownload(row)}
            title="Descargar"
          >
            <Download size={16} />
          </button>
          <button 
            className="text-red-600 hover:text-red-800 flex items-center"
            onClick={() => onDelete(row)}
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <Card title="Reportes Recientes">
      <Table 
        columns={columns} 
        data={recentReports} 
        emptyMessage="No hay reportes generados recientemente"
      />
    </Card>
  );
};

export default ReportHistory;