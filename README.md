# Trabajo Practico Integrador - PWA

## Entrega final

Aplicacion e-commerce separada en:

- `frontend`: interfaz desarrollada con React.
- `backend`: API REST desarrollada con Node.js y Express.
- MariaDB: base de datos de productos y categorias.
- Carrito de compras manejado en el frontend con Context y persistencia en `localStorage`.

El flujo de la aplicacion es:

```text
Frontend -> Routes -> Controllers -> Services -> Repositories -> MariaDB
```

## Requisitos

- Node.js y npm.
- MariaDB.
- El archivo `shein-products.csv`.
- El script `script_base_de_datos_pwa.sql`.

## Base de datos

Ejecutar el script `script_base_de_datos_pwa.sql` para crear:

- Base de datos `pwa_integrador`.
- Tabla `productos_raw`.
- Tabla `categorias`.
- Tabla `productos`, incluyendo la moneda de cada producto.

El script importa los datos desde `shein-products.csv`.

Para crear un usuario de solo lectura para el backend:

```sql
CREATE USER IF NOT EXISTS 'pwa_user'@'localhost'
IDENTIFIED BY 'COLOCAR_CONTRASENA';

GRANT SELECT ON pwa_integrador.* TO 'pwa_user'@'localhost';

FLUSH PRIVILEGES;
```

## Backend

Crear `backend/.env` tomando como ejemplo `backend/.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=pwa_user
DB_PASSWORD=COLOCAR_CONTRASENA
DB_NAME=pwa_integrador
```

Instalar dependencias y ejecutar:

```bash
cd backend
npm install
npm run dev
```

El backend queda disponible en:

```text
http://localhost:3000
```

Endpoints:

- `GET /productos`: devuelve productos con datos de paginacion y limite por defecto.
- `GET /productos?limit=24&offset=0`: devuelve productos con limite y desplazamiento.
- `GET /productos/:id`: devuelve un producto por ID.
- `GET /categorias`: devuelve todas las categorias.

Ejemplos:

```text
http://localhost:3000/productos
http://localhost:3000/productos?limit=24&offset=0
http://localhost:3000/productos/1
http://localhost:3000/categorias
```

## Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible normalmente en:

```text
http://localhost:5173
```

Por defecto consume la API en `http://localhost:3000`.

El frontend carga productos paginados de a 12 para evitar mostrar todo el CSV junto y maneja imagenes rotas con una imagen alternativa.

Tambien permite:

- Agregar productos al carrito.
- Eliminar productos del carrito.
- Modificar cantidades.
- Ver el total de la compra.
- Filtrar productos por categoria.
- Ordenar productos por nombre o precio.

## Variables privadas

El archivo `backend/.env` contiene configuracion local y no se sube al repositorio.
Para compartir la estructura de configuracion se utiliza `backend/.env.example`.

Tampoco se incluyen en Git:

- `node_modules`
- `dist`
- archivos `.env`
