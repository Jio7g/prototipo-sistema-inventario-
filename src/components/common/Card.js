import React from 'react';

/**
 * Componente Card reutilizable
 * 
 * @param {String} title - Título opcional de la tarjeta
 * @param {React.ReactNode} children - Contenido de la tarjeta
 * @param {React.ReactNode} actions - Acciones opcionales (botones, enlaces)
 * @param {String} className - Clases CSS adicionales
 */
const Card = ({ title, children, actions, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-semibold">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;