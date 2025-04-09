import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

/**
 * Componente de página de inicio de sesión
 */
const Login = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  
  // Estado para mensajes de error
  const [error, setError] = useState('');
  
  // Estado para indicar que se está procesando el inicio de sesión
  const [isLoading, setIsLoading] = useState(false);
  
  // Obtener la función de inicio de sesión del contexto
  const { login } = useAuth();

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores al modificar campos
    if (error) {
      setError('');
    }
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Por favor, ingrese nombre de usuario y contraseña.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Intentar iniciar sesión
      const result = await login(formData.username, formData.password);
      
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intente de nuevo.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Encabezado */}
          <div className="bg-blue-600 px-6 py-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">XYZ Inventario</h1>
            <p className="text-blue-100">Sistema de Gestión de Inventarios</p>
          </div>
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              Iniciar Sesión
            </h2>
            
            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex items-center">
                  <AlertCircle className="text-red-500 mr-2" size={20} />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}
            
            {/* Campo de usuario */}
            <div className="mb-6">
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre de Usuario
              </label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su nombre de usuario"
                disabled={isLoading}
                autoComplete="username"
              />
            </div>
            
            {/* Campo de contraseña */}
            <div className="mb-6">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese su contraseña"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {/* Botón de inicio de sesión */}
            <Button 
              variant="primary" 
              size="lg"
              className="w-full mt-6"
              icon={<LogIn size={20} />}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
            
            {/* Ayuda y enlaces */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                ¿Olvidó su contraseña? Contacte al administrador del sistema.
              </p>
            </div>
          </form>
          
          {/* Pie de página */}
          <div className="px-6 py-4 bg-gray-50 text-center text-xs text-gray-500">
            <p>© 2025 Empresa XYZ. Todos los derechos reservados.</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
        
        {/* Información de prueba */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="font-medium text-yellow-800 mb-2">Credenciales de prueba:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li><strong>Administrador:</strong> admin / admin123</li>
            <li><strong>Gerente:</strong> gerente / gerente123</li>
            <li><strong>Almacén:</strong> almacen / almacen123</li>
            <li><strong>Ventas:</strong> ventas / ventas123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;