# 🛒 E-Commerce API 🛍️

![E-Commerce API](https://img.shields.io/badge/E--Commerce-API-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![Express](https://img.shields.io/badge/Express-4.17.1-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.x-blue)
![Mocha](https://img.shields.io/badge/Mocha-11.x-brightgreen)
![Joi](https://img.shields.io/badge/Joi-17.x-brightgreen)
![License](https://img.shields.io/badge/license-ISC-brightgreen)

---

## 📄 Descripción

Una poderosa API para comercio electrónico que permite gestionar productos, pedidos y usuarios de manera eficiente. Construida con Node.js, Express y PostgreSQL, esta API está diseñada para ser moderna, escalable y fácil de mantener.

---

## 🌟 Características

- 🛍️ **Gestión de productos**: Crear, actualizar, eliminar y listar productos.
- 📦 **Gestión de pedidos**: Crear, actualizar, eliminar y listar pedidos.
- 👥 **Gestión de usuarios**: Registro, inicio de sesión y gestión de perfiles de usuario.
- 🔒 **Autenticación y autorización**: Utiliza JWT para la autenticación de usuarios.
- ✅ **Pruebas automatizadas**: Configuradas con Mocha y Supertest para asegurar la calidad del código.
- 📊 **Cobertura de pruebas**: Generación de informes de cobertura de código.
- 🚀 **Sencillo desarrollo**: Scripts preconfigurados para migraciones de base de datos y más.

---

## 🛠️ Tecnologías Utilizadas

- **JavaScript**: Lenguaje principal utilizado en el desarrollo.
- **Node.js**: Entorno de ejecución para el código JavaScript.
- **Express**: Framework para el desarrollo de aplicaciones web y API.
- **PostgreSQL**: Base de datos relacional utilizada para el almacenamiento de datos.
- **JWT**: Para la autenticación y autorización.
- **Mocha**: Para las pruebas automatizadas.
- **Joi**: Para la validación de datos.
- **Nodemon**: Para el reinicio automático del servidor en desarrollo.

---

## 🚀 Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DaytonPlus/ecommerce-api.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd ecommerce-api
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno en un archivo `.env`:
   ```env
   DB_USER=your_username
   DB_HOST=localhost
   DB_NAME=ecommerce
   DB_PASSWORD=your_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   API_PORT=8000
   ```

Para más detalles sobre la instalación, consulta la [documentación de instalación](./docs/install.md).

---

## 📦 Uso

### Modo Desarrollo
Inicia la aplicación en modo desarrollo:
```bash
npm run dev
```

### Modo Producción
Inicia la aplicación en modo producción:
```bash
npm start
```

### Comandos Adicionales
- **Inicializar Base de Datos**:
  ```bash
  npm run setup
  ```
- **Migraciones**:
  ```bash
  npm run db:migrate
  ```
- **Semillas**:
  ```bash
  npm run db:seed
  ```
- **Eliminar Base de Datos**:
  ```bash
  npm run db:drop
  ```

---

## 🧪 Pruebas

Para ejecutar las pruebas:
```bash
npm test
```

---

## 📚 Documentación de la API

La documentación completa de la API está disponible en los siguientes enlaces:

- [Documentación de la API](./docs/api.md)
- [Configuración de la base de datos](./docs/database.md)

---

## 🤝 Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

---

## 📜 Licencia

Este proyecto está bajo la licencia ISC.

---

## 📧 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a [daytonprogrammer@gmail.com](mailto:daytonprogrammer@gmail.com).

---

⌨️ con ❤️ por [DaytonPlus](https://github.com/DaytonPlus)
