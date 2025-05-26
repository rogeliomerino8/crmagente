"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  DollarSign,
  Package,
  Building2
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Venta } from "@/lib/types";

// Datos de ejemplo
const ventasEjemplo: Venta[] = [
  {
    id: "1",
    empresaId: "1",
    skuId: "SKU-001",
    fecha: "2024-01-15",
    cantidad: 100,
    precioUnitario: 452,
    total: 45200,
    canal: "online",
    mes: 1,
    año: 2024
  },
  {
    id: "2",
    empresaId: "2",
    skuId: "SKU-045",
    fecha: "2024-01-14",
    cantidad: 50,
    precioUnitario: 476,
    total: 23800,
    canal: "tienda",
    mes: 1,
    año: 2024
  },
  {
    id: "3",
    empresaId: "3",
    skuId: "SKU-012",
    fecha: "2024-01-13",
    cantidad: 150,
    precioUnitario: 450,
    total: 67500,
    canal: "mayorista",
    mes: 1,
    año: 2024
  },
  {
    id: "4",
    empresaId: "4",
    skuId: "SKU-089",
    fecha: "2024-01-12",
    cantidad: 75,
    precioUnitario: 454.67,
    total: 34100,
    canal: "distribuidor",
    mes: 1,
    año: 2024
  }
];

const empresasMap = {
  "1": "Retail Express S.A.",
  "2": "Comercial Norte Ltda.",
  "3": "Distribuidora Central",
  "4": "Mayorista del Sur"
};

const productosMap = {
  "SKU-001": "Producto Premium",
  "SKU-045": "Producto Estándar",
  "SKU-012": "Producto Básico",
  "SKU-089": "Producto Especial"
};

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>(ventasEjemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCanal, setFiltroCanal] = useState<string>("todos");
  const [filtroEmpresa, setFiltroEmpresa] = useState<string>("todas");

  const ventasFiltradas = ventas.filter(venta => {
    const empresa = empresasMap[venta.empresaId as keyof typeof empresasMap];
    const producto = productosMap[venta.skuId as keyof typeof productosMap];
    
    const matchesSearch = empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venta.skuId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCanal = filtroCanal === "todos" || venta.canal === filtroCanal;
    const matchesEmpresa = filtroEmpresa === "todas" || venta.empresaId === filtroEmpresa;
    
    return matchesSearch && matchesCanal && matchesEmpresa;
  });

  const totalVentas = ventasFiltradas.reduce((sum, venta) => sum + venta.total, 0);
  const totalCantidad = ventasFiltradas.reduce((sum, venta) => sum + venta.cantidad, 0);

  const getCanalBadge = (canal: string) => {
    switch (canal) {
      case "online":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Online</Badge>;
      case "tienda":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Tienda</Badge>;
      case "mayorista":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Mayorista</Badge>;
      case "distribuidor":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Distribuidor</Badge>;
      default:
        return <Badge variant="secondary">{canal}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ventas</h1>
            <p className="text-gray-600">Historial y análisis de ventas</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        {/* Estadísticas principales */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(totalVentas)}</p>
                  <p className="text-sm text-gray-600">Total Ventas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalCantidad.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Unidades Vendidas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{ventasFiltradas.length}</p>
                  <p className="text-sm text-gray-600">Transacciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{new Set(ventasFiltradas.map(v => v.empresaId)).size}</p>
                  <p className="text-sm text-gray-600">Empresas Activas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Empresa, producto o SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Canal de Venta</Label>
                <Select value={filtroCanal} onValueChange={setFiltroCanal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los canales</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="tienda">Tienda</SelectItem>
                    <SelectItem value="mayorista">Mayorista</SelectItem>
                    <SelectItem value="distribuidor">Distribuidor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Select value={filtroEmpresa} onValueChange={setFiltroEmpresa}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las empresas</SelectItem>
                    <SelectItem value="1">Retail Express S.A.</SelectItem>
                    <SelectItem value="2">Comercial Norte Ltda.</SelectItem>
                    <SelectItem value="3">Distribuidora Central</SelectItem>
                    <SelectItem value="4">Mayorista del Sur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Período</Label>
                <Select defaultValue="mes-actual">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mes-actual">Mes actual</SelectItem>
                    <SelectItem value="ultimo-mes">Último mes</SelectItem>
                    <SelectItem value="trimestre">Último trimestre</SelectItem>
                    <SelectItem value="año">Año actual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de ventas */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unit.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventasFiltradas.map((venta) => (
                  <TableRow key={venta.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(venta.fecha).toLocaleDateString('es-ES')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{empresasMap[venta.empresaId as keyof typeof empresasMap]}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{venta.skuId}</p>
                        <p className="text-sm text-gray-500">{productosMap[venta.skuId as keyof typeof productosMap]}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCanalBadge(venta.canal)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {venta.cantidad.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(venta.precioUnitario)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(venta.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {ventasFiltradas.length === 0 && (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron ventas con los filtros aplicados</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 