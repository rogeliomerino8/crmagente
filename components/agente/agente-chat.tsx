"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  X, 
  Bot,
  User,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Mensaje {
  id: string;
  contenido: string;
  esUsuario: boolean;
  timestamp: Date;
}

interface AgenteChatProps {
  className?: string;
}

export const AgenteChat: React.FC<AgenteChatProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: "1",
      contenido: "¡Hola! Soy tu asistente de CRM. Puedo ayudarte a encontrar información sobre empresas, ventas, órdenes y productos. ¿En qué puedo asistirte hoy?",
      esUsuario: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleEnviarMensaje = async () => {
    if (!inputValue.trim()) return;

    const nuevoMensaje: Mensaje = {
      id: Date.now().toString(),
      contenido: inputValue,
      esUsuario: true,
      timestamp: new Date()
    };

    setMensajes(prev => [...prev, nuevoMensaje]);
    setInputValue("");
    setIsTyping(true);

    // Simular respuesta del agente
    setTimeout(() => {
      const respuestaAgente: Mensaje = {
        id: (Date.now() + 1).toString(),
        contenido: generateAgenteResponse(inputValue),
        esUsuario: false,
        timestamp: new Date()
      };
      setMensajes(prev => [...prev, respuestaAgente]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAgenteResponse = (input: string): string => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes("empresa") || inputLower.includes("cliente")) {
      return "Puedo ayudarte con información de empresas. ¿Te interesa ver el listado completo, buscar una empresa específica, o revisar las estadísticas de ventas de algún cliente en particular?";
    }
    
    if (inputLower.includes("venta") || inputLower.includes("ventas")) {
      return "Para consultas de ventas, puedo mostrarte el historial por empresa, filtrar por fechas o canales de venta. ¿Qué período te interesa revisar?";
    }
    
    if (inputLower.includes("orden") || inputLower.includes("pedido")) {
      return "Puedo ayudarte a revisar órdenes de compra. ¿Quieres ver las órdenes pendientes, buscar por empresa específica, o revisar el estado de alguna orden en particular?";
    }
    
    if (inputLower.includes("producto") || inputLower.includes("sku")) {
      return "Para productos y SKUs, puedo mostrarte el catálogo completo, filtrar por categoría, o revisar el historial de ventas de productos específicos. ¿Qué necesitas consultar?";
    }
    
    return "Entiendo tu consulta. Puedo ayudarte con información sobre empresas, ventas, órdenes de compra y productos. ¿Podrías ser más específico sobre qué información necesitas?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviarMensaje();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [mensajes]);

  // Shortcut de teclado para abrir/cerrar el panel con Cmd+S (Mac) o Ctrl+S (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault(); // Prevenir el comportamiento por defecto de guardar
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Botón flotante para abrir el panel */}
      {!isOpen && (
        <div className={cn("fixed top-1/2 right-0 transform -translate-y-1/2 z-50 group", className)}>
          <Button
            onClick={() => setIsOpen(true)}
            className="h-12 w-12 rounded-l-full rounded-r-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-r-0"
            size="icon"
            title="Abrir Asistente CRM (Cmd+S)"
          >
            <div className="relative">
              <MessageSquare className="h-5 w-5 text-white" />
              <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </Button>
          
          {/* Tooltip con shortcut */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
              Asistente CRM
              <div className="text-gray-300 mt-1">⌘+S para abrir</div>
            </div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </div>
      )}

      {/* Panel lateral derecho */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-96 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out z-40",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header del panel */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/agente-avatar.png" />
                <AvatarFallback className="bg-white/20 text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">Asistente CRM</h3>
                <p className="text-sm text-blue-100">Siempre disponible para ayudarte</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex flex-col h-[calc(100vh-140px)]">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {mensajes.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className={cn(
                    "flex gap-3",
                    mensaje.esUsuario ? "justify-end" : "justify-start"
                  )}
                >
                  {!mensaje.esUsuario && (
                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      mensaje.esUsuario
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-900 rounded-bl-md"
                    )}
                  >
                    {mensaje.contenido}
                  </div>
                  
                  {mensaje.esUsuario && (
                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                      <AvatarFallback className="bg-gray-500 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Input area */}
          <div className="p-4 border-t bg-gray-50/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregúntame sobre empresas, ventas, órdenes..."
                className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isTyping}
              />
              <Button
                onClick={handleEnviarMensaje}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full w-10 h-10 p-0"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Enter para enviar • Shift+Enter para nueva línea • Cmd+S para abrir/cerrar
            </p>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar el panel en móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}; 