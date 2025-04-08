import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Componente de alerta para productos con bajo stock
 * 
 * @param {Array} lowStockProducts - Array de productos con bajo stock
 * @param {Function} onClose - Función para cerrar la alerta
 */
const LowStockAlert = ({ lowStockProducts, onClose }) => {
  if (!lowStockProducts || lowStockProducts.length === 0) return null;
  
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-500 mr-3" />
          <div>
            <h3 className="font-medium">¡Alerta de stock bajo!</h3>
            <p className="text-sm text-gray-600">
              Hay {lowStockProducts.length} productos por debajo del nivel mínimo recomendado.
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default LowStockAlert;