'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, Download, Eye, Edit, Package, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { OrdenCompra } from '@/lib/types'
import { MainLayout } from '@/components/layout/main-layout'

// Extendemos la interfaz para incluir campos adicionales necesarios para la UI
interface OrdenCompraExtendida extends Omit<OrdenCompra, 'fecha' | 'fechaEntrega' | 'numeroOrden' | 'productos'> {
  empresaNombre: string;
  fechaCreacion: Date;
  fechaEntregaEstimada: Date;
  productos: Array<{
    skuId: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
  }>;
}

const ordenesEjemplo: OrdenCompraExtendida[] = [
  {
    id: 'OC-2024-001',
    empresaId: 'emp-001',
    empresaNombre: 'Supermercados Central',
    fechaCreacion: new Date('2024-01-15'),
    fechaEntregaEstimada: new Date('2024-01-25'),
    estado: 'pendiente',
    total: 2450000,
    productos: [
      { skuId: 'SKU-001', nombre: 'Detergente Premium 1L', cantidad: 100, precioUnitario: 12500 },
      { skuId: 'SKU-002', nombre: 'Shampoo Nutritivo 500ml', cantidad: 80, precioUnitario: 15625 }
    ],
    notas: 'Entrega urgente para promoción de fin de mes'
  },
  {
    id: 'OC-2024-002',
    empresaId: 'emp-002',
    empresaNombre: 'Retail Express',
    fechaCreacion: new Date('2024-01-12'),
    fechaEntregaEstimada: new Date('2024-01-20'),
    estado: 'procesando',
    total: 1875000,
    productos: [
      { skuId: 'SKU-003', nombre: 'Acondicionador Reparador 400ml', cantidad: 75, precioUnitario: 18000 },
      { skuId: 'SKU-004', nombre: 'Jabón Antibacterial 250ml', cantidad: 60, precioUnitario: 12500 }
    ],
    notas: 'Cliente preferencial - descuento aplicado'
  },
  {
    id: 'OC-2024-003',
    empresaId: 'emp-003',
    empresaNombre: 'Distribuidora Norte',
    fechaCreacion: new Date('2024-01-10'),
    fechaEntregaEstimada: new Date('2024-01-18'),
    estado: 'entregado',
    total: 3200000,
    productos: [
      { skuId: 'SKU-001', nombre: 'Detergente Premium 1L', cantidad: 150, precioUnitario: 12500 },
      { skuId: 'SKU-005', nombre: 'Suavizante Floral 2L', cantidad: 85, precioUnitario: 14700 }
    ],
    notas: 'Entrega completada sin observaciones'
  },
  {
    id: 'OC-2024-004',
    empresaId: 'emp-004',
    empresaNombre: 'MegaStore',
    fechaCreacion: new Date('2024-01-08'),
    fechaEntregaEstimada: new Date('2024-01-16'),
    estado: 'cancelado',
    total: 980000,
    productos: [
      { skuId: 'SKU-002', nombre: 'Shampoo Nutritivo 500ml', cantidad: 40, precioUnitario: 15625 },
      { skuId: 'SKU-006', nombre: 'Crema Corporal 300ml', cantidad: 25, precioUnitario: 13600 }
    ],
    notas: 'Cancelada por cambio en estrategia de inventario'
  },
  {
    id: 'OC-2024-005',
    empresaId: 'emp-005',
    empresaNombre: 'Farmacias Salud',
    fechaCreacion: new Date('2024-01-14'),
    fechaEntregaEstimada: new Date('2024-01-22'),
    estado: 'pendiente',
    total: 1650000,
    productos: [
      { skuId: 'SKU-007', nombre: 'Gel Antibacterial 500ml', cantidad: 90, precioUnitario: 11000 },
      { skuId: 'SKU-008', nombre: 'Mascarilla Facial 50ml', cantidad: 35, precioUnitario: 22000 }
    ],
    notas: 'Orden para nueva sucursal'
  }
]

const getEstadoBadge = (estado: string) => {
  const estilos = {
    pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    procesando: 'bg-blue-100 text-blue-800 border-blue-200',
    entregado: 'bg-green-100 text-green-800 border-green-200',
    cancelado: 'bg-red-100 text-red-800 border-red-200'
  }
  
  return estilos[estado as keyof typeof estilos] || 'bg-gray-100 text-gray-800'
}

const formatearMoneda = (valor: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(valor)
}

const formatearFecha = (fecha: Date) => {
  return fecha.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export default function OrdenesPage() {
  const [ordenes] = useState<OrdenCompraExtendida[]>(ordenesEjemplo)
  const [filtroTexto, setFiltroTexto] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')

  const ordenesFiltradas = ordenes.filter(orden => {
    const coincideTexto = orden.empresaNombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                         orden.id.toLowerCase().includes(filtroTexto.toLowerCase())
    const coincideEstado = filtroEstado === 'todos' || orden.estado === filtroEstado
    
    return coincideTexto && coincideEstado
  })

  // Estadísticas
  const totalOrdenes = ordenes.length
  const ordenesPendientes = ordenes.filter(o => o.estado === 'pendiente').length
  const ordenesEntregadas = ordenes.filter(o => o.estado === 'entregado').length
  const montoTotal = ordenes.reduce((sum, orden) => sum + orden.total, 0)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Órdenes de Compra
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona y monitorea todas las órdenes de compra
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Package className="w-4 h-4 mr-2" />
            Nueva Orden
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Órdenes
              </CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalOrdenes}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pendientes
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{ordenesPendientes}</div>
              <p className="text-xs text-gray-600 mt-1">
                Requieren atención
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Entregadas
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{ordenesEntregadas}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Monto Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatearMoneda(montoTotal)}
              </div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% vs mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
            <CardDescription>
              Filtra las órdenes por empresa, estado o ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por empresa o ID de orden..."
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="procesando">Procesando</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Más Filtros
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Órdenes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Órdenes de Compra ({ordenesFiltradas.length})
            </CardTitle>
            <CardDescription>
              Lista completa de órdenes de compra registradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Orden</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Fecha Creación</TableHead>
                    <TableHead>Fecha Entrega</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenesFiltradas.map((orden) => (
                    <TableRow key={orden.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{orden.id}</TableCell>
                      <TableCell>{orden.empresaNombre}</TableCell>
                      <TableCell>{formatearFecha(orden.fechaCreacion)}</TableCell>
                      <TableCell>{formatearFecha(orden.fechaEntregaEstimada)}</TableCell>
                      <TableCell>
                        <Badge className={getEstadoBadge(orden.estado)}>
                          {orden.estado.charAt(0).toUpperCase() + orden.estado.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {orden.productos.length} producto{orden.productos.length !== 1 ? 's' : ''}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatearMoneda(orden.total)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
} 