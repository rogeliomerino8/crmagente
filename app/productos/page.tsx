'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Search, Filter, Download, Eye, Edit, Package, TrendingUp, AlertTriangle, CheckCircle, Plus, Heart, Star } from 'lucide-react'
import { SKU } from '@/lib/types'
import { MainLayout } from '@/components/layout/main-layout'

const productosEjemplo: SKU[] = [
  // ROYAL SHAVE - Productos de Afeitado
  {
    id: 'SKU-001',
    codigo: '7503014279002',
    descripcion: 'ESPUMA PARA RASURAR PIEL SENSIBLE 200ml',
    categoria: 'Cuidado Personal',
    precio: 5300,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 156,
    imagen: '/productos/espuma-rasurar.jpg'
  },
  {
    id: 'SKU-002',
    codigo: '7502275700294',
    descripcion: 'ESPUMA PARA RASURAR MENTOLADA 200ml',
    categoria: 'Cuidado Personal',
    precio: 5300,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 89,
    imagen: '/productos/espuma-mentolada.jpg'
  },
  {
    id: 'SKU-003',
    codigo: '7503014279118',
    descripcion: 'RASTRILLOS DESECH. 2 NAVAJAS EXHIBIDOR MEN 12 par',
    categoria: 'Cuidado Personal',
    precio: 12000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 67,
    imagen: '/productos/rastrillos-2-navajas.jpg'
  },
  {
    id: 'SKU-004',
    codigo: '7503014279033',
    descripcion: 'RASTRILLOS DESECH. 2 NAVAJAS BOLSA MEN 5 pz',
    categoria: 'Cuidado Personal',
    precio: 2080,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 203,
    imagen: '/productos/rastrillos-bolsa.jpg'
  },
  {
    id: 'SKU-005',
    codigo: '7502275701758',
    descripcion: 'RASTRILLOS DESECH. 3 NAVAJAS BOLSA MEN 1 pz',
    categoria: 'Cuidado Personal',
    precio: 1500,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 45,
    imagen: '/productos/rastrillos-3-navajas.jpg'
  },
  {
    id: 'SKU-006',
    codigo: '7502275700287',
    descripcion: 'RASTRILLOS DESECH. 4 NAVAJAS BOLSA MEN 1 pz',
    categoria: 'Cuidado Personal',
    precio: 3750,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 12,
    imagen: '/productos/rastrillos-4-navajas.jpg'
  },
  {
    id: 'SKU-007',
    codigo: '7503014279149',
    descripcion: 'RASTRILLOS DESECH. 2 NAVAJAS EXHIBIDOR WOMAN 12 par',
    categoria: 'Cuidado Personal',
    precio: 12000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 178,
    imagen: '/productos/rastrillos-woman.jpg'
  },
  
  // COTTONI - Productos de Algodón y Aplicadores
  {
    id: 'SKU-008',
    codigo: '7502275700423',
    descripcion: 'APLICADORES BOLSA 20 PZ BAMBÚ ALGODÓN BLANCO',
    categoria: 'Higiene',
    precio: 6600,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 95,
    imagen: '/productos/aplicadores-bambú.jpg'
  },
  {
    id: 'SKU-009',
    codigo: '7503014279750',
    descripcion: 'APLICADORES BOTE 50 PZ PALILLO BAMBÚ ALGODÓN BLANCO',
    categoria: 'Higiene',
    precio: 1650,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 234,
    imagen: '/productos/aplicadores-bote.jpg'
  },
  {
    id: 'SKU-010',
    codigo: '7503014279712',
    descripcion: 'APLICADORES BOTE 100 PZ PALILLO BAMBÚ ALGODÓN BLANCO',
    categoria: 'Higiene',
    precio: 1940,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 156,
    imagen: '/productos/aplicadores-100.jpg'
  },
  {
    id: 'SKU-011',
    codigo: '7502275701611',
    descripcion: 'APLICADORES BOLSA ZIPLOC 150 PZ BAMBÚ ALGODÓN BLANCO',
    categoria: 'Higiene',
    precio: 2000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 89,
    imagen: '/productos/aplicadores-ziploc.jpg'
  },
  {
    id: 'SKU-012',
    codigo: '7503014279736',
    descripcion: 'APLICADORES MAQUILLAR 80 PZ PAPEL NEGRO ALGODÓN ROSA',
    categoria: 'Belleza',
    precio: 3500,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 67,
    imagen: '/productos/aplicadores-maquillaje.jpg'
  },
  {
    id: 'SKU-013',
    codigo: '7503014279743',
    descripcion: 'APLICADORES SEGURIDAD BEBÉ 55 PZ BAMBÚ ALGODÓN BLANCO',
    categoria: 'Bebé',
    precio: 2810,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 123,
    imagen: '/productos/aplicadores-bebe.jpg'
  },
  {
    id: 'SKU-014',
    codigo: '7503014279699',
    descripcion: 'ALMOHADILLAS FACIALES ALGODÓN ROUNDED COLORS 100 PZ',
    categoria: 'Belleza',
    precio: 3750,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 78,
    imagen: '/productos/almohadillas-colors.jpg'
  },
  {
    id: 'SKU-015',
    codigo: '7502275702113',
    descripcion: 'ALMOHADILLAS FACIALES OVALADAS PREMIUM BLACK 80 PZ',
    categoria: 'Belleza',
    precio: 5200,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 45,
    imagen: '/productos/almohadillas-black.jpg'
  },
  
  // ALFA MEDICAL - Productos Médicos
  {
    id: 'SKU-016',
    codigo: '7502275700959',
    descripcion: 'BOTIQUÍN CHICO',
    categoria: 'Médico',
    precio: 7000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 34,
    imagen: '/productos/botiquin-chico.jpg'
  },
  {
    id: 'SKU-017',
    codigo: '7502275700966',
    descripcion: 'BOTIQUÍN MEDIANO',
    categoria: 'Médico',
    precio: 9000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 23,
    imagen: '/productos/botiquin-mediano.jpg'
  },
  {
    id: 'SKU-018',
    codigo: '7502275700973',
    descripcion: 'BOTIQUÍN GRANDE',
    categoria: 'Médico',
    precio: 16000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 12,
    imagen: '/productos/botiquin-grande.jpg'
  },
  {
    id: 'SKU-019',
    codigo: '7502275701222',
    descripcion: 'ALCOHOL ETÍLICO DESNATURALIZADO 70º G.L. 125ml',
    categoria: 'Médico',
    precio: 1360,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 267,
    imagen: '/productos/alcohol-125ml.jpg'
  },
  {
    id: 'SKU-020',
    codigo: '7503014279224',
    descripcion: 'ALCOHOL ETÍLICO DESNATURALIZADO 70º G.L. 250ml',
    categoria: 'Médico',
    precio: 2455,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 189,
    imagen: '/productos/alcohol-250ml.jpg'
  },
  {
    id: 'SKU-021',
    codigo: '7503014279231',
    descripcion: 'ALCOHOL ETÍLICO DESNATURALIZADO 70º G.L. 500ml',
    categoria: 'Médico',
    precio: 4225,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 145,
    imagen: '/productos/alcohol-500ml.jpg'
  },
  {
    id: 'SKU-022',
    codigo: '7502275701499',
    descripcion: 'ALCOHOL EN GEL A 70º GL 250ml',
    categoria: 'Médico',
    precio: 2915,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 98,
    imagen: '/productos/alcohol-gel.jpg'
  },
  {
    id: 'SKU-023',
    codigo: '7503014279361',
    descripcion: 'VENDA ELÁSTICA 5 CM X 5 MT',
    categoria: 'Médico',
    precio: 730,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 156,
    imagen: '/productos/venda-5cm.jpg'
  },
  {
    id: 'SKU-024',
    codigo: '7503014279378',
    descripcion: 'VENDA ELÁSTICA 10 CM X 5 MT',
    categoria: 'Médico',
    precio: 1190,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 89,
    imagen: '/productos/venda-10cm.jpg'
  },
  {
    id: 'SKU-025',
    codigo: '7503014279569',
    descripcion: 'GASA ABSORBENTE ESTERILIZADA 7.5 X 5 CM (12 CAPAS) 10 PZ',
    categoria: 'Médico',
    precio: 2200,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    stock: 67,
    imagen: '/productos/gasa-esteril.jpg'
  },
  {
    id: 'SKU-026',
    codigo: '7503014279408',
    descripcion: 'CINTA MICROPOROSA BLANCA 1.25 CM X 5 M',
    categoria: 'Médico',
    precio: 1555,
    estado: 'inactivo',
    fechaCreacion: '2024-01-01',
    stock: 23,
    imagen: '/productos/cinta-microporosa.jpg'
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

  const handleLimpiarFiltros = () => {
    setFiltroTexto('')
    setFiltroCategoria('todas')
    setFiltroEstado('todos')
  }

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

        {/* Catálogo de Productos - Vista de Cards */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Catálogo de Productos ({productosFiltrados.length})
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Package className="w-4 h-4 mr-2" />
                Vista Lista
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
                <Package className="w-4 h-4 mr-2" />
                Vista Cards
              </Button>
            </div>
          </div>

          {/* Grid de Cards de Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <Card key={producto.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl">
                <div className="relative overflow-hidden rounded-t-lg">
                  {/* Imagen del producto */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <Package className="w-16 h-16 text-gray-400" />
                    
                    {/* Badge de estado en la esquina superior derecha */}
                    <div className="absolute top-3 right-3">
                      <Badge className={getEstadoBadge(producto.estado)}>
                        {producto.estado.charAt(0).toUpperCase() + producto.estado.slice(1)}
                      </Badge>
                    </div>

                    {/* Badge de stock en la esquina superior izquierda */}
                    <div className="absolute top-3 left-3">
                      <Badge className={getStockBadge(producto.stock || 0)}>
                        {getStockTexto(producto.stock || 0)}
                      </Badge>
                    </div>

                    {/* Overlay con acciones al hacer hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Categoría */}
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mb-2">
                    {producto.categoria}
                  </Badge>

                  {/* Título del producto */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                    {producto.descripcion}
                  </h3>

                  {/* Código SKU */}
                  <p className="text-sm text-gray-500 mb-3 font-mono">
                    SKU: {producto.codigo}
                  </p>

                  {/* Precio y stock */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatearMoneda(producto.precio)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {producto.stock || 0} unidades
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Valor Total</p>
                      <p className="font-semibold text-gray-900">
                        {formatearMoneda(producto.precio * (producto.stock || 0))}
                      </p>
                    </div>
                  </div>

                  {/* Rating simulado */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                  </div>

                  {/* Botón de acción */}
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mensaje cuando no hay productos */}
          {productosFiltrados.length === 0 && (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500 mb-4">
                Intenta ajustar los filtros o buscar con otros términos
              </p>
              <Button variant="outline" onClick={handleLimpiarFiltros}>
                Limpiar Filtros
              </Button>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
} 