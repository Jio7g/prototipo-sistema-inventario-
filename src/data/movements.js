// Datos de muestra para movimientos de inventario
export const recentMovements = [
    { id: 1, product: 'Laptop Pro X', type: 'Entrada', quantity: 15, date: '2025-04-05', user: 'Juan Pérez' },
    { id: 2, product: 'Smartphone Galaxy', type: 'Salida', quantity: 8, date: '2025-04-06', user: 'María López' },
    { id: 3, product: 'Auriculares Inalámbricos', type: 'Salida', quantity: 5, date: '2025-04-07', user: 'Carlos Gómez' },
    { id: 4, product: 'Tablet Air', type: 'Entrada', quantity: 20, date: '2025-04-08', user: 'Juan Pérez' },
  ];
  
  // Datos para pendientes de recepción
  export const pendingOrders = [
    { 
      id: "ORD-2025-0042", 
      supplier: "TechWorld", 
      orderDate: "2025-04-01", 
      expectedDate: "2025-04-10", 
      status: "En tránsito" 
    },
    { 
      id: "ORD-2025-0043", 
      supplier: "ElectroTech Inc.", 
      orderDate: "2025-04-03", 
      expectedDate: "2025-04-12", 
      status: "Confirmada" 
    }
  ];
  
  // Datos para reportes recientes
  export const recentReports = [
    {
      id: 1,
      name: "Inventario_Actual_20250408",
      generated: "2025-04-08 09:12",
      type: "Inventario Actual",
      format: "Excel",
      user: "Gerente Productos"
    },
    {
      id: 2,
      name: "Productos_BajoStock_20250407",
      generated: "2025-04-07 16:45",
      type: "Productos Bajo Stock",
      format: "PDF",
      user: "Gerente Productos"
    },
    {
      id: 3,
      name: "Movimientos_Marzo2025",
      generated: "2025-04-01 10:32",
      type: "Movimientos por Período",
      format: "Excel",
      user: "Juan Pérez"
    }
  ];
  
  // Datos para registros de actividad
  export const activityLogs = [
    {
      id: 1,
      datetime: "2025-04-08 09:15:42",
      user: "admin",
      action: "Inicio de sesión",
      detail: "Acceso exitoso",
      ip: "192.168.1.100"
    },
    {
      id: 2,
      datetime: "2025-04-08 09:10:15",
      user: "gerenteop",
      action: "Generación de reporte",
      detail: "Reporte de inventario actual",
      ip: "192.168.1.105"
    },
    {
      id: 3,
      datetime: "2025-04-08 08:52:30",
      user: "almacen1",
      action: "Entrada de stock",
      detail: "Tablet Air - 20 unidades",
      ip: "192.168.1.120"
    },
    {
      id: 4,
      datetime: "2025-04-08 08:45:12",
      user: "gerenteop",
      action: "Inicio de sesión",
      detail: "Acceso exitoso",
      ip: "192.168.1.105"
    },
    {
      id: 5,
      datetime: "2025-04-08 08:30:05",
      user: "admin",
      action: "Modificación de usuario",
      detail: "Usuario: ventas1 - Cambio estado a inactivo",
      ip: "192.168.1.100"
    }
  ];