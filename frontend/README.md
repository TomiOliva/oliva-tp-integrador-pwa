# E-commerce - Frontend

Interfaz de e-commerce realizada con React y Vite.

## Funcionalidades

- Listado de productos en grilla.
- Cada producto muestra nombre, precio e imagen.
- Vista individual de producto con nombre, descripcion, precio e imagen.
- Consumo de productos desde la API del backend.
- Carga paginada de productos para no mostrar todo el CSV junto.
- Manejo de mensajes de error y fallback para imagenes rotas.
- Carrito manejado con Context.
- Agregar productos, eliminar productos, modificar cantidades y ver total.
- Persistencia del carrito en `localStorage`.
- Filtro por categoria.
- Ordenamiento por nombre y precio.

## Instalacion

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Por defecto consume la API en:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

El build genera la carpeta `dist`, que no hace falta versionar ni incluir en el entregable.
