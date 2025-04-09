import React from 'react';
import Card from '../common/Card';
import { FileBarChart } from 'lucide-react';

/**
 * Componente para mostrar lista de reportes disponibles
 * 
 * @param {Array} reports - Lista de tipos de reportes disponibles
 * @param {Function} onSelectReport - Función para seleccionar un reporte
 * @param {String} activeReport - Reporte actualmente seleccionado
 */
const ReportList = ({ reports, onSelectReport, activeReport }) => {
  // Si no se proporciona una lista, usamos esta por defecto
  const defaultReports = [
    {
      id: 'inventory',
      name: 'Inventario Actual',
      description: 'Reporte completo del inventario con cantidades y valores'
    },
    {
      id: 'lowStock',
      name: 'Productos Bajo Stock',
      description: 'Productos por debajo del nivel mínimo de stock'
    },
    {
      id: 'movements',
      name: 'Movimientos por Período',
      description: 'Entradas y salidas de inventario en un período específico'
    },
    {
      id: 'valuation',
      name: 'Valoración de Inventario',
      description: 'Valor del inventario actual a costo y precio de venta'
    },
  ];

  const reportList = reports || defaultReports;

  return (
    <Card title="Reportes Disponibles">
      <ul className="space-y-2">
        {reportList.map((report) => (
          <li key={report.id}>
            <button 
              className={`flex items-center w-full text-left p-2 rounded hover:bg-gray-100 ${
                activeReport === report.name ? 'bg-blue-50 text-blue-600' : 'text-blue-600'
              }`}
              onClick={() => onSelectReport(report.name)}
            >
              <FileBarChart size={16} className="mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">{report.name}</div>
                {report.description && (
                  <div className="text-xs text-gray-500">{report.description}</div>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ReportList;