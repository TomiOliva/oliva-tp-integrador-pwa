# Backend - Segunda entrega

API REST desarrollada con Node.js, Express y MariaDB.

## Arquitectura

La solicitud atraviesa las siguientes capas:

```text
Route -> Controller -> Service -> Repository -> Base de datos
```

### Routes

Archivo: `src/routes/productRoutes.js`

Define los endpoints y selecciona el controlador correspondiente:

```js
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
```

### Controllers

Archivo: `src/controllers/productController.js`

Recibe `request` y `response`, llama al servicio y devuelve la respuesta JSON.

### Services

Archivo: `src/services/productService.js`

Contiene la logica de negocio. Para el detalle valida que el ID sea un entero positivo.

### Repositories

Archivo: `src/repositories/productRepository.js`

Es la capa que ejecuta las consultas SQL sobre MariaDB.

### Config

Archivo: `src/config/database.js`

Crea el pool de conexiones usando las variables definidas en `.env`.

## Endpoints

### Listar productos

```http
GET /productos
```

Devuelve un array con todos los productos.

### Obtener detalle

```http
GET /productos/:id
```

Ejemplo:

```http
GET /productos/1
```

Si el producto no existe, responde con estado `404`.

No se implementan endpoints `POST`, `PUT` ni `DELETE`.

## Configuracion

Crear un archivo `.env` a partir de `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=pwa_user
DB_PASSWORD=COLOCAR_CONTRASENA
DB_NAME=pwa_integrador
```

El archivo `.env` no debe subirse al repositorio.

## Ejecucion

```bash
npm install
npm run dev
```

Servidor:

```text
http://localhost:3000
```
