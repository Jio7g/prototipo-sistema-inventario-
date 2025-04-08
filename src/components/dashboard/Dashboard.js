import React, { useState } from 'react';
import { BarChart3, PackageCheck, AlertTriangle, ArrowUpCircle } from 'lucide-react';
import StatusCard from './StatusCard';
import LowStockAlert from './LowStockAlert';
import LowStockTable from './LowStockTable';
import MovementsTable from './MovementsTable';
import { sampleProducts, getLowStockProducts } from '../../data/products';
import { recentMovements } from '../../data/movements';

/**
 * Componente principal del Dashboard
 */
const Dashboard = () => {
  // Estado para controlar la visibilidad de la alerta de stock bajo
  const [showLowStockAlert, setShowLowStockAlert] = useState(true);
  
  // Obtener productos con bajo stock
  const lowStockProducts = getLowStockProducts();

  // Manejadores de eventos
  const handleOrderClick = (product) => {
    console.log('Ordenar producto:', product);
    // Aquí iría la lógica para abrir un modal de orden o redireccionar
  };

  const handleViewHistory = () => {
    console.log('Ver historial completo');
    // Aquí iría la lógica para redireccionar a la vista de historial
  };

  return (
    <div className="p-6">
      {/* Alerta de productos con bajo stock */}
      {showLowStockAlert && lowStockProducts.length > 0 && (
        <LowStockAlert 
          lowStockProducts={lowStockProducts} 
          onClose={() => setShowLowStockAlert(false)} 
        />
      )}
      
      {/* Tarjetas de estado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatusCard 
          title="Total de Productos" 
          value={sampleProducts.length} 
          subtitle="5 categorías" 
          icon={PackageCheck} 
          iconColor="blue" 
        />
        
        <StatusCard 
          title="Valor Total de Inventario" 
          value="$42,680.75" 
          subtitle="↑ 8% vs. mes anterior" 
          icon={BarChart3} 
          iconColor="green" 
        />
        
        <StatusCard 
          title="Productos Bajo Stock" 
          value={lowStockProducts.length} 
          subtitle="Requieren atención" 
          icon={AlertTriangle} 
          iconColor="yellow" 
        />
        
        <StatusCard 
          title="Movimientos del Día" 
          value="12" 
          subtitle="8 salidas, 4 entradas" 
          icon={ArrowUpCircle} 
          iconColor="purple" 
        />
      </div>
      
      {/* Tablas principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowStockTable 
          products={lowStockProducts} 
          onOrderClick={handleOrderClick} 
        />
        
        <MovementsTable 
          movements={recentMovements} 
          onViewHistory={handleViewHistory} 
        />
      </div>
    </div>
  );
};

export default Dashboard;