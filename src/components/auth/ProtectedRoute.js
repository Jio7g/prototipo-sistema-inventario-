import React from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente para proteger rutas que requieren autenticación
 * Si el usuario no está autenticado, muestra el componente de inicio de sesión
 * 
 * @param {React.ReactNode} children - Componentes hijos a renderizar si el usuario está autenticado
 * @param {React.ReactNode} loginComponent - Componente de inicio de sesión a mostrar si el usuario no está autenticado
 */
const ProtectedRoute = ({ children, loginComponent }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se verifica la autenticación, mostrar un indicador de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si el usuario no está autenticado, mostrar el componente de inicio de sesión
  if (!isAuthenticated()) {
    return loginComponent;
  }

  // Si el usuario está autenticado, mostrar los componentes hijos
  return children;
};

export default ProtectedRoute;