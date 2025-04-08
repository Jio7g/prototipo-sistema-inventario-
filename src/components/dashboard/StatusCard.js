import React from 'react';

/**
 * Componente para tarjetas de estado en el dashboard
 * 
 * @param {String} title - Título de la tarjeta
 * @param {String|Number} value - Valor principal a mostrar
 * @param {String} subtitle - Texto secundario bajo el valor
 * @param {Component} icon - Componente de icono de Lucide
 * @param {String} iconColor - Color del icono (ej: 'blue', 'green', 'yellow', etc.)
 */
const StatusCard = ({ title, value, subtitle, icon: Icon, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        {Icon && <Icon className={`text-${iconColor}-500`} />}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default StatusCard;