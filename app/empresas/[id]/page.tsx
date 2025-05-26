'use client'

import { use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Building2, 
  Mail, 
  Phone,
  MapPin,
  ArrowLeft,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { Empresa } from '@/lib/types'
import Link from 'next/link'

// Datos de ejemplo (mismos que en la página principal)
const empresasEjemplo: Empresa[] = [
  {
    id: "1",
    nombre: "Retail Express S.A.",
    contacto: "María González",
    email: "maria.gonzalez@retailexpress.com",
    telefono: "+56 9 8765 4321",
    industria: "Retail",
    status: "activo",
    fechaCreacion: "2023-01-15",
    direccion: "Av. Providencia 1234, Santiago",
    notas: "Cliente premium con alto volumen de compras"
  },
  {
    id: "2",
    nombre: "Comercial Norte Ltda.",
    contacto: "Carlos Rodríguez",
    email: "carlos.rodriguez@comercialnorte.cl",
    telefono: "+56 9 7654 3210",
    industria: "Distribución",
    status: "activo",
    fechaCreacion: "2023-03-22",
    direccion: "Calle Principal 567, Antofagasta"
  },
  {
    id: "3",
    nombre: "Distribuidora Central",
    contacto: "Ana Martínez",
    email: "ana.martinez@distcentral.com",
    telefono: "+56 9 6543 2109",
    industria: "Mayorista",
    status: "prospecto",
    fechaCreacion: "2023-11-08",
    direccion: "Av. Central 890, Valparaíso"
  },
  {
    id: "4",
    nombre: "Mayorista del Sur",
    contacto: "Pedro Silva",
    email: "pedro.silva@mayoristasur.cl",
    telefono: "+56 9 5432 1098",
    industria: "Mayorista",
    status: "inactivo",
    fechaCreacion: "2022-08-14",
    direccion: "Ruta 5 Sur Km 45, Temuco"
  },
  {
    id: "5",
    nombre: "SuperMercados Unidos",
    contacto: "Laura Fernández",
    email: "laura.fernandez@superunidos.cl",
    telefono: "+56 9 4321 0987",
    industria: "Retail",
    status: "activo",
    fechaCreacion: "2023-06-10",
    direccion: "Av. Las Condes 2345, Santiago"
  },
  {
    id: "6",
    nombre: "Farmacia Salud Total",
    contacto: "Roberto Morales",
    email: "roberto.morales@saludtotal.cl",
    telefono: "+56 9 3210 9876",
    industria: "Farmacia",
    status: "prospecto",
    fechaCreacion: "2023-12-01",
    direccion: "Calle Salud 123, Viña del Mar"
  },
  {
    id: "7",
    nombre: "Distribuidora Rápida",
    contacto: "Carmen López",
    email: "carmen.lopez@distrapida.cl",
    telefono: "+56 9 2109 8765",
    industria: "Distribución",
    status: "inactivo",
    fechaCreacion: "2022-11-20",
    direccion: "Industrial 456, Concepción"
  }
];

// Datos de ejemplo para ventas por empresa
const ventasPorEmpresa = {
  "1": [
    { id: "V-001", skuId: "SKU-001", sku: "Detergente Premium 1L", fecha: "2024-01-15", cantidad: 100, precioUnitario: 12500, total: 1250000 },
    { id: "V-002", skuId: "SKU-003", sku: "Acondicionador Reparador 400ml", fecha: "2024-01-10", cantidad: 50, precioUnitario: 18000, total: 900000 },
    { id: "V-003", skuId: "SKU-007", sku: "Gel Antibacterial 500ml", fecha: "2024-01-05", cantidad: 75, precioUnitario: 11000, total: 825000 }
  ],
  "2": [
    { id: "V-004", skuId: "SKU-002", sku: "Shampoo Nutritivo 500ml", fecha: "2024-01-12", cantidad: 80, precioUnitario: 15625, total: 1250000 },
    { id: "V-005", skuId: "SKU-004", sku: "Jabón Antibacterial 250ml", fecha: "2024-01-08", cantidad: 120, precioUnitario: 12500, total: 1500000 }
  ],
  "3": [
    { id: "V-006", skuId: "SKU-001", sku: "Detergente Premium 1L", fecha: "2024-01-14", cantidad: 200, precioUnitario: 12500, total: 2500000 },
    { id: "V-007", skuId: "SKU-005", sku: "Suavizante Floral 2L", fecha: "2024-01-09", cantidad: 60, precioUnitario: 14700, total: 882000 }
  ],
  "4": [
    { id: "V-008", skuId: "SKU-006", sku: "Crema Corporal 300ml", fecha: "2023-12-20", cantidad: 30, precioUnitario: 13600, total: 408000 }
  ],
  "5": [
    { id: "V-009", skuId: "SKU-001", sku: "Detergente Premium 1L", fecha: "2024-01-16", cantidad: 150, precioUnitario: 12500, total: 1875000 },
    { id: "V-010", skuId: "SKU-002", sku: "Shampoo Nutritivo 500ml", fecha: "2024-01-11", cantidad: 90, precioUnitario: 15625, total: 1406250 }
  ],
  "6": [
    { id: "V-011", skuId: "SKU-007", sku: "Gel Antibacterial 500ml", fecha: "2024-01-13", cantidad: 100, precioUnitario: 11000, total: 1100000 }
  ],
  "7": [
    { id: "V-012", skuId: "SKU-004", sku: "Jabón Antibacterial 250ml", fecha: "2023-11-15", cantidad: 40, precioUnitario: 12500, total: 500000 }
  ]
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EmpresaPerfilPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const empresa = empresasEjemplo.find(e => e.id === resolvedParams.id);

  if (!empresa) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Empresa no encontrada</h1>
          <p className="text-gray-600 mb-6">La empresa que buscas no existe o ha sido eliminada.</p>
          <Link href="/empresas">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Empresas
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  const getVentasEmpresa = (empresaId: string) => {
    return ventasPorEmpresa[empresaId as keyof typeof ventasPorEmpresa] || [];
  };

  const getEstadisticasEmpresa = (empresaId: string) => {
    const ventas = getVentasEmpresa(empresaId);
    const totalVentas = ventas.reduce((sum, venta) => sum + venta.total, 0);
    const totalUnidades = ventas.reduce((sum, venta) => sum + venta.cantidad, 0);
    const skusUnicos = new Set(ventas.map(v => v.skuId)).size;
    const ultimaVenta = ventas.length > 0 ? ventas[0].fecha : null;
    
    return {
      totalVentas,
      totalUnidades,
      skusUnicos,
      ultimaVenta,
      numeroVentas: ventas.length
    };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "activo":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>;
      case "inactivo":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactivo</Badge>;
      case "prospecto":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Prospecto</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = getEstadisticasEmpresa(empresa.id);
  const ventas = getVentasEmpresa(empresa.id);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header con navegación */}
        <div className="flex items-center gap-4">
          <Link href="/empresas">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{empresa.nombre}</h1>
            <p className="text-gray-600">Perfil detallado de la empresa</p>
          </div>
        </div>

        {/* Información básica de la empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Datos de Contacto
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{empresa.contacto}</p>
                      <p className="text-sm text-gray-600">Contacto Principal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{empresa.telefono}</p>
                      <p className="text-sm text-gray-600">Teléfono</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{empresa.email}</p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>
                  {empresa.direccion && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{empresa.direccion}</p>
                        <p className="text-sm text-gray-600">Dirección</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Información Comercial
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Industria:</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {empresa.industria}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estado:</span>
                    {getStatusBadge(empresa.status)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cliente desde:</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">
                        {new Date(empresa.fechaCreacion).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                  {stats.ultimaVenta && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Última venta:</span>
                      <span className="font-medium">
                        {new Date(stats.ultimaVenta).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  )}
                </div>
                {empresa.notas && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Notas:</h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg italic border-l-4 border-blue-200">
                      {empresa.notas}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas de ventas */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="h-10 w-10 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalVentas)}</p>
                  <p className="text-sm text-gray-600">Total Ventas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Package className="h-10 w-10 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUnidades.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Unidades Vendidas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-10 w-10 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.numeroVentas}</p>
                  <p className="text-sm text-gray-600">Transacciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-10 w-10 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.skusUnicos}</p>
                  <p className="text-sm text-gray-600">SKUs Diferentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historial de ventas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Historial de Ventas ({ventas.length} transacciones)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ventas.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead className="text-right">Precio Unit.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ventas.map((venta) => (
                      <TableRow key={venta.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {new Date(venta.fecha).toLocaleDateString('es-ES')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {venta.skuId}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{venta.sku}</TableCell>
                        <TableCell className="text-right font-medium">
                          {venta.cantidad.toLocaleString()} unidades
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(venta.precioUnitario)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-green-600">
                          {formatCurrency(venta.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin historial de ventas</h3>
                <p>Esta empresa aún no tiene transacciones registradas.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 