import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { categories, suppliers } from '../../data/products';

/**
 * Componente para formulario de creación/edición de productos
 * 
 * @param {Object} product - Datos del producto para edición (null para creación)
 * @param {Boolean} isOpen - Controla si el modal está abierto
 * @param {Function} onClose - Función para cerrar el modal
 * @param {Function} onSave - Función para guardar el producto
 */
const ProductForm = ({ product = null, isOpen, onClose, onSave }) => {
  // Estado inicial del formulario
  const initialFormState = {
    sku: '',
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    cost: 0,
    minStock: 0,
    supplier: '',
    description: ''
  };

  // Estado del formulario
  const [formData, setFormData] = useState(initialFormState);
  
  // Estado de validación
  const [errors, setErrors] = useState({});

  // Cargar datos del producto si estamos en modo edición
  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku || '',
        name: product.name || '',
        category: product.category || '',
        quantity: product.quantity || 0,
        price: product.price || 0,
        cost: product.cost || 0,
        minStock: product.minStock || 0,
        supplier: product.supplier || '',
        description: product.description || ''
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [product, isOpen]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
    
    // Limpiar error al modificar un campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.sku.trim()) newErrors.sku = 'SKU es obligatorio';
    if (!formData.name.trim()) newErrors.name = 'Nombre es obligatorio';
    if (!formData.category) newErrors.category = 'Categoría es obligatoria';
    if (formData.price <= 0) newErrors.price = 'Precio debe ser mayor a 0';
    if (formData.minStock < 0) newErrors.minStock = 'Stock mínimo no puede ser negativo';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Editar Producto' : 'Nuevo Producto'}
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
            variant="primary"
            onClick={handleSubmit}
          >
            {product ? 'Actualizar' : 'Guardar'} Producto
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input 
            type="text" 
            id="sku" 
            name="sku"
            className={`w-full border rounded-md px-3 py-2 ${errors.sku ? 'border-red-500' : ''}`}
            placeholder="Código único" 
            value={formData.sku}
            onChange={handleChange}
            disabled={!!product} // SKU no editable en modo edición
          />
          {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            className={`w-full border rounded-md px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Nombre" 
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select 
            id="category" 
            name="category"
            className={`w-full border rounded-md px-3 py-2 ${errors.category ? 'border-red-500' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity"
            className="w-full border rounded-md px-3 py-2" 
            placeholder="0"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio de Venta</label>
          <input 
            type="number" 
            id="price" 
            name="price"
            className={`w-full border rounded-md px-3 py-2 ${errors.price ? 'border-red-500' : ''}`}
            placeholder="0.00" 
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">Precio de Compra</label>
          <input 
            type="number" 
            id="cost" 
            name="cost"
            className="w-full border rounded-md px-3 py-2" 
            placeholder="0.00" 
            value={formData.cost}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="minStock" className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
          <input 
            type="number" 
            id="minStock" 
            name="minStock"
            className={`w-full border rounded-md px-3 py-2 ${errors.minStock ? 'border-red-500' : ''}`}
            placeholder="0" 
            value={formData.minStock}
            onChange={handleChange}
            min="0"
          />
          {errors.minStock && <p className="text-red-500 text-xs mt-1">{errors.minStock}</p>}
        </div>
        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
          <select 
            id="supplier" 
            name="supplier"
            className="w-full border rounded-md px-3 py-2"
            value={formData.supplier}
            onChange={handleChange}
          >
            <option value="">Seleccionar proveedor</option>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea 
          id="description" 
          name="description"
          rows="3" 
          className="w-full border rounded-md px-3 py-2" 
          placeholder="Descripción del producto"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
    </Modal>
  );
};

export default ProductForm;