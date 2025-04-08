import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { sampleProducts } from '../../data/products';
import { Plus, Trash2 } from 'lucide-react';

/**
 * Componente para entrada de stock (formulario modal)
 * 
 * @param {Boolean} isOpen - Controla si el modal está abierto
 * @param {Function} onClose - Función para cerrar el modal
 * @param {Function} onSave - Función para registrar la entrada
 * @param {Boolean} isEntry - True para entrada, false para salida de stock
 */
const StockEntry = ({ isOpen, onClose, onSave, isEntry = true }) => {
  // Opciones para tipo de movimiento
  const entryTypes = [
    { value: 'purchase', label: 'Compra a Proveedor' },
    { value: 'return', label: 'Devolución de Cliente' },
    { value: 'adjustment', label: 'Ajuste de Inventario' },
    { value: 'transfer', label: 'Transferencia de Sucursal' }
  ];

  const exitTypes = [
    { value: 'sale', label: 'Venta' },
    { value: 'return', label: 'Devolución a Proveedor' },
    { value: 'adjustment', label: 'Ajuste de Inventario' },
    { value: 'damage', label: 'Producto Dañado/Caducado' },
    { value: 'transfer', label: 'Transferencia a Sucursal' }
  ];

  // Ubicaciones disponibles
  const locations = [
    'Almacén Principal',
    'Estantería A1',
    'Estantería B2',
    'Bodega 3'
  ];

  // Referencias de órdenes
  const orderReferences = [
    { id: 'ORD-2025-0042', name: 'ORD-2025-0042 - TechWorld' },
    { id: 'ORD-2025-0043', name: 'ORD-2025-0043 - ElectroTech Inc.' },
    { id: 'none', name: 'Sin referencia' }
  ];

  // Estado del formulario
  const [formData, setFormData] = useState({
    entryType: isEntry ? 'purchase' : 'sale',
    reference: 'none',
    products: [{ productId: '', quantity: 1, location: 'Almacén Principal' }],
    notes: ''
  });

  // Manejar cambios en campos principales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en los productos
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  // Agregar una nueva línea de producto
  const handleAddProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [
        ...prev.products,
        { productId: '', quantity: 1, location: 'Almacén Principal' }
      ]
    }));
  };

  // Eliminar una línea de producto
  const handleRemoveProduct = (index) => {
    if (formData.products.length > 1) {
      const updatedProducts = [...formData.products];
      updatedProducts.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        products: updatedProducts
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    // Aquí iría la validación
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEntry ? "Entrada de Stock" : "Salida de Stock"}
      size="lg"
      footer={
        <>
          <Button 
            variant="secondary" 
            outline={true}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button 
            variant={isEntry ? "success" : "danger"}
            onClick={handleSubmit}
          >
            {isEntry ? "Registrar Entrada" : "Registrar Salida"}
          </Button>
        </>
      }
    >
      <div className="mb-4">
        <label htmlFor="entryType" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de {isEntry ? "Entrada" : "Salida"}
        </label>
        <select 
          id="entryType" 
          name="entryType"
          className="w-full border rounded-md px-3 py-2"
          value={formData.entryType}
          onChange={handleChange}
        >
          {(isEntry ? entryTypes : exitTypes).map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Campo de referencia (solo mostrar para ciertos tipos) */}
      {formData.entryType === 'purchase' || formData.entryType === 'return' ? (
        <div className="mb-4">
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">
            Referencia {formData.entryType === 'purchase' ? '(Orden de Compra)' : '(Devolución)'}
          </label>
          <select 
            id="reference" 
            name="reference"
            className="w-full border rounded-md px-3 py-2"
            value={formData.reference}
            onChange={handleChange}
          >
            {orderReferences.map((ref) => (
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            ))}
          </select>
        </div>
      ) : null}

      {/* Sección de productos */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">Productos</h4>
        </div>
        
        {formData.products.map((product, index) => (
          <div key={index} className="border rounded-md p-4 mb-2">
            <div className="flex justify-between mb-2">
              <h5 className="text-xs font-medium text-gray-500">Producto #{index + 1}</h5>
              {formData.products.length > 1 && (
                <button 
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveProduct(index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Producto</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={product.productId}
                  onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                >
                  <option value="">Seleccionar producto</option>
                  {sampleProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cantidad</label>
                <input 
                  type="number" 
                  className="w-full border rounded-md px-3 py-2 text-sm" 
                  placeholder="0" 
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                  min="1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ubicación</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={product.location}
                  onChange={(e) => handleProductChange(index, 'location', e.target.value)}
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          onClick={handleAddProduct}
        >
          <Plus size={16} className="mr-1" /> Añadir otro producto
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
        <textarea 
          id="notes" 
          name="notes"
          rows="2" 
          className="w-full border rounded-md px-3 py-2" 
          placeholder="Información adicional..."
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </div>
    </Modal>
  );
};

export default StockEntry;