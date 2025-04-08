// Datos de muestra para productos
export const sampleProducts = [
    { id: 1, sku: 'SMTV-001', name: 'Smart TV 55"', category: 'Televisores', quantity: 24, minStock: 10, price: 699.99, supplier: 'ElectroTech Inc.' },
    { id: 2, sku: 'LPTOP-002', name: 'Laptop Pro X', category: 'Computadoras', quantity: 8, minStock: 15, price: 1299.99, supplier: 'TechWorld' },
    { id: 3, sku: 'SMRTPH-003', name: 'Smartphone Galaxy', category: 'Teléfonos', quantity: 32, minStock: 20, price: 849.99, supplier: 'MobileTech' },
    { id: 4, sku: 'TBLT-004', name: 'Tablet Air', category: 'Tablets', quantity: 12, minStock: 15, price: 499.99, supplier: 'TechWorld' },
    { id: 5, sku: 'HDPHN-005', name: 'Auriculares Inalámbricos', category: 'Audio', quantity: 45, minStock: 25, price: 129.99, supplier: 'AudioTech' },
  ];
  
  // Función para obtener productos con bajo stock
  export const getLowStockProducts = () => {
    return sampleProducts.filter(product => product.quantity < product.minStock);
  };
  
  // Función para calcular el valor total del inventario
  export const calculateInventoryValue = () => {
    return sampleProducts.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  };
  
  // Categorías disponibles
  export const categories = [
    'Televisores',
    'Computadoras',
    'Teléfonos',
    'Tablets',
    'Audio'
  ];
  
  // Proveedores disponibles
  export const suppliers = [
    'ElectroTech Inc.',
    'TechWorld',
    'MobileTech',
    'AudioTech'
  ];