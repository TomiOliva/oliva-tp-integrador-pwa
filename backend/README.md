# Backend - Entrega final

API REST desarrollada con Node.js, Express y MariaDB.

## Arquitectura

La solicitud atraviesa las siguientes capas:

```text
Route -> Controller -> Service -> Repository -> Base de datos
```

### Routes

Archivos:

- `src/routes/productRoutes.js`
- `src/routes/categoryRoutes.js`

Define los endpoints y selecciona el controlador correspondiente:

```js
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
```

Para categorias:

```js
router.get('/', categoryController.getAllCategories)
```

### Controllers

Archivos:

- `src/controllers/productController.js`
- `src/controllers/categoryController.js`

Recibe `request` y `response`, llama al servicio y devuelve la respuesta JSON.

### Services

Archivos:

- `src/services/productService.js`
- `src/services/categoryService.js`

Contiene la logica de negocio. Para el detalle valida que el ID sea un entero positivo.

### Repositories

Archivos:

- `src/repositories/productRepository.js`
- `src/repositories/categoryRepository.js`

Es la capa que ejecuta las consultas SQL sobre MariaDB.

### Config

Archivo: `src/config/database.js`

Crea el pool de conexiones usando las variables definidas en `.env`.

## Endpoints

### Listar productos

```http
GET /productos
```

Devuelve los productos y datos de paginacion. Por defecto aplica un limite para evitar devolver todo el CSV junto.

Tambien acepta parametros de paginacion:

```http
GET /productos?limit=24&offset=0
```

Tambien acepta filtro y orden:

```http
GET /productos?categoryId=1&sortBy=price&sortDirection=asc
```

Formato de respuesta:

```json
{
  "products": [],
  "pagination": {
    "limit": 24,
    "offset": 0,
    "total": 1000,
    "page": 1,
    "totalPages": 42
  }
}
```

### Obtener detalle

```http
GET /productos/:id
```

Ejemplo:

```http
GET /productos/1
```

Si el producto no existe, responde con estado `404`.

Si el ID no es un entero positivo, responde con estado `400`.

### Listar categorias

```http
GET /categorias
```

Devuelve un array con todas las categorias.

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
