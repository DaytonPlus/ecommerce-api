# Documentación de la API

## Introducción

Este documento describe las rutas disponibles en la API del proyecto, junto con un breve índice, nombre de cada ruta, descripción y ejemplos de cómo consumirlas con `curl`.

---

## Índice de Rutas
1. **Autenticación**
   - `/api/auth/register`
   - `/api/auth/login`
2. **Carrito**
   - `/api/cart/add`
   - `/api/cart/user`
   - `/api/cart/user/remove/:itemId`
   - `/api/cart/user/checkout`
   - `/api/cart/`
   - `/api/cart/:id`
3. **Usuarios**
   - `/api/users/me`
   - `/api/users/`
   - `/api/users/:id`
4. **Balances**
   - `/api/balance/me`
   - `/api/balance/:usuario_id`
   - `/api/balance/`
5. **Pedidos**
   - `/api/orders/`
   - `/api/orders/me`
   - `/api/orders/cancel/:id`
   - `/api/orders/:id`
6. **Productos**
   - `/api/products/`
   - `/api/products/:id`
   - `/api/products/search`
7. **Categorías**
   - `/api/categories/`
   - `/api/categories/:id`
8. **Solicitudes de Cancelación**
   - `/api/cancellation_requests/orders/:orderId`
   - `/api/cancellation_requests/me`
   - `/api/cancellation_requests/`
   - `/api/cancellation_requests/:id`
9. **Idioma**
   - `/api/lang`

---

## Rutas Detalladas

### 1. Autenticación
#### **POST /api/auth/register**
- **Descripción**: Registra un nuevo usuario.
- **Ejemplo con `curl`:**
  ```bash
  curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
  ```

#### **POST /api/auth/login**
- **Descripción**: Inicia sesión y devuelve un token JWT.
- **Ejemplo con `curl`:**
  ```bash
  curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
  ```

---

### 2. Carrito
#### **POST /api/cart/add**
- **Descripción**: Agrega un ítem al carrito del usuario.
- **Ejemplo con `curl`:**
  ```bash
  curl -X POST http://localhost:8000/api/cart/add \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
  ```

#### **GET /api/cart/user**
- **Descripción**: Obtiene los ítems del carrito actual del usuario.
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:8000/api/cart/user \
  -H "Authorization: Bearer <TOKEN>"
  ```

#### **DELETE /api/cart/user/remove/:itemId**
- **Descripción**: Elimina un ítem del carrito del usuario.
- **Ejemplo con `curl`:**
  ```bash
  curl -X DELETE http://localhost:8000/api/cart/user/remove/123 \
  -H "Authorization: Bearer <TOKEN>"
  ```

#### **POST /api/cart/user/checkout**
- **Descripción**: Convierte el carrito en un pedido.
- **Ejemplo con `curl`:**
  ```bash
  curl -X POST http://localhost:8000/api/cart/user/checkout \
  -H "Authorization: Bearer <TOKEN>"
  ```

#### **GET /api/cart/ (Admin)**
- **Descripción**: Obtiene todos los carritos (restringido a administradores).
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:8000/api/cart/ \
  -H "Authorization: Bearer <TOKEN>"
  ```

#### **GET /api/cart/:id (Admin)**
- **Descripción**: Obtiene un carrito específico por ID (restringido a administradores).
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:8000/api/cart/123 \
  -H "Authorization: Bearer <TOKEN>"
  ```

---

### 3. Usuarios
#### **GET /api/users/me**
- **Descripción**: Obtiene la información del usuario autenticado.
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:8000/api/users/me \
  -H "Authorization: Bearer <TOKEN>"
  ```

#### **POST /api/users/ (Admin)**
- **Descripción**: Crea un nuevo usuario (restringido a administradores).
- **Ejemplo con `curl`:**
  ```bash
  curl -X POST http://localhost:8000/api/users/ \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Usuario",
    "email": "nuevo@example.com",
    "password": "password123"
  }'
  ```

---

### 4. Balances
#### **GET /api/balance/me**
- **Descripción**: Obtiene el balance del usuario autenticado.
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:8000/api/balance/me \
  -H "Authorization: Bearer <TOKEN>"
  ```

#### **GET /api/balance/:usuario_id (Admin)**
- **Descripción**: Obtiene el balance de un usuario específico (restringido a administradores).
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:8000/api/balance/123 \
  -H "Authorization: Bearer <TOKEN>"
  ```

---

### 5. Pedidos
#### **POST /api/orders/ (Auth)**
- **Descripción**: Crea un nuevo pedido.
- **Ejemplo con `curl`:**
  ```bash
  curl -X POST http://localhost:8000/api/orders/ \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "total": 100,
    "shipping_address": "123 Main St"
  }'
  ```

---

### 6. Idioma
#### **GET /api/lang**
- **Descripción**: Cambia el idioma del usuario.
- **Ejemplo con `curl`:**
  ```bash
  curl -X GET http://localhost:8000/api/lang?lang=es
  ```


