import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { FileBarChart } from 'lucide-react';
import { categories } from '../../data/products';

/**
 * Componente para configurar opciones de reportes
 * 
 * @param {Function} onGenerateReport - Función para generar un reporte
 */
const ReportOptions = ({ onGenerateReport }) => {
  // Opciones de tipos de reporte
  const reportTypes = [
    'Inventario Actual',
    'Productos Bajo Stock',
    'Movimientos por Período',
    'Valoración de Inventario',
    'Productos Sin Movimiento',
    'Análisis de Proveedores'
  ];

  // Opciones de formato
  const formatTypes = [
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF (.pdf)' },
    { value: 'csv', label: 'CSV (.csv)' }
  ];

  // Opciones de rango de fechas
  const dateRanges = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Última semana' },
    { value: 'month', label: 'Último mes' },
    { value: 'quarter', label: 'Último trimestre' },
    { value: 'year', label: 'Último año' },
    { value: 'custom', label: 'Personalizado' }
  ];

  // Estado del formulario
  const [formData, setFormData] = useState({
    reportType: 'Inventario Actual',
    format: 'excel',
    dateRange: 'month',
    customDateFrom: '',
    customDateTo: '',
    category: '',
    includeImages: false,
    onlyActiveProducts: true
  });

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar generación de reporte
  const handleGenerateReport = () => {
    onGenerateReport(formData);
  };

  // Determinar si se deben mostrar campos de fecha personalizada
  const showCustomDateFields = formData.dateRange === 'custom';

  return (
    <Card title="Configuración de Reporte">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Reporte</label>
          <select 
            id="reportType" 
            name="reportType"
            className="w-full border rounded-md px-3 py-2"
            value={formData.reportType}
            onChange={handleChange}
          >
            {reportTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">Formato</label>
          <select 
            id="format" 
            name="format"
            className="w-full border rounded-md px-3 py-2"
            value={formData.format}
            onChange={handleChange}
          >
            {formatTypes.map((format) => (
              <option key={format.value} value={format.value}>{format.label}</option>
            ))}
          </select>
        </div>
        
        {/* Campos de fecha solo si el reporte lo requiere */}
        {formData.reportType === 'Movimientos por Período' || formData.reportType === 'Productos Sin Movimiento' ? (
          <>
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Rango de Fechas</label>
              <select 
                id="dateRange" 
                name="dateRange"
                className="w-full border rounded-md px-3 py-2"
                value={formData.dateRange}
                onChange={handleChange}
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
            
            {/* Campos para fecha personalizada */}
            {showCustomDateFields && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="customDateFrom" className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                  <input 
                    type="date" 
                    id="customDateFrom" 
                    name="customDateFrom"
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.customDateFrom}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="customDateTo" className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                  <input 
                    type="date" 
                    id="customDateTo" 
                    name="customDateTo"
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.customDateTo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </>
        ) : null}
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select 
            id="category" 
            name="category"
            className="w-full border rounded-md px-3 py-2"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Opciones adicionales */}
        <div className="flex flex-col justify-end">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="includeImages" 
              name="includeImages"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={formData.includeImages}
              onChange={handleChange}
            />
            <label htmlFor="includeImages" className="ml-2 block text-sm text-gray-700">
              Incluir imágenes (solo PDF)
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              id="onlyActiveProducts" 
              name="onlyActiveProducts"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={formData.onlyActiveProducts}
              onChange={handleChange}
            />
            <label htmlFor="onlyActiveProducts" className="ml-2 block text-sm text-gray-700">
              Solo productos activos
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="primary"
          icon={<FileBarChart size={18} />}
          onClick={handleGenerateReport}
        >
          Generar Reporte
        </Button>
      </div>
    </Card>
  );
};

export default ReportOptions;