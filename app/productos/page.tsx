'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, Download, Eye, Edit, Package, TrendingUp, AlertTriangle, CheckCircle, Plus } from 'lucide-react'
import { SKU } from '@/lib/types'
import { MainLayout } from '@/components/layout/main-layout'

const productosEjemplo: SKU[] = [
  {
    id: 'SKU-001',
    codigo: 'DET-PREM-1L',
    descripcion: 'Detergente Premium Concentrado 1L',
    categoria: 'Limpieza',
    precio: 12500,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 150,
    imagen: '/productos/detergente-premium.jpg'
  },
  {
    id: 'SKU-002',
    codigo: 'SHP-NUT-500ML',
    descripcion: 'Shampoo Nutritivo con Keratina 500ml',
    categoria: 'Cuidado Personal',
    precio: 15625,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 89,
    imagen: '/productos/shampoo-nutritivo.jpg'
  },
  {
    id: 'SKU-003',
    codigo: 'ACO-REP-400ML',
    descripcion: 'Acondicionador Reparador Intensivo 400ml',
    categoria: 'Cuidado Personal',
    precio: 18000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 67,
    imagen: '/productos/acondicionador-reparador.jpg'
  },
  {
    id: 'SKU-004',
    codigo: 'JAB-ANT-250ML',
    descripcion: 'Jabón Antibacterial Líquido 250ml',
    categoria: 'Higiene',
    precio: 12500,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 203,
    imagen: '/productos/jabon-antibacterial.jpg'
  },
  {
    id: 'SKU-005',
    codigo: 'SUA-FLO-2L',
    descripcion: 'Suavizante Floral Concentrado 2L',
    categoria: 'Limpieza',
    precio: 14700,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 45,
    imagen: '/productos/suavizante-floral.jpg'
  },
  {
    id: 'SKU-006',
    codigo: 'CRE-COR-300ML',
    descripcion: 'Crema Corporal Hidratante 300ml',
    categoria: 'Cuidado Personal',
    precio: 13600,
    estado: 'inactivo',
    fechaCreacion: '2024-01-01',
    stock: 12,
    imagen: '/productos/crema-corporal.jpg'
  },
  {
    id: 'SKU-007',
    codigo: 'GEL-ANT-500ML',
    descripcion: 'Gel Antibacterial con Aloe Vera 500ml',
    categoria: 'Higiene',
    precio: 11000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 178,
    imagen: '/productos/gel-antibacterial.jpg'
  },
  {
    id: 'SKU-008',
    codigo: 'MAS-FAC-50ML',
    descripcion: 'Mascarilla Facial Purificante 50ml',
    categoria: 'Cuidado Personal',
    precio: 22000,
    estado: 'descontinuado',
    fechaCreacion: '2024-01-01',
    stock: 0,
    imagen: '/productos/mascarilla-facial.jpg'
  },
  {
    id: 'SKU-009',
    codigo: 'DES-AMB-400ML',
    descripcion: 'Desinfectante Ambiental Citrus 400ml',
    categoria: 'Limpieza',
    precio: 9800,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 95,
    imagen: '/productos/desinfectante-ambiental.jpg'
  },
  {
    id: 'SKU-010',
    codigo: 'LOC-COR-250ML',
    descripcion: 'Loción Corporal Nutritiva 250ml',
    categoria: 'Cuidado Personal',
    precio: 16500,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 34,
    imagen: '/productos/locion-corporal.jpg'
  }
]

const getEstadoBadge = (estado: string) => {
  const estilos = {
    activo: 'bg-green-100 text-green-800 border-green-200',
    inactivo: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    descontinuado: 'bg-red-100 text-red-800 border-red-200'
  }
  
  return estilos[estado as keyof typeof estilos] || 'bg-gray-100 text-gray-800'
}

const getStockBadge = (stock: number) => {
  if (stock === 0) return 'bg-red-100 text-red-800 border-red-200'
  if (stock < 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-green-100 text-green-800 border-green-200'
}

const getStockTexto = (stock: number) => {
  if (stock === 0) return 'Sin stock'
  if (stock < 50) return 'Stock bajo'
  return 'Stock normal'
}

const formatearMoneda = (valor: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(valor)
}

export default function ProductosPage() {
  const [productos] = useState<SKU[]>(productosEjemplo)
  const [filtroTexto, setFiltroTexto] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')

  const productosFiltrados = productos.filter(producto => {
    const coincideTexto = producto.descripcion.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                         producto.codigo.toLowerCase().includes(filtroTexto.toLowerCase())
    const coincideCategoria = filtroCategoria === 'todas' || producto.categoria === filtroCategoria
    const coincideEstado = filtroEstado === 'todos' || producto.estado === filtroEstado
    
    return coincideTexto && coincideCategoria && coincideEstado
  })

  // Estadísticas
  const totalProductos = productos.length
  const productosActivos = productos.filter(p => p.estado === 'activo').length
  const productosStockBajo = productos.filter(p => p.stock !== undefined && p.stock < 50 && p.stock > 0).length
  const productosSinStock = productos.filter(p => p.stock === 0).length
  const valorInventario = productos.reduce((sum, producto) => {
    return sum + (producto.precio * (producto.stock || 0))
  }, 0)

  // Categorías únicas
  const categorias = [...new Set(productos.map(p => p.categoria))]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Catálogo de Productos
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona el inventario y catálogo de productos SKU
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Productos
              </CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalProductos}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Activos
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{productosActivos}</div>
              <p className="text-xs text-gray-600 mt-1">
                Disponibles para venta
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Stock Bajo
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{productosStockBajo}</div>
              <p className="text-xs text-yellow-600 mt-1">
                Requieren reposición
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Sin Stock
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{productosSinStock}</div>
              <p className="text-xs text-red-600 mt-1">
                Agotados
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Valor Inventario
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatearMoneda(valorInventario)}
              </div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
            <CardDescription>
              Filtra productos por descripción, código, categoría o estado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por descripción o código..."
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="descontinuado">Descontinuado</SelectItem>
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

        {/* Tabla de Productos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Productos ({productosFiltrados.length})
            </CardTitle>
            <CardDescription>
              Catálogo completo de productos y SKUs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código SKU</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productosFiltrados.map((producto) => (
                    <TableRow key={producto.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{producto.codigo}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-gray-900">{producto.descripcion}</p>
                          <p className="text-sm text-gray-500">ID: {producto.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {producto.categoria}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatearMoneda(producto.precio)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{producto.stock || 0} unidades</span>
                          <Badge className={getStockBadge(producto.stock || 0)}>
                            {getStockTexto(producto.stock || 0)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEstadoBadge(producto.estado)}>
                          {producto.estado.charAt(0).toUpperCase() + producto.estado.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatearMoneda(producto.precio * (producto.stock || 0))}
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