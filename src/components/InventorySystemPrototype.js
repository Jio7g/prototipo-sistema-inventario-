import { useState } from 'react';
import Layout from './layout/Layout';
import Dashboard from './dashboard/Dashboard';
import Products from './products/Products';
import Inventory from './inventory/Inventory';
import Reports from './reports/Reports';
import Admin from './admin/Admin';

/**
 * Componente principal del sistema de gestión de inventarios
 * Funciona como coordinador entre los diferentes módulos
 */
const InventorySystemPrototype = () => {
  // Estado para controlar la vista activa
  const [activeView, setActiveView] = useState('dashboard');

  // Renderizado condicional de la vista según el estado activo
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'inventory':
        return <Inventory />;
      case 'reports':
        return <Reports />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default InventorySystemPrototype;