import React from 'react';

/**
 * Componente Modal reutilizable
 * 
 * @param {Boolean} isOpen - Controla si el modal está abierto
 * @param {Function} onClose - Función para cerrar el modal
 * @param {String} title - Título del modal
 * @param {React.ReactNode} children - Contenido del modal
 * @param {React.ReactNode} footer - Botones o acciones de pie de modal
 * @param {String} size - Tamaño del modal: 'sm', 'md', 'lg', 'xl'
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md'
}) => {
  if (!isOpen) return null;

  // Mapeo de tamaños
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg w-full ${sizeClasses[size]} p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="mb-4">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;