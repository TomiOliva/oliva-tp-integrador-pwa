# Trabajo Practico Integrador - PWA

## Segunda entrega

Aplicacion e-commerce separada en:

- `frontend`: interfaz desarrollada con React.
- `backend`: API REST desarrollada con Node.js y Express.
- MariaDB: base de datos de productos y categorias.

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
- Tabla `productos`.

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

- `GET /productos`: devuelve todos los productos.
- `GET /productos/:id`: devuelve un producto por ID.

Ejemplos:

```text
http://localhost:3000/productos
http://localhost:3000/productos/1
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

## Variables privadas

El archivo `backend/.env` contiene configuracion local y no se sube al repositorio.
Para compartir la estructura de configuracion se utiliza `backend/.env.example`.

Tampoco se incluyen en Git:

- `node_modules`
- `dist`
- archivos `.env`
