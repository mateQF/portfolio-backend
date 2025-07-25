# 🧠 Portfolio Fullstack - Backend

Este es el backend profesional de mi portfolio personal, desarrollado con Node.js, Express y Prisma. La API gestiona proyectos y habilidades, sigue principios SOLID, patrón de arquitectura en capas, validaciones con Zod y está lista para producción.

---

## 🚀 Stack Tecnológico

- **Node.js** + **Express** (v5)
- **PostgreSQL** con **Prisma ORM**
- **Zod** para validaciones
- **ES Modules** (`type: "module"`)
- **Winston** para logging
- **ESLint** + **Prettier** para calidad de código
- ✍️ Pensado para agregar:
  - Testing con Jest + Supertest
  - Autenticación con JWT
  - Panel admin para gestión de datos

---

## 🧱 Arquitectura del proyecto

```
src/
├── config/          # Configuración de Prisma y entorno
├── controllers/     # Lógica HTTP (Express)
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── repositories/    # Acceso a la base de datos (Repository Pattern)
├── middlewares/     # Validación, errores
├── schemas/         # Esquemas de validación con Zod
├── utils/           # Logger, clases de error, helpers
├── index.js         # Entry point de la API
```

---

## 📦 Instalación

1. Clonar el proyecto

```bash
git clone https://github.com/tuusuario/portfolio-backend.git
cd portfolio-backend
```

2. Instalar dependencias

```bash
npm install
```

3. Crear archivo `.env`

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/portfolio?schema=public"
PORT=5000
```

4. Crear la base de datos y aplicar migraciones

```bash
npx prisma migrate dev --name init
```

5. (Opcional) Cargar datos de prueba

```bash
npm run seed
```

6. Levantar el servidor

```bash
npm run dev
```

---

## 📡 Endpoints disponibles (módulo `projects`)

### 🔹 GET `/api/projects`
Obtiene todos los proyectos con soporte de paginación, ordenamiento y búsqueda.

Query params:
- `page` (default: 1)
- `limit` (default: 10)
- `sort` (por campo: `title`, `createdAt`, etc.)
- `order` (`asc` o `desc`)
- `search`: busca en título, descripción, categoría o tecnologías

### 🔹 GET `/api/projects/:id`
Obtiene un proyecto por ID (UUID).  
- `400` si el ID no es UUID  
- `404` si no se encuentra

### 🔹 POST `/api/projects`
Crea un nuevo proyecto  
**Body (JSON):**
```json
{
  "title": "Mi Proyecto",
  "description": "Descripción",
  "image": "https://i.imgur.com/imagen.png",
  "url": "https://github.com/miproyecto",
  "techStack": ["React", "PostgreSQL"],
  "category": "Fullstack",
  "isFeatured": true
}
```

### 🔹 PUT `/api/projects/:id`
Actualiza un proyecto existente

### 🔹 DELETE `/api/projects/:id`
Elimina un proyecto por ID

---

## 🛡️ Rate Limiting

La API implementa protección contra abuso y spam mediante [express-rate-limit](https://www.npmjs.com/package/express-rate-limit). Las peticiones se limitan por IP con ventanas de tiempo configuradas según la criticidad del endpoint.

| Endpoint                  | Límite por IP        | Ventana de tiempo  |
|---------------------------|----------------------|---------------------|
| `GET /api/projects`       | 100 solicitudes      | cada 15 minutos     |
| `GET /api/projects/:id`   | 50 solicitudes       | cada 15 minutos     |
| `POST /api/projects`      | 10 creaciones        | cada 1 hora         |

Si se supera el límite, la API devuelve:

```json
{
  "error": "TooManyRequests",
  "message": "Has superado el límite de peticiones. Intenta más tarde."
}
```

---

## ✅ Validaciones

Todos los inputs son validados con **Zod**. Si hay errores, se devuelve:

```json
{
  "error": "ValidationError",
  "message": "El título debe tener al menos 3 caracteres"
}
```

---

## 🧪 Testing (pendiente)

Se va a integrar Jest + Supertest para pruebas unitarias y de integración.

---

## 🔐 Autenticación (próximamente)

Se planea implementar login con JWT para proteger rutas de administración.

---

## 🧠 Buenas prácticas aplicadas

- ✔ Principios SOLID
- ✔ Patrón de arquitectura en capas + repositorio
- ✔ Validaciones seguras y tipadas
- ✔ Logger profesional
- ✔ Linter + Prettier
- ✔ Código limpio y modular
- ✔ Preparado para escalar

---

## 🧑‍💻 Autor

Mateo Fortuna  
[LinkedIn](https://www.linkedin.com/in/mateo-fortuna-aa2a09230/)  
[GitHub](https://github.com/mateqf)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
