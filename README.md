# Karen Méndez — Portafolio

Mi portafolio profesional para mostrar mis servicios de desarrollo web y automatización.

## Tecnologías

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Backend**: API Routes de Next.js
- **Base de Datos**: Supabase (PostgreSQL)
- **Email**: Nodemailer (SMTP Gmail)

## Requisitos

- Node.js 20.9+
- npm

## Instalación local

1. Clona el repositorio
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea el archivo `.env` desde `.env.example` y completa las variables:

   ```bash
   cp .env.example .env
   ```

4. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre http://localhost:3000

## Variables de entorno

| Variable           | Descripción                                          |
| ------------------ | ---------------------------------------------------- |
| `SUPABASE_URL`     | URL de tu proyecto en Supabase                       |
| `SUPABASE_KEY`     | API key (anon/service) de Supabase                   |
| `ADMIN_PASSWORD`   | Contraseña del panel admin                           |
| `ADMIN_SECRET`     | Secreto para firmar las sesiones del admin           |
| `EMAIL_SENDER`     | Correo remitente (Gmail)                             |
| `EMAIL_PASSWORD`   | App Password del remitente                           |
| `EMAIL_RECIPIENT`  | Correo que recibe los mensajes del formulario        |
| `EMAIL_SMTP_HOST`  | Host SMTP (por defecto `smtp.gmail.com`)             |
| `EMAIL_SMTP_PORT`  | Puerto SMTP (por defecto `465`)                      |

## Tablas en Supabase

La tabla `messages` debe tener como mínimo estas columnas:

- `name` (text)
- `email` (text)
- `project_type` (text)
- `message` (text)
- `created_at` (timestamptz)

Activa **Row Level Security** con una política que permita `INSERT` anónimo y
`SELECT` autenticado con el rol `service_role` (clave usada en el servidor).

## Panel de Admin

- URL: `/admin`
- La contraseña se define con la variable `ADMIN_PASSWORD`.
- Las sesiones se protegen con cookie firmada (`httpOnly`) usando `ADMIN_SECRET`.

## Despliegue en Render (plan gratuito)

1. Crea un **Web Service** conectado a este repositorio.
2. Configura el build:
   - Build Command: `npm run build`
   - Start Command: `npm start`
3. Agrega todas las variables de entorno de la tabla de arriba.

## Scripts

| Comando        | Descripción                              |
| -------------- | ---------------------------------------- |
| `npm run dev`  | Servidor de desarrollo (Turbopack)       |
| `npm run build`| Build de producción (Turbopack)          |
| `npm start`    | Serves producción                        |
| `npm run lint` | Lint con ESLint                          |

## Contacto

- WhatsApp: 573006707655
- Email: contacto@karenmendez.dev