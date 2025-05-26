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
  Building2, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Mail, 
  Phone,
  MapPin,
  TrendingUp,
  LayoutGrid,
  List,
  Calendar
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Empresa } from "@/lib/types";
import { useRouter } from "next/navigation";

// Datos de ejemplo
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

type VistaType = 'tabla' | 'kanban';

export default function EmpresasPage() {
  const [empresas] = useState<Empresa[]>(empresasEjemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroIndustria, setFiltroIndustria] = useState<string>("todas");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [vista, setVista] = useState<VistaType>('kanban');
  const router = useRouter();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const empresasFiltradas = empresas.filter(empresa => {
    const matchesSearch = empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustria = filtroIndustria === "todas" || empresa.industria === filtroIndustria;
    const matchesStatus = filtroStatus === "todos" || empresa.status === filtroStatus;
    
    return matchesSearch && matchesIndustria && matchesStatus;
  });

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

  const handleVerDetalle = (empresaId: string) => {
    router.push(`/empresas/${empresaId}`);
  };

  const handleEditarEmpresa = (empresaId: string) => {
    console.log("Editar empresa:", empresaId);
  };



  // Organizar empresas por estado para la vista Kanban
  const empresasPorEstado = {
    prospecto: empresasFiltradas.filter(e => e.status === 'prospecto'),
    activo: empresasFiltradas.filter(e => e.status === 'activo'),
    inactivo: empresasFiltradas.filter(e => e.status === 'inactivo')
  };

  const EmpresaCard = ({ empresa }: { empresa: Empresa }) => (
    <Card 
      className="mb-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleVerDetalle(empresa.id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-sm">{empresa.nombre}</h3>
          <Badge variant="outline" className="text-xs">{empresa.industria}</Badge>
        </div>
        
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span className="truncate">{empresa.contacto}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>{empresa.telefono}</span>
          </div>
          {empresa.direccion && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate text-xs">{empresa.direccion}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(empresa.fechaCreacion).toLocaleDateString('es-ES')}</span>
          </div>
        </div>

        {empresa.notas && (
          <p className="text-xs text-gray-500 mt-2 italic truncate">{empresa.notas}</p>
        )}

        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleVerDetalle(empresa.id);
            }}
            className="flex-1 text-xs"
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEditarEmpresa(empresa.id);
            }}
            className="flex-1 text-xs"
          >
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const KanbanColumn = ({ 
    titulo, 
    empresas, 
    color, 
    bgColor 
  }: { 
    titulo: string; 
    empresas: Empresa[]; 
    color: string;
    bgColor: string;
  }) => (
    <div className="flex-1 min-w-80">
      <div className={`${bgColor} rounded-lg p-4 mb-4`}>
        <div className="flex items-center justify-between">
          <h2 className={`font-semibold ${color} text-lg`}>{titulo}</h2>
          <Badge variant="secondary" className="bg-white/80">
            {empresas.length}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {empresas.map((empresa) => (
          <EmpresaCard key={empresa.id} empresa={empresa} />
        ))}
        
        {empresas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay empresas en este estado</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
            <p className="text-gray-600">Gestiona la información de tus clientes</p>
          </div>
          <div className="flex gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={vista === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setVista('kanban')}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Kanban
              </Button>
              <Button
                variant={vista === 'tabla' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setVista('tabla')}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                Tabla
              </Button>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Empresa
            </Button>
          </div>
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
                    placeholder="Nombre, contacto o email..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Industria</Label>
                <Select value={filtroIndustria} onValueChange={setFiltroIndustria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar industria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las industrias</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Distribución">Distribución</SelectItem>
                    <SelectItem value="Mayorista">Mayorista</SelectItem>
                    <SelectItem value="Farmacia">Farmacia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                    <SelectItem value="prospecto">Prospecto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{empresas.length}</p>
                  <p className="text-sm text-gray-600">Total Empresas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{empresas.filter(e => e.status === "activo").length}</p>
                  <p className="text-sm text-gray-600">Activas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{empresas.filter(e => e.status === "prospecto").length}</p>
                  <p className="text-sm text-gray-600">Prospectos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{empresasFiltradas.length}</p>
                  <p className="text-sm text-gray-600">Filtradas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vista Kanban */}
        {vista === 'kanban' && (
          <div className="flex gap-6 overflow-x-auto pb-4">
            <KanbanColumn
              titulo="Prospectos"
              empresas={empresasPorEstado.prospecto}
              color="text-yellow-700"
              bgColor="bg-yellow-50 border border-yellow-200"
            />
            <KanbanColumn
              titulo="Activas"
              empresas={empresasPorEstado.activo}
              color="text-green-700"
              bgColor="bg-green-50 border border-green-200"
            />
            <KanbanColumn
              titulo="Inactivas"
              empresas={empresasPorEstado.inactivo}
              color="text-red-700"
              bgColor="bg-red-50 border border-red-200"
            />
          </div>
        )}

        {/* Vista Tabla */}
        {vista === 'tabla' && (
          <Card>
            <CardHeader>
              <CardTitle>Lista de Empresas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Industria</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Creación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empresasFiltradas.map((empresa) => (
                    <TableRow key={empresa.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{empresa.nombre}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {empresa.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {empresa.telefono}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{empresa.contacto}</p>
                          {empresa.direccion && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {empresa.direccion}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{empresa.industria}</Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(empresa.status)}
                      </TableCell>
                      <TableCell>
                        {new Date(empresa.fechaCreacion).toLocaleDateString('es-ES')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerDetalle(empresa.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditarEmpresa(empresa.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {empresasFiltradas.length === 0 && (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No se encontraron empresas con los filtros aplicados</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}


      </div>
    </MainLayout>
  );
} 