import { useState } from 'react';
import { 
  BarChart3, 
  PackageCheck, 
  ListChecks, 
  FileBarChart, 
  UserCog, 
  Bell, 
  Search, 
  Plus, 
  FileText, 
  AlertTriangle, 
  Truck, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Settings,
  Home
} from 'lucide-react';

const InventorySystemPrototype = () => {
  // Estado para controlar la vista activa
  const [activeView, setActiveView] = useState('dashboard');
  // Estado para controlar la notificación de stock bajo
  const [showLowStockAlert, setShowLowStockAlert] = useState(true);
  // Estado para modal de nuevo producto
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  // Estado para modal de entrada de stock
  const [showStockEntryModal, setShowStockEntryModal] = useState(false);

  // Datos de ejemplo para el prototipo
  const sampleProducts = [
    { id: 1, sku: 'SMTV-001', name: 'Smart TV 55"', category: 'Televisores', quantity: 24, minStock: 10, price: 699.99, supplier: 'ElectroTech Inc.' },
    { id: 2, sku: 'LPTOP-002', name: 'Laptop Pro X', category: 'Computadoras', quantity: 8, minStock: 15, price: 1299.99, supplier: 'TechWorld' },
    { id: 3, sku: 'SMRTPH-003', name: 'Smartphone Galaxy', category: 'Teléfonos', quantity: 32, minStock: 20, price: 849.99, supplier: 'MobileTech' },
    { id: 4, sku: 'TBLT-004', name: 'Tablet Air', category: 'Tablets', quantity: 12, minStock: 15, price: 499.99, supplier: 'TechWorld' },
    { id: 5, sku: 'HDPHN-005', name: 'Auriculares Inalámbricos', category: 'Audio', quantity: 45, minStock: 25, price: 129.99, supplier: 'AudioTech' },
  ];

  // Datos de movimientos recientes para el prototipo
  const recentMovements = [
    { id: 1, product: 'Laptop Pro X', type: 'Entrada', quantity: 15, date: '2025-04-05', user: 'Juan Pérez' },
    { id: 2, product: 'Smartphone Galaxy', type: 'Salida', quantity: 8, date: '2025-04-06', user: 'María López' },
    { id: 3, product: 'Auriculares Inalámbricos', type: 'Salida', quantity: 5, date: '2025-04-07', user: 'Carlos Gómez' },
    { id: 4, product: 'Tablet Air', type: 'Entrada', quantity: 20, date: '2025-04-08', user: 'Juan Pérez' },
  ];

  // Productos con bajo stock
  const lowStockProducts = sampleProducts.filter(product => product.quantity < product.minStock);

  // Componente para la barra lateral de navegación
  const Sidebar = () => (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 h-screen">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold">XYZ Inventario</h2>
      </div>
      <nav className="p-2">
        <ul>
          <li className="mb-1">
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center p-3 w-full rounded-md ${activeView === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <Home className="mr-3" size={20} />
              <span>Dashboard</span>
            </button>
          </li>
          <li className="mb-1">
            <button 
              onClick={() => setActiveView('products')}
              className={`flex items-center p-3 w-full rounded-md ${activeView === 'products' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <PackageCheck className="mr-3" size={20} />
              <span>Productos</span>
            </button>
          </li>
          <li className="mb-1">
            <button 
              onClick={() => setActiveView('inventory')}
              className={`flex items-center p-3 w-full rounded-md ${activeView === 'inventory' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <ListChecks className="mr-3" size={20} />
              <span>Inventario</span>
            </button>
          </li>
          <li className="mb-1">
            <button 
              onClick={() => setActiveView('reports')}
              className={`flex items-center p-3 w-full rounded-md ${activeView === 'reports' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <FileBarChart className="mr-3" size={20} />
              <span>Reportes</span>
            </button>
          </li>
          <li className="mb-1">
            <button 
              onClick={() => setActiveView('admin')}
              className={`flex items-center p-3 w-full rounded-md ${activeView === 'admin' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <UserCog className="mr-3" size={20} />
              <span>Administración</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  // Componente para la barra superior
  const TopBar = () => (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">
          {activeView === 'dashboard' && 'Dashboard'}
          {activeView === 'products' && 'Gestión de Productos'}
          {activeView === 'inventory' && 'Control de Inventario'}
          {activeView === 'reports' && 'Reportes y Análisis'}
          {activeView === 'admin' && 'Administración del Sistema'}
        </h1>
      </div>
      <div className="flex items-center">
        <div className="relative mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 relative">
          <Bell size={20} />
          {lowStockProducts.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {lowStockProducts.length}
            </span>
          )}
        </button>
        <div className="ml-4 flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            GP
          </div>
          <span className="ml-2 font-medium">Gerente Productos</span>
        </div>
      </div>
    </div>
  );

  // Componente para la alerta de stock bajo
  const LowStockAlert = () => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-500 mr-3" />
          <div>
            <h3 className="font-medium">¡Alerta de stock bajo!</h3>
            <p className="text-sm text-gray-600">Hay {lowStockProducts.length} productos por debajo del nivel mínimo recomendado.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowLowStockAlert(false)}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>
    </div>
  );

  // Componente para la vista del dashboard
  const Dashboard = () => (
    <div className="p-6">
      {showLowStockAlert && lowStockProducts.length > 0 && <LowStockAlert />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Total de Productos</h3>
            <PackageCheck className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{sampleProducts.length}</p>
          <p className="text-sm text-gray-500 mt-2">5 categorías</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Valor Total de Inventario</h3>
            <BarChart3 className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">$42,680.75</p>
          <p className="text-sm text-green-500 mt-2">↑ 8% vs. mes anterior</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Productos Bajo Stock</h3>
            <AlertTriangle className="text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">{lowStockProducts.length}</p>
          <p className="text-sm text-yellow-500 mt-2">Requieren atención</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Movimientos del Día</h3>
            <ArrowUpCircle className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-gray-500 mt-2">8 salidas, 4 entradas</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Productos con Bajo Stock</h3>
            <button className="text-blue-500 text-sm">Ver todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actual</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Mínimo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lowStockProducts.map(product => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {product.minStock}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800">Ordenar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Movimientos Recientes</h3>
            <button className="text-blue-500 text-sm">Ver historial</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentMovements.map(movement => (
                  <tr key={movement.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {movement.product}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        movement.type === 'Entrada' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {movement.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {movement.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {movement.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente para la vista de productos
  const Products = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Catálogo de Productos</h2>
          <p className="text-gray-500">Gestiona tu inventario de productos</p>
        </div>
        <button 
          onClick={() => setShowNewProductModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" /> Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todas las categorías</option>
              <option>Televisores</option>
              <option>Computadoras</option>
              <option>Teléfonos</option>
              <option>Tablets</option>
              <option>Audio</option>
            </select>
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todos los proveedores</option>
              <option>ElectroTech Inc.</option>
              <option>TechWorld</option>
              <option>MobileTech</option>
              <option>AudioTech</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleProducts.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.quantity < product.minStock
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-800">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">5</span> resultados
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md bg-gray-200 text-gray-600">Anterior</button>
            <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded-md bg-gray-200 text-gray-600">Siguiente</button>
          </div>
        </div>
      </div>

      {showNewProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Nuevo Producto</h3>
              <button onClick={() => setShowNewProductModal(false)} className="text-gray-500">×</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input type="text" id="sku" className="w-full border rounded-md px-3 py-2" placeholder="Código único" />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                <input type="text" id="name" className="w-full border rounded-md px-3 py-2" placeholder="Nombre" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select id="category" className="w-full border rounded-md px-3 py-2">
                  <option>Seleccionar categoría</option>
                  <option>Televisores</option>
                  <option>Computadoras</option>
                  <option>Teléfonos</option>
                  <option>Tablets</option>
                  <option>Audio</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Cantidad Inicial</label>
                <input type="number" id="quantity" className="w-full border rounded-md px-3 py-2" placeholder="0" />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio de Venta</label>
                <input type="number" id="price" className="w-full border rounded-md px-3 py-2" placeholder="0.00" />
              </div>
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">Precio de Compra</label>
                <input type="number" id="cost" className="w-full border rounded-md px-3 py-2" placeholder="0.00" />
              </div>
              <div>
                <label htmlFor="minStock" className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                <input type="number" id="minStock" className="w-full border rounded-md px-3 py-2" placeholder="0" />
              </div>
              <div>
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                <select id="supplier" className="w-full border rounded-md px-3 py-2">
                  <option>Seleccionar proveedor</option>
                  <option>ElectroTech Inc.</option>
                  <option>TechWorld</option>
                  <option>MobileTech</option>
                  <option>AudioTech</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea id="description" rows="3" className="w-full border rounded-md px-3 py-2" placeholder="Descripción del producto"></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowNewProductModal(false)} className="px-4 py-2 border rounded-md">Cancelar</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Guardar Producto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Componente para la vista de inventario
  const Inventory = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Control de Inventario</h2>
          <p className="text-gray-500">Gestiona las entradas y salidas de productos</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowStockEntryModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <ArrowUpCircle size={18} className="mr-1" /> Entrada de Stock
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center">
            <ArrowDownCircle size={18} className="mr-1" /> Salida de Stock
          </button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center">
            <Settings size={18} className="mr-1" /> Ajuste
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Estado Actual del Inventario</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Televisores</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">24 unidades</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$16,799.76</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Computadoras</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">8 unidades</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$10,399.92</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Teléfonos</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">32 unidades</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$27,199.68</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Tablets</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">12 unidades</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$5,999.88</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Audio</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">45 unidades</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$5,849.55</td>
                </tr>
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">Total</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">121 unidades</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">$66,248.79</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Historial de Movimientos</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentMovements.map(movement => (
                  <tr key={movement.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {movement.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {movement.product}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        movement.type === 'Entrada' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {movement.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {movement.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {movement.user}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="text-blue-600 hover:text-blue-800">Ver historial completo</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Movimientos Pendientes</h3>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <p>Ordenes pendientes por recibir</p>
          <button className="text-blue-600 hover:text-blue-800">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># Orden</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Orden</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Esperada</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">ORD-2025-0042</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">TechWorld</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-01</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-10</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    En tránsito
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Ver detalle</button>
                  <button className="text-green-600 hover:text-green-800">Recibir</button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">ORD-2025-0043</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">ElectroTech Inc.</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-03</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-12</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Confirmada
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800">Ver detalle</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showStockEntryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Entrada de Stock</h3>
              <button onClick={() => setShowStockEntryModal(false)} className="text-gray-500">×</button>
            </div>
            <div className="mb-4">
              <label htmlFor="entryType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Entrada</label>
              <select id="entryType" className="w-full border rounded-md px-3 py-2">
                <option>Compra a Proveedor</option>
                <option>Devolución de Cliente</option>
                <option>Ajuste de Inventario</option>
                <option>Transferencia de Sucursal</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="orderReference" className="block text-sm font-medium text-gray-700 mb-1">Referencia (Orden de Compra)</label>
              <select id="orderReference" className="w-full border rounded-md px-3 py-2">
                <option>Seleccionar orden</option>
                <option>ORD-2025-0042 - TechWorld</option>
                <option>ORD-2025-0043 - ElectroTech Inc.</option>
                <option>Sin referencia</option>
              </select>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Productos</h4>
              <div className="border rounded-md p-4 mb-2">
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div className="col-span-2">
                    <label htmlFor="product1" className="block text-xs font-medium text-gray-700 mb-1">Producto</label>
                    <select id="product1" className="w-full border rounded-md px-3 py-2 text-sm">
                      <option>Seleccionar producto</option>
                      {sampleProducts.map(product => (
                        <option key={product.id}>{product.name} ({product.sku})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity1" className="block text-xs font-medium text-gray-700 mb-1">Cantidad</label>
                    <input type="number" id="quantity1" className="w-full border rounded-md px-3 py-2 text-sm" placeholder="0" />
                  </div>
                  <div>
                    <label htmlFor="location1" className="block text-xs font-medium text-gray-700 mb-1">Ubicación</label>
                    <select id="location1" className="w-full border rounded-md px-3 py-2 text-sm">
                      <option>Almacén Principal</option>
                      <option>Estantería A1</option>
                      <option>Estantería B2</option>
                      <option>Bodega 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">+ Añadir otro producto</button>
            </div>
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea id="notes" rows="2" className="w-full border rounded-md px-3 py-2" placeholder="Información adicional..."></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowStockEntryModal(false)} className="px-4 py-2 border rounded-md">Cancelar</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md">Registrar Entrada</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Componente para la vista de reportes
  const Reports = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reportes y Análisis</h2>
          <p className="text-gray-500">Analiza el desempeño de tu inventario</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <FileText size={18} className="mr-1" /> Generar Reporte
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Reportes Disponibles</h3>
          <ul className="space-y-2">
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FileBarChart size={16} className="mr-2" /> Inventario Actual
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FileBarChart size={16} className="mr-2" /> Productos Bajo Stock
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FileBarChart size={16} className="mr-2" /> Movimientos por Período
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FileBarChart size={16} className="mr-2" /> Valoración de Inventario
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FileBarChart size={16} className="mr-2" /> Productos Sin Movimiento
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FileBarChart size={16} className="mr-2" /> Análisis de Proveedores
              </button>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Configuración de Reporte</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Reporte</label>
              <select id="reportType" className="w-full border rounded-md px-3 py-2">
                <option>Inventario Actual</option>
                <option>Productos Bajo Stock</option>
                <option>Movimientos por Período</option>
                <option>Valoración de Inventario</option>
                <option>Productos Sin Movimiento</option>
                <option>Análisis de Proveedores</option>
              </select>
            </div>
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">Formato</label>
              <select id="format" className="w-full border rounded-md px-3 py-2">
                <option>Excel (.xlsx)</option>
                <option>PDF (.pdf)</option>
                <option>CSV (.csv)</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Rango de Fechas</label>
              <select id="dateRange" className="w-full border rounded-md px-3 py-2">
                <option>Hoy</option>
                <option>Última semana</option>
                <option>Último mes</option>
                <option>Último trimestre</option>
                <option>Último año</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select id="category" className="w-full border rounded-md px-3 py-2">
                <option>Todas las categorías</option>
                <option>Televisores</option>
                <option>Computadoras</option>
                <option>Teléfonos</option>
                <option>Tablets</option>
                <option>Audio</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Generar Reporte</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Reportes Recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formato</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Inventario_Actual_20250408</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 09:12</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Inventario Actual</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Excel</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Gerente Productos</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Descargar</button>
                  <button className="text-gray-600 hover:text-gray-800">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Productos_BajoStock_20250407</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-07 16:45</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Productos Bajo Stock</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">PDF</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Gerente Productos</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Descargar</button>
                  <button className="text-gray-600 hover:text-gray-800">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Movimientos_Marzo2025</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-01 10:32</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Movimientos por Período</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Excel</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Juan Pérez</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Descargar</button>
                  <button className="text-gray-600 hover:text-gray-800">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Componente para la vista de administración
  const Admin = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Administración del Sistema</h2>
          <p className="text-gray-500">Gestiona usuarios, roles y configuraciones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Módulos del Sistema</h3>
          <ul className="space-y-2">
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <UserCog size={16} className="mr-2" /> Gestión de Usuarios
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <Settings size={16} className="mr-2" /> Roles y Permisos
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <Bell size={16} className="mr-2" /> Configuración de Alertas
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <Truck size={16} className="mr-2" /> Gestión de Proveedores
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FileText size={16} className="mr-2" /> Registro de Actividades
              </button>
            </li>
            <li>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <Settings size={16} className="mr-2" /> Configuración General
              </button>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Gestión de Usuarios</h3>
          
          <div className="mb-4 flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar usuario..." 
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <Plus size={18} className="mr-1" /> Nuevo Usuario
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acceso</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">admin</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Administrador Sistema</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Administrador</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 09:15</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                    <button className="text-red-600 hover:text-red-800">Bloquear</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">gerenteop</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Gerente de Operaciones</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Gerente</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 08:42</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                    <button className="text-red-600 hover:text-red-800">Bloquear</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">almacen1</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Personal de Almacén</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Operador</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-07 16:30</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                    <button className="text-red-600 hover:text-red-800">Bloquear</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">ventas1</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Personal de Ventas</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Consulta</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Inactivo
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-05 11:20</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                    <button className="text-green-600 hover:text-green-800">Activar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Registro de Actividades Recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 09:15:42</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">admin</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Inicio de sesión</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Acceso exitoso</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">192.168.1.100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 09:10:15</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">gerenteop</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Generación de reporte</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Reporte de inventario actual</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">192.168.1.105</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 08:52:30</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">almacen1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Entrada de stock</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Tablet Air - 20 unidades</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">192.168.1.120</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 08:45:12</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">gerenteop</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Inicio de sesión</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Acceso exitoso</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">192.168.1.105</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2025-04-08 08:30:05</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">admin</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Modificación de usuario</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Usuario: ventas1 - Cambio estado a inactivo</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">192.168.1.100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Renderizado de la vista según el estado
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default InventorySystemPrototype;