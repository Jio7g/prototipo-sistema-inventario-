import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Settings } from 'lucide-react';
import Button from '../common/Button';
import StockStatus from './StockStatus';
import MovementHistory from './MovementHistory';
import PendingOrders from './PendingOrders';
import StockEntry from './StockEntry';

/**
 * Componente principal para la gestión de inventario
 */
const Inventory = () => {
  // Estados para controlar los modales
  const [showStockEntryModal, setShowStockEntryModal] = useState(false);
  const [showStockExitModal, setShowStockExitModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  
  // Estado para controlar la vista de historial completo
  const [showFullHistory, setShowFullHistory] = useState(false);

  // Manejar operaciones sobre órdenes pendientes
  const handleViewOrder = (order) => {
    console.log('Ver detalle de orden:', order);
    // Aquí iría la lógica para mostrar detalles de la orden
  };

  const handleReceiveOrder = (order) => {
    console.log('Recibir orden:', order);
    setShowStockEntryModal(true);
    // Aquí se podría precargar la información de la orden en el formulario
  };

  // Manejar registro de entradas/salidas
  const handleSaveMovement = (movementData) => {
    console.log('Movimiento registrado:', movementData);
    // Aquí iría la lógica para procesar el movimiento
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Control de Inventario</h2>
          <p className="text-gray-500">Gestiona las entradas y salidas de productos</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="success"
            icon={<ArrowUpCircle size={18} />}
            onClick={() => setShowStockEntryModal(true)}
          >
            Entrada de Stock
          </Button>
          <Button 
            variant="danger"
            icon={<ArrowDownCircle size={18} />}
            onClick={() => setShowStockExitModal(true)}
          >
            Salida de Stock
          </Button>
          <Button 
            variant="warning"
            icon={<Settings size={18} />}
            onClick={() => setShowAdjustmentModal(true)}
          >
            Ajuste
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StockStatus />
        
        <MovementHistory 
          simple={!showFullHistory} 
          onViewAll={() => setShowFullHistory(true)} 
        />
      </div>

      <PendingOrders 
        onViewOrder={handleViewOrder}
        onReceiveOrder={handleReceiveOrder}
      />

      {/* Modal de entrada de stock */}
      <StockEntry 
        isOpen={showStockEntryModal}
        onClose={() => setShowStockEntryModal(false)}
        onSave={handleSaveMovement}
        isEntry={true}
      />

      {/* Modal de salida de stock */}
      <StockEntry 
        isOpen={showStockExitModal}
        onClose={() => setShowStockExitModal(false)}
        onSave={handleSaveMovement}
        isEntry={false}
      />

      {/* Modal de ajuste de stock (reutiliza el mismo componente) */}
      <StockEntry 
        isOpen={showAdjustmentModal}
        onClose={() => setShowAdjustmentModal(false)}
        onSave={handleSaveMovement}
        isEntry={true} // o false, según cómo se quiera manejar
      />
    </div>
  );
};

export default Inventory;