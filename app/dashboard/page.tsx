"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  TrendingUp, 
  ShoppingCart, 
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FileText
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";

const estadisticas = [
  {
    titulo: "Total Empresas",
    valor: "127",
    cambio: "+12%",
    tendencia: "up",
    icon: Building2,
    descripcion: "vs mes anterior"
  },
  {
    titulo: "Ventas del Mes",
    valor: "$2.4M",
    cambio: "+8.2%",
    tendencia: "up",
    icon: DollarSign,
    descripcion: "vs mes anterior"
  },
  {
    titulo: "Órdenes Activas",
    valor: "89",
    cambio: "-3%",
    tendencia: "down",
    icon: ShoppingCart,
    descripcion: "vs semana anterior"
  },
  {
    titulo: "Productos Activos",
    valor: "1,247",
    cambio: "+5.1%",
    tendencia: "up",
    icon: Package,
    descripcion: "vs mes anterior"
  }
];

const ventasRecientes = [
  {
    empresa: "Retail Express S.A.",
    producto: "SKU-001 - Producto Premium",
    monto: "$45,200",
    fecha: "2024-01-15",
    estado: "completado"
  },
  {
    empresa: "Comercial Norte Ltda.",
    producto: "SKU-045 - Producto Estándar",
    monto: "$23,800",
    fecha: "2024-01-14",
    estado: "completado"
  },
  {
    empresa: "Distribuidora Central",
    producto: "SKU-012 - Producto Básico",
    monto: "$67,500",
    fecha: "2024-01-13",
    estado: "pendiente"
  },
  {
    empresa: "Mayorista del Sur",
    producto: "SKU-089 - Producto Especial",
    monto: "$34,100",
    fecha: "2024-01-12",
    estado: "completado"
  }
];

const ordenesRecientes = [
  {
    numero: "ORD-2024-001",
    empresa: "Retail Express S.A.",
    total: "$125,400",
    estado: "procesando",
    fecha: "2024-01-15"
  },
  {
    numero: "ORD-2024-002",
    empresa: "Comercial Norte Ltda.",
    total: "$89,200",
    estado: "pendiente",
    fecha: "2024-01-14"
  },
  {
    numero: "ORD-2024-003",
    empresa: "Distribuidora Central",
    total: "$156,800",
    estado: "entregado",
    fecha: "2024-01-13"
  }
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Vista general de tu CRM retail</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Último mes
            </Button>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Exportar reporte
            </Button>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {estadisticas.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.titulo}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.valor}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.tendencia === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.tendencia === "up" ? "text-green-600" : "text-red-600"}>
                      {stat.cambio}
                    </span>
                    <span className="text-gray-500">{stat.descripcion}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Ventas recientes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Ventas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ventasRecientes.map((venta, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{venta.empresa}</p>
                      <p className="text-sm text-gray-600">{venta.producto}</p>
                      <p className="text-xs text-gray-500">{venta.fecha}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{venta.monto}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        venta.estado === "completado" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {venta.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver todas las ventas
              </Button>
            </CardContent>
          </Card>

          {/* Órdenes recientes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Órdenes Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ordenesRecientes.map((orden, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{orden.numero}</p>
                      <p className="text-sm text-gray-600">{orden.empresa}</p>
                      <p className="text-xs text-gray-500">{orden.fecha}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{orden.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        orden.estado === "entregado" 
                          ? "bg-green-100 text-green-700" 
                          : orden.estado === "procesando"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {orden.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver todas las órdenes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Building2 className="h-6 w-6" />
                <span>Nueva Empresa</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <ShoppingCart className="h-6 w-6" />
                <span>Nueva Orden</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Package className="h-6 w-6" />
                <span>Nuevo Producto</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <FileText className="h-6 w-6" />
                <span>Subir Política</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 