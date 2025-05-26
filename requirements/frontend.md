# Requerimientos Frontend – Proyecto CRM para Retail

## Descripción General

Este CRM está diseñado para ayudar a los **Account Managers** de empresas retail a acceder a la información clave de sus cuentas de forma rápida, ordenada y visual. El sistema centraliza datos históricos de ventas, detalles de productos (SKUs), órdenes de compra y documentación crítica (políticas, lineamientos, etc.).

---

## Objetivos del Frontend

* Proveer una interfaz clara y fácil de usar para que los account managers consulten la información.
* Permitir acceso rápido a datos históricos y actuales de cada empresa (cliente).
* Visualización eficiente de ventas, productos, órdenes de compra y documentación relevante.
* Soporte responsivo para escritorio y dispositivos móviles.

---

## Secciones Principales de la Interfaz

### 1. **Empresas (Clientes)**

* Lista de empresas con búsqueda y filtros (nombre, industria, status).
* Vista de detalle para cada empresa:

  * Información general (nombre, contacto, industria).
  * Historial de ventas (listado por mes/año, sin gráficas).
  * Órdenes de compra asociadas.
  * Archivos/documentos relacionados.

### 2. **Ventas Históricas**

* Tabla con historial de ventas por empresa y por SKU.
* Filtros por rango de fechas, tipo de producto, canal de venta.
* Posibilidad de exportar datos en CSV.

### 3. **Órdenes de Compra**

* Lista de órdenes de compra asociadas a cada empresa.
* Detalles de cada orden:

  * Fecha, número de orden, productos incluidos (SKU), cantidades, estado (pendiente, entregado, cancelado).
  * Enlace a la empresa y ventas relacionadas.
* Posibilidad de filtrar y buscar por estado, fecha o empresa.

### 4. **Productos (SKUs)**

* Lista de productos por empresa, con filtros y buscador.
* Información de cada SKU:

  * Código, descripción, categoría.
  * Historial de ventas del producto (en lista, sin gráficas).
  * Estado actual (activo/inactivo).

### 5. **Políticas**

* Sección donde las empresas pueden subir documentos relevantes (PDFs, Word, imágenes).
* Visualizador de documentos integrados.
* Clasificación por categorías (operaciones, pagos, logística, etc.).

---

## Requerimientos Técnicos

### Frameworks y Librerías

* **Next.js** como framework principal.
* **shadcn/ui** para componentes UI accesibles y bien diseñados.
* **TailwindCSS** para estilos utilitarios.
* **Supabase** como backend (base de datos y autenticación).
* **LangChain y LangGraph** para automatización, generación de contexto y flujos de inteligencia artificial.

### Funcionalidades Clave

* Autenticación de usuarios mediante Supabase.
* Responsive Design.
* Integración de agentes de IA para búsqueda semántica o ayuda contextual con LangGraph.
* Manejo de errores y loading states elegantes.

---

## Integraciones Previstas

* Supabase (auth, base de datos, almacenamiento de archivos).
* LangChain/LangGraph para procesamiento y automatización de flujos conversacionales.
* Posibilidad de exportación de datos en CSV.

---

## Consideraciones de Diseño

* UX enfocada en eficiencia y claridad para usuarios de negocios.
* Estética sobria y profesional basada en shadcn.
* Navegación intuitiva con menú lateral persistente.
* Soporte para modo claro/oscuro.

---

## Próximos Pasos

1. Definición de wireframes para cada sección.
2. Prototipo en Figma o herramienta similar.
3. Desarrollo inicial en Next.js con integración de Supabase.
4. Implementación de agentes con LangChain y LangGraph.
5. Pruebas de usabilidad con usuarios reales.
