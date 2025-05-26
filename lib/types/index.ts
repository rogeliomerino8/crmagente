export interface Empresa {
  id: string;
  nombre: string;
  contacto: string;
  email: string;
  telefono: string;
  industria: string;
  status: 'activo' | 'inactivo' | 'prospecto';
  fechaCreacion: string;
  direccion?: string;
  notas?: string;
}

export interface Venta {
  id: string;
  empresaId: string;
  skuId: string;
  fecha: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
  canal: 'online' | 'tienda' | 'mayorista' | 'distribuidor';
  mes: number;
  año: number;
}

export interface OrdenCompra {
  id: string;
  numeroOrden: string;
  empresaId: string;
  fecha: string;
  fechaEntrega?: string;
  estado: 'pendiente' | 'procesando' | 'entregado' | 'cancelado';
  total: number;
  productos: ProductoOrden[];
  notas?: string;
}

export interface ProductoOrden {
  skuId: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface SKU {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: string;
  precio: number;
  estado: 'activo' | 'inactivo' | 'descontinuado';
  fechaCreacion: string;
  stock?: number;
  imagen?: string;
}

export interface Politica {
  id: string;
  titulo: string;
  categoria: 'operaciones' | 'pagos' | 'logistica' | 'calidad' | 'general';
  archivo: string;
  tipoArchivo: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png';
  fechaSubida: string;
  empresaId?: string;
  descripcion?: string;
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  rol: 'admin' | 'account_manager' | 'viewer';
  avatar?: string;
}

export interface FiltroVentas {
  fechaInicio?: string;
  fechaFin?: string;
  empresaId?: string;
  canal?: string;
  categoria?: string;
}

export interface FiltroOrdenes {
  fechaInicio?: string;
  fechaFin?: string;
  empresaId?: string;
  estado?: string;
}

export interface EstadisticasEmpresa {
  totalVentas: number;
  ventasUltimoMes: number;
  ordenesActivas: number;
  productosComprados: number;
  crecimientoMensual: number;
} 