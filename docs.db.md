Documentación de la Estructura de la Base de Datos PostgreSQL 17 🚀

A continuación se presenta la documentación ligera y profesional para la estructura de la base de datos. Cada sección incluye el código SQL y una breve explicación de sus componentes.


---

Usuarios 👤

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

Explicación:

id: Identificador único del usuario.

name: Nombre completo del usuario.

email: Correo electrónico único para cada usuario.

password: Contraseña del usuario (almacenada de forma segura).

is_admin: Indica si el usuario tiene privilegios de administrador.

created_at: Fecha y hora de creación del registro.

updated_at: Fecha y hora de la última actualización del registro.



---

Saldo 💰

CREATE TABLE balances (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

Explicación:

id: Identificador único del registro de saldo.

user_id: Relaciona el saldo con el usuario correspondiente.

balance: Valor monetario del saldo del usuario.

created_at: Fecha y hora de creación del registro.

updated_at: Fecha y hora de la última actualización del registro.



---

Productos 📦

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

Explicación:

id: Identificador único del producto.

name: Nombre del producto.

description: Descripción detallada del producto.

price: Precio unitario del producto.

stock: Cantidad disponible en inventario.

category_id: Categoría a la que pertenece el producto.

created_at: Fecha y hora de creación del registro.

updated_at: Fecha y hora de la última actualización del registro.



---

Categorías 🗂️

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

Explicación:

id: Identificador único de la categoría.

name: Nombre de la categoría.

description: Descripción de la categoría.



---

Órdenes 🛒

CREATE TYPE order_status AS ENUM ('pending', 'processed', 'cancelled');
CREATE TYPE shipping_status AS ENUM ('pending', 'shipped', 'delivered');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status order_status NOT NULL,
    shipping_address VARCHAR(255) NOT NULL,
    shipping_status shipping_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

Explicación:

id: Identificador único de la orden.

user_id: Relaciona la orden con el usuario que la realizó.

total: Monto total de la orden.

status: Estado de la orden (pendiente, procesada o cancelada).

shipping_address: Dirección de envío.

shipping_status: Estado del envío (pendiente, enviado o entregado).

created_at: Fecha y hora de creación de la orden.

updated_at: Fecha y hora de la última actualización de la orden.



---

Detalles de una Orden 📄

CREATE TABLE orders_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

Explicación:

id: Identificador único del detalle de la orden.

order_id: Relaciona el detalle con la orden correspondiente.

product_id: Identificador del producto en la orden.

quantity: Cantidad del producto solicitado.



---

Solicitar Cancelación 🚫

CREATE TYPE cancellation_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE cancellation_requests (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    reason TEXT NOT NULL,
    status cancellation_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

Explicación:

id: Identificador único de la solicitud de cancelación.

order_id: Orden a la que se solicita la cancelación.

user_id: Usuario que solicita la cancelación.

reason: Motivo de la solicitud.

status: Estado de la solicitud (pendiente, aprobada o rechazada).

request_date: Fecha y hora en que se realizó la solicitud.



---

Carrito 🛍️

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

Explicación:

id: Identificador único del registro del carrito.

user_id: Usuario propietario del carrito.

product_id: Producto añadido al carrito.

quantity: Cantidad del producto en el carrito.

created_at: Fecha y hora de creación del registro.

updated_at: Fecha y hora de la última actualización del registro.



---

Notas adicionales 📝

Correcciones de sintaxis: Los bloques SQL cumplien con la sintaxis correcta de PostgreSQL.

Tipos ENUM: Se utilizan para definir estados en las órdenes y solicitudes de cancelación, asegurando consistencia en los valores permitidos.


Esta documentación brinda una visión clara y concisa de la estructura de la base de datos, facilitando la comprensión y mantenimiento del sistema. ¡Espero que te resulte útil!

