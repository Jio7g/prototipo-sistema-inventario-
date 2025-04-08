import React from 'react';

/**
 * Componente Button reutilizable
 * 
 * @param {String} variant - 'primary', 'secondary', 'success', 'danger', 'warning', 'info'
 * @param {String} size - 'sm', 'md', 'lg'
 * @param {Boolean} outline - Si es true, muestra solo el borde sin relleno
 * @param {React.ReactNode} children - Contenido del botón
 * @param {React.ReactNode} icon - Icono opcional para mostrar antes del texto
 * @param {Object} props - Resto de propiedades para el botón (onClick, type, etc)
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  outline = false,
  children, 
  icon,
  ...props 
}) => {
  // Mapeo de variantes a colores
  const variantClasses = {
    primary: outline 
      ? 'border border-blue-600 text-blue-600 hover:bg-blue-50' 
      : 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: outline 
      ? 'border border-gray-600 text-gray-600 hover:bg-gray-50' 
      : 'bg-gray-600 text-white hover:bg-gray-700',
    success: outline 
      ? 'border border-green-600 text-green-600 hover:bg-green-50' 
      : 'bg-green-600 text-white hover:bg-green-700',
    danger: outline 
      ? 'border border-red-600 text-red-600 hover:bg-red-50' 
      : 'bg-red-600 text-white hover:bg-red-700',
    warning: outline 
      ? 'border border-yellow-600 text-yellow-600 hover:bg-yellow-50' 
      : 'bg-yellow-600 text-white hover:bg-yellow-700',
    info: outline 
      ? 'border border-blue-400 text-blue-400 hover:bg-blue-50' 
      : 'bg-blue-400 text-white hover:bg-blue-500',
  };
  
  // Mapeo de tamaños
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`rounded-md ${variantClasses[variant]} ${sizeClasses[size]} flex items-center transition-colors duration-200`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;