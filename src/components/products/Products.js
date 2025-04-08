import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { sampleProducts } from '../../data/products';

/**
 * Componente principal para la gestión de productos
 */
const Products = () => {
  // Estado para controlar modal de nuevo/editar producto
  const [productModalOpen, setProductModalOpen] = useState(false);
  
  // Estado para el producto que se está editando actualmente
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Estado para la lista de productos (en una app real, esto vendría de una API)
  const [products, setProducts] = useState(sampleProducts);
  
  // Estado para el modal de confirmación de eliminación
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Abrir modal para nuevo producto
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setProductModalOpen(true);
  };

  // Abrir modal para editar producto
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setProductModalOpen(true);
  };

  // Abrir modal de confirmación para eliminar producto
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteConfirmOpen(true);
  };

  // Eliminar producto
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(current => 
        current.filter(p => p.id !== productToDelete.id)
      );
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  // Guardar producto (nuevo o editado)
  const handleSaveProduct = (productData) => {
    if (currentProduct) {
      // Actualizar producto existente
      setProducts(current => 
        current.map(p => p.id === currentProduct.id ? { ...p, ...productData } : p)
      );
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...productData,
        id: Math.max(0, ...products.map(p => p.id)) + 1, // Generar ID único
      };
      setProducts(current => [...current, newProduct]);
    }
  };

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
          onClick={handleAddProduct}
        >
          Nuevo Producto
        </Button>
      </div>

      <Card>
        <ProductList 
          products={products} 
          onEdit={handleEditProduct} 
          onDelete={handleDeleteClick} 
        />
      </Card>

      {/* Modal de nuevo/editar producto */}
      <ProductForm 
        product={currentProduct}
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* Modal de confirmación de eliminación */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p className="text-gray-700 mb-6">
              ¿Está seguro que desea eliminar el producto "{productToDelete?.name}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="secondary" 
                outline={true}
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="danger"
                onClick={confirmDelete}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;