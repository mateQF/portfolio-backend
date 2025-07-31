# 🧠 Portfolio Fullstack - Backend

Este es el backend profesional de mi portfolio personal, desarrollado con **Node.js**, **Express v5** y **Prisma ORM**. La API gestiona proyectos, tecnologías y autenticación para un panel de administración. El código sigue principios **SOLID**, una arquitectura en capas y buenas prácticas de seguridad, validación y testeo. Está listo para producción y CI/CD.

---

## 🚀 Stack Tecnológico

- **Node.js** + **Express v5**
- **PostgreSQL** + **Prisma ORM**
- **Zod** para validaciones de esquema
- **JWT** para autenticación
- **Helmet**, **XSS Clean**, **Rate Limiting**, **HPP** y **CORS** para seguridad
- **Winston** para logging profesional
- **Nodemailer** para envíos de email (contacto)
- **Swagger** para documentación automática
- **Vitest** + **Supertest** para testing
- **ESLint** + **Prettier** para calidad de código
- **Husky** + **lint-staged** para hooks de git
- **CI/CD con GitHub Actions**

---

## 🧱 Arquitectura del Proyecto

```
src/
├── config/          # Configuración: Prisma, Nodemailer, Swagger, etc.
├── controllers/     # Lógica HTTP de cada entidad
├── routes/          # Rutas de Express
├── services/        # Lógica de negocio
├── repositories/    # Acceso a base de datos con Prisma
├── schemas/         # Validaciones Zod
├── middlewares/     # Seguridad, validaciones, errores
├── utils/           # Utilidades (logger, JWT, errores)
├── index.js         # Punto de entrada del servidor
```

---

## 🔐 Funcionalidades Principales

- 🔑 **Login de administrador** con JWT
- 📁 **Gestión de proyectos** (CRUD + destacado)
- 💻 **Gestión de tecnologías** (CRUD por categoría)
- 📬 **Formulario de contacto** con validación y email
- 🛡️ Seguridad: sanitizado, rate limiting, headers seguros
- 📈 **Logger centralizado** con Winston
- 🧪 **Test unitarios** y de integración con cobertura
- 🧾 Documentación Swagger (`/api/docs`)
- 💾 Seeds iniciales: admin, tecnologías, proyectos

---

## 📦 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/backend.git
cd backend

# Instalar dependencias
npm install

# Copiar y configurar el entorno
cp .env.example .env
# Editar DATABASE_URL y JWT_SECRET

# Migrar la base de datos
npx prisma migrate dev --name init

# Generar el cliente de Prisma
npx prisma generate

# Ejecutar seeds (opcional)
npm run seed:admin
npm run seed:techStack
npm run seed:project

# Ejecutar en desarrollo
npm run dev
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Generar cobertura
npm run coverage
```

La cobertura se guarda en la carpeta `coverage/` e incluye un HTML visual.

---

## 📄 Documentación API

Disponible en:  
👉 [`/api/docs`](http://localhost:3000/api/docs) (Swagger UI)

---

## ⚙️ Scripts disponibles

```bash
npm run dev           # Inicia el servidor con nodemon
npm run lint          # Ejecuta ESLint
npm run format        # Ejecuta Prettier
npm run seed:admin    # Seed para el usuario admin
npm run seed:techStack# Seed de tecnologías
npm run seed:project  # Seed de proyectos
npm test              # Ejecuta los tests
npm run coverage      # Ejecuta tests + coverage
```

---

## 🔄 CI/CD

- 🚀 **GitHub Actions** (`.github/workflows/nodejs.yml`)
- 🛠️ **Husky**: hooks pre-commit para lint + prettier

---

## 📝 Licencia

MIT

---

## ✍️ Autor

Hecho por [Tu nombre o usuario](https://github.com/tu-usuario)
