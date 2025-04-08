import React from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { Plus, Search, ArrowUpCircle, ArrowDownCircle, Settings } from 'lucide-react';
import { sampleProducts } from '../data/products';
import { recentMovements, pendingOrders, recentReports, activityLogs } from '../data/movements';

/**
 * Este archivo contiene versiones temporales simplificadas de los componentes
 * que aún no han sido refactorizados por completo. Sirven como reemplazo
 * mientras se completa la refactorización.
 * 
 * En una implementación real, cada uno de estos componentes sería
 * refactorizado en su propio archivo con subcomponentes.
 */

// Componente Products (versión temporal)
export const Products = ({ showNewProductModal, setShowNewProductModal }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Catálogo de Productos</h2>
          <p className="text-gray-500">Gestiona tu inventario de productos</p>
        </div>
        <Button 
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => setShowNewProductModal(true)}
        >
          Nuevo Producto
        </Button>
      </div>

      <Card>
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
      </Card>

      <Modal
        isOpen={showNewProductModal}
        onClose={() => setShowNewProductModal(false)}
        title="Nuevo Producto"
        footer={
          <>
            <Button 
              variant="secondary" 
              outline={true}
              onClick={() => setShowNewProductModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary">Guardar Producto</Button>
          </>
        }
      >
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
      </Modal>
    </div>
  );
};

// Componente Inventory (versión temporal)
export const Inventory = ({ showStockEntryModal, setShowStockEntryModal }) => {
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
          >
            Salida de Stock
          </Button>
          <Button 
            variant="warning"
            icon={<Settings size={18} />}
          >
            Ajuste
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Estado Actual del Inventario">
          {/* Contenido de la tarjeta */}
          <p className="text-gray-500">[Tabla de estado actual del inventario]</p>
        </Card>
        
        <Card title="Historial de Movimientos" actions={<button className="text-blue-600 hover:text-blue-800">Ver historial completo</button>}>
          {/* Contenido de la tarjeta */}
          <p className="text-gray-500">[Tabla de historial de movimientos]</p>
        </Card>
      </div>

      <Card title="Movimientos Pendientes">
        {/* Contenido de la tarjeta */}
        <p className="text-gray-500">[Tabla de movimientos pendientes]</p>
      </Card>
      
      <Modal
        isOpen={showStockEntryModal}
        onClose={() => setShowStockEntryModal(false)}
        title="Entrada de Stock"
        footer={
          <>
            <Button 
              variant="secondary" 
              outline={true}
              onClick={() => setShowStockEntryModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="success">Registrar Entrada</Button>
          </>
        }
      >
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
      </Modal>
    </div>
  );
};

// Componente Reports (versión temporal)
export const Reports = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reportes y Análisis</h2>
          <p className="text-gray-500">Analiza el desempeño de tu inventario</p>
        </div>
        <div>
          <Button variant="primary">Generar Reporte</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Reportes Disponibles">
          <p className="text-gray-500">[Lista de reportes disponibles]</p>
        </Card>
        
        <div className="lg:col-span-2">
          <Card title="Configuración de Reporte">
            <p className="text-gray-500">[Formulario de configuración de reportes]</p>
          </Card>
        </div>
      </div>

      <Card title="Reportes Recientes">
        <p className="text-gray-500">[Tabla de reportes recientes]</p>
      </Card>
    </div>
  );
};

// Componente Admin (versión temporal)
export const Admin = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Administración del Sistema</h2>
          <p className="text-gray-500">Gestiona usuarios, roles y configuraciones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Módulos del Sistema">
          <p className="text-gray-500">[Lista de módulos administrativos]</p>
        </Card>
        
        <div className="lg:col-span-2">
          <Card title="Gestión de Usuarios">
            <p className="text-gray-500">[Tabla de gestión de usuarios]</p>
          </Card>
        </div>
      </div>

      <Card title="Registro de Actividades Recientes">
        <p className="text-gray-500">[Tabla de registro de actividades]</p>
      </Card>
    </div>
  );
};