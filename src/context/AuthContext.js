import { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext(null);

/**
 * Proveedor del contexto de autenticación
 * Gestiona el estado de autenticación y proporciona funciones para iniciar/cerrar sesión
 */
export const AuthProvider = ({ children }) => {
  // Estado de usuario autenticado
  const [user, setUser] = useState(null);
  // Estado para controlar si está cargando la autenticación
  const [loading, setLoading] = useState(true);

  // Comprobar si el usuario ya está autenticado (al cargar la página)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        // Si hay error al parsear, limpiamos el localStorage
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Iniciar sesión
  const login = (username, password) => {
    // Simulación de validación de credenciales
    // En una implementación real, esto sería una llamada a la API
    
    // Lista de usuarios de ejemplo
    const users = [
      { 
        username: 'admin', 
        password: 'admin123', 
        name: 'Administrador del Sistema',
        role: 'Administrador',
        avatar: 'AS'
      },
      { 
        username: 'gerente', 
        password: 'gerente123', 
        name: 'Gerente de Operaciones',
        role: 'Gerente',
        avatar: 'GO'
      },
      { 
        username: 'almacen', 
        password: 'almacen123', 
        name: 'Personal de Almacén',
        role: 'Operador',
        avatar: 'PA'
      },
      { 
        username: 'ventas', 
        password: 'ventas123', 
        name: 'Personal de Ventas',
        role: 'Consulta',
        avatar: 'PV'
      }
    ];

    // Buscar usuario
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      // Eliminar la contraseña antes de almacenar el usuario
      const { password, ...userWithoutPassword } = foundUser;
      
      // Almacenar usuario en el estado y localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // En una implementación real, aquí se almacenaría el token JWT
      localStorage.setItem('lastLogin', new Date().toISOString());
      
      return { success: true, user: userWithoutPassword };
    }

    return { 
      success: false, 
      error: 'Credenciales incorrectas. Por favor, intente de nuevo.' 
    };
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('lastLogin');
  };

  // Comprobar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Comprobar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!user;
  };

  // Proporcionar el contexto
  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;