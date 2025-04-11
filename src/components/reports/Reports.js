import React, { useState } from 'react';
import ReportList from './ReportList';
import ReportOptions from './ReportOptions';
import ReportHistory from './ReportHistory';

/**
 * Componente principal para la sección de reportes
 */
const Reports = () => {
  // Estado para el tipo de reporte seleccionado
  const [selectedReport, setSelectedReport] = useState('Inventario Actual');
  
  // Estado para mostrar notificación de éxito
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Estado para el reporte recién generado
  const [lastGeneratedReport, setLastGeneratedReport] = useState(null);

  // Manejar selección de un reporte de la lista
  const handleSelectReport = (reportName) => {
    setSelectedReport(reportName);
  };

  // Manejar generación de un reporte
  const handleGenerateReport = (reportConfig) => {
    console.log('Generando reporte con config:', reportConfig);
    
    // Simulamos la generación del reporte
    const timestamp = new Date().toISOString().replace(/[:.]/g, '').substring(0, 15);
    const reportName = `${reportConfig.reportType.replace(/\s+/g, '_')}_${timestamp}`;
    
    const newReport = {
      id: Date.now(),
      name: reportName,
      generated: new Date().toLocaleString(),
      type: reportConfig.reportType,
      format: reportConfig.format === 'excel' ? 'Excel' : reportConfig.format === 'pdf' ? 'PDF' : 'CSV',
      user: 'Gerente Productos'
    };
    
    // Actualizar el último reporte generado
    setLastGeneratedReport(newReport);
    
    // Mostrar notificación de éxito
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Manejar descarga de un reporte
  const handleDownloadReport = (report) => {
    console.log('Descargando reporte:', report);
    // Aquí iría la lógica para descargar el reporte
  };

  // Manejar eliminación de un reporte
  const handleDeleteReport = (report) => {
    console.log('Eliminando reporte:', report);
    // Aquí iría la lógica para eliminar el reporte
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reportes de Inventario</h2>
          <p className="text-gray-500">Analiza el desempeño de tu inventario</p>
        </div>
      </div>

      {/* Notificación de éxito */}
      {showSuccess && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-bold">Reporte generado exitosamente</p>
              <p className="text-sm">
                El reporte {lastGeneratedReport?.name} ha sido generado y está listo para descargar.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ReportList 
          activeReport={selectedReport}
          onSelectReport={handleSelectReport}
        />
        
        <div className="lg:col-span-2">
          <ReportOptions 
            onGenerateReport={handleGenerateReport}
          />
        </div>
      </div>

      <ReportHistory 
        onDownload={handleDownloadReport}
        onDelete={handleDeleteReport}
      />
    </div>
  );
};

export default Reports;