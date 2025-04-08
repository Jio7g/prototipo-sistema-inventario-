import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Table from '../common/Table';
import { categories, suppliers } from '../../data/products';

/**
 * Componente de lista de productos con filtrado y búsqueda
 * 
 * @param {Array} products - Lista de productos
 * @param {Function} onEdit - Función para editar un producto
 * @param {Function} onDelete - Función para eliminar un producto
 */
const ProductList = ({ products, onEdit, onDelete }) => {
  // Estado para filtros y búsqueda
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    supplier: ''
  });

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Aplicar filtros a los productos
  const filteredProducts = products.filter(product => {
    // Filtro de búsqueda (nombre, SKU o descripción)
    const searchMatch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.sku.toLowerCase().includes(filters.search.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(filters.search.toLowerCase()));
    
    // Filtro de categoría
    const categoryMatch = !filters.category || product.category === filters.category;
    
    // Filtro de proveedor
    const supplierMatch = !filters.supplier || product.supplier === filters.supplier;
    
    return searchMatch && categoryMatch && supplierMatch;
  });

  // Definición de columnas para la tabla
  const columns = [
    {
      header: 'SKU',
      accessor: 'sku',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.sku}</span>
      )
    },
    {
      header: 'Producto',
      accessor: 'name',
      render: (row) => (
        <div className="text-sm font-medium text-gray-900">{row.name}</div>
      )
    },
    {
      header: 'Categoría',
      accessor: 'category',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.category}</span>
      )
    },
    {
      header: 'Stock',
      accessor: 'quantity',
      render: (row) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          row.quantity < row.minStock
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {row.quantity}
        </span>
      )
    },
    {
      header: 'Precio',
      accessor: 'price',
      render: (row) => (
        <span className="text-sm text-gray-500">${row.price.toFixed(2)}</span>
      )
    },
    {
      header: 'Proveedor',
      accessor: 'supplier',
      render: (row) => (
        <span className="text-sm text-gray-500">{row.supplier}</span>
      )
    },
    {
      header: 'Acciones',
      accessor: 'id',
      render: (row) => (
        <div>
          <button 
            className="text-blue-600 hover:text-blue-800 mr-3"
            onClick={() => onEdit(row)}
          >
            Editar
          </button>
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => onDelete(row)}
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-white rounded-t-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex gap-4">
          <select 
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <select 
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="supplier"
            value={filters.supplier}
            onChange={handleFilterChange}
          >
            <option value="">Todos los proveedores</option>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredProducts} 
        emptyMessage="No se encontraron productos que coincidan con los criterios de búsqueda"
      />
      
      <div className="px-4 py-3 bg-gray-50 flex items-center justify-between rounded-b-lg">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{filteredProducts.length}</span> de <span className="font-medium">{products.length}</span> productos
        </div>
        {/* Aquí se podría agregar la paginación en el futuro */}
      </div>
    </div>
  );
};

export default ProductList;