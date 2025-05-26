'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, Download, Eye, Edit, FileText, Upload, TrendingUp, File, Users, Building } from 'lucide-react'
import { Politica } from '@/lib/types'
import { MainLayout } from '@/components/layout/main-layout'

const politicasEjemplo: Politica[] = [
  {
    id: 'POL-001',
    titulo: 'Política de Pagos y Facturación',
    categoria: 'pagos',
    archivo: 'politica-pagos-2024.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-15',
    descripcion: 'Términos y condiciones de pago, plazos de facturación y métodos de pago aceptados'
  },
  {
    id: 'POL-002',
    titulo: 'Procedimientos de Logística y Entrega',
    categoria: 'logistica',
    archivo: 'logistica-entregas.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-10',
    descripcion: 'Protocolos de entrega, horarios, zonas de cobertura y responsabilidades'
  },
  {
    id: 'POL-003',
    titulo: 'Estándares de Calidad de Productos',
    categoria: 'calidad',
    archivo: 'estandares-calidad.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-08',
    descripcion: 'Especificaciones técnicas, controles de calidad y certificaciones requeridas'
  },
  {
    id: 'POL-004',
    titulo: 'Manual de Operaciones Comerciales',
    categoria: 'operaciones',
    archivo: 'manual-operaciones.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-05',
    descripcion: 'Procedimientos operativos, flujos de trabajo y responsabilidades del equipo'
  },
  {
    id: 'POL-005',
    titulo: 'Política de Devoluciones y Cambios',
    categoria: 'operaciones',
    archivo: 'politica-devoluciones.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-12',
    descripcion: 'Condiciones para devoluciones, proceso de cambios y garantías'
  },
  {
    id: 'POL-006',
    titulo: 'Términos Comerciales Generales',
    categoria: 'general',
    archivo: 'terminos-generales.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-14',
    descripcion: 'Condiciones generales de venta, responsabilidades y limitaciones'
  },
  {
    id: 'POL-007',
    titulo: 'Política de Descuentos Especiales - Supermercados Central',
    categoria: 'pagos',
    archivo: 'descuentos-central.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-16',
    empresaId: 'emp-001',
    descripcion: 'Condiciones especiales de descuento para cliente preferencial'
  },
  {
    id: 'POL-008',
    titulo: 'Protocolo de Entrega Urgente - Retail Express',
    categoria: 'logistica',
    archivo: 'entrega-urgente-retail.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-13',
    empresaId: 'emp-002',
    descripcion: 'Procedimientos especiales para entregas urgentes y express'
  },
  {
    id: 'POL-009',
    titulo: 'Certificación de Productos Orgánicos',
    categoria: 'calidad',
    archivo: 'certificacion-organicos.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-11',
    descripcion: 'Documentación y certificados para productos de línea orgánica'
  },
  {
    id: 'POL-010',
    titulo: 'Política de Privacidad y Datos',
    categoria: 'general',
    archivo: 'politica-privacidad.pdf',
    tipoArchivo: 'pdf',
    fechaSubida: '2024-01-09',
    descripcion: 'Tratamiento de datos personales y políticas de privacidad'
  }
]

const getCategoriaBadge = (categoria: string) => {
  const estilos = {
    operaciones: 'bg-blue-100 text-blue-800 border-blue-200',
    pagos: 'bg-green-100 text-green-800 border-green-200',
    logistica: 'bg-purple-100 text-purple-800 border-purple-200',
    calidad: 'bg-orange-100 text-orange-800 border-orange-200',
    general: 'bg-gray-100 text-gray-800 border-gray-200'
  }
  
  return estilos[categoria as keyof typeof estilos] || 'bg-gray-100 text-gray-800'
}

const getCategoriaTexto = (categoria: string) => {
  const textos = {
    operaciones: 'Operaciones',
    pagos: 'Pagos',
    logistica: 'Logística',
    calidad: 'Calidad',
    general: 'General'
  }
  
  return textos[categoria as keyof typeof textos] || categoria
}

const getTipoArchivoIcon = (tipo: string) => {
  switch (tipo) {
    case 'pdf':
      return <FileText className="w-4 h-4 text-red-500" />
    case 'doc':
    case 'docx':
      return <File className="w-4 h-4 text-blue-500" />
    case 'jpg':
    case 'png':
      return <File className="w-4 h-4 text-green-500" />
    default:
      return <File className="w-4 h-4 text-gray-500" />
  }
}

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export default function PoliticasPage() {
  const [politicas] = useState<Politica[]>(politicasEjemplo)
  const [filtroTexto, setFiltroTexto] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')

  const politicasFiltradas = politicas.filter(politica => {
    const coincideTexto = politica.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                         politica.descripcion?.toLowerCase().includes(filtroTexto.toLowerCase())
    const coincideCategoria = filtroCategoria === 'todas' || politica.categoria === filtroCategoria
    const coincideTipo = filtroTipo === 'todos' || 
                        (filtroTipo === 'generales' && !politica.empresaId) ||
                        (filtroTipo === 'especificas' && politica.empresaId)
    
    return coincideTexto && coincideCategoria && coincideTipo
  })

  // Estadísticas
  const totalPoliticas = politicas.length
  const politicasGenerales = politicas.filter(p => !p.empresaId).length
  const politicasEspecificas = politicas.filter(p => p.empresaId).length
  const categorias = [...new Set(politicas.map(p => p.categoria))]

  // Distribución por categoría
  const distribucionCategorias = categorias.map(categoria => ({
    categoria,
    cantidad: politicas.filter(p => p.categoria === categoria).length
  }))

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Políticas y Documentos
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona políticas, procedimientos y documentos corporativos
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Upload className="w-4 h-4 mr-2" />
            Subir Documento
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Documentos
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalPoliticas}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3 este mes
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Políticas Generales
              </CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{politicasGenerales}</div>
              <p className="text-xs text-gray-600 mt-1">
                Aplicables a todos
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Políticas Específicas
              </CardTitle>
              <Building className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{politicasEspecificas}</div>
              <p className="text-xs text-gray-600 mt-1">
                Por empresa
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Categorías
              </CardTitle>
              <Filter className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{categorias.length}</div>
              <p className="text-xs text-gray-600 mt-1">
                Tipos diferentes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Distribución por Categorías */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribución por Categorías</CardTitle>
            <CardDescription>
              Cantidad de documentos por cada categoría
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {distribucionCategorias.map(({ categoria, cantidad }) => (
                <div key={categoria} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{cantidad}</div>
                  <Badge className={`mt-2 ${getCategoriaBadge(categoria)}`}>
                    {getCategoriaTexto(categoria)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
            <CardDescription>
              Filtra documentos por título, categoría o tipo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por título o descripción..."
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
                  <SelectItem value="operaciones">Operaciones</SelectItem>
                  <SelectItem value="pagos">Pagos</SelectItem>
                  <SelectItem value="logistica">Logística</SelectItem>
                  <SelectItem value="calidad">Calidad</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="generales">Políticas Generales</SelectItem>
                  <SelectItem value="especificas">Políticas Específicas</SelectItem>
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

        {/* Tabla de Políticas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Documentos ({politicasFiltradas.length})
            </CardTitle>
            <CardDescription>
              Lista completa de políticas y documentos corporativos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Archivo</TableHead>
                    <TableHead>Fecha Subida</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {politicasFiltradas.map((politica) => (
                    <TableRow key={politica.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="max-w-sm">
                          <p className="font-medium text-gray-900">{politica.titulo}</p>
                          <p className="text-sm text-gray-500 mt-1">{politica.descripcion}</p>
                          {politica.empresaId && (
                            <Badge variant="outline" className="mt-2 bg-purple-50 text-purple-700 border-purple-200">
                              Específica
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoriaBadge(politica.categoria)}>
                          {getCategoriaTexto(politica.categoria)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {politica.empresaId ? (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <Building className="w-3 h-3 mr-1" />
                            Específica
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Users className="w-3 h-3 mr-1" />
                            General
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTipoArchivoIcon(politica.tipoArchivo)}
                          <span className="text-sm font-medium">{politica.archivo}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatearFecha(politica.fechaSubida)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
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