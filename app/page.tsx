"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight, Bot, Sparkles } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleNavigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900">CRM Retail</h1>
              <p className="text-lg text-gray-600">Sistema de Gestión para Account Managers</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Centraliza la información de tus cuentas, gestiona ventas, órdenes y productos 
            con la ayuda de inteligencia artificial.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Building2 className="h-5 w-5" />
                Gestión de Empresas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Administra información completa de tus clientes, historial de ventas y documentación.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Bot className="h-5 w-5" />
                Asistente IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Consulta información rápidamente con nuestro agente inteligente siempre disponible.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Sparkles className="h-5 w-5" />
                Análisis Avanzado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Obtén insights valiosos sobre ventas, tendencias y oportunidades de negocio.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <Card className="max-w-md mx-auto border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">¿Listo para comenzar?</h3>
              <p className="text-blue-100 mb-4">
                Accede a tu dashboard y comienza a gestionar tus cuentas de manera eficiente.
              </p>
              <Button 
                onClick={handleNavigateToDashboard}
                className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                Ir al Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Desarrollado con Next.js</span>
            <span>•</span>
            <span>Powered by Supabase</span>
            <span>•</span>
            <span>IA con LangChain</span>
          </div>
        </div>
      </div>
    </div>
  );
}
