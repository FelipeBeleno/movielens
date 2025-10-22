# 🎥 MovieLens

Una aplicación web moderna para explorar películas utilizando la API de The Movie Database (TMDB). Construida con React, TypeScript, Redux Toolkit y Framer Motion.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Cuenta en [TMDB](https://www.themoviedb.org/settings/api) para obtener API Key

### Configuración

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd MovieLens
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz del proyecto:
```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
npm run preview
```

## 📁 Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── layout/         # Componentes de layout
│   │   └── Navbar.tsx  # Barra de navegación
│   └── ui/             # Componentes de interfaz
│       └── Loader.tsx  # Indicador de carga
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página principal con grid de películas
│   ├── DetailMovie.tsx # Detalles de película individual
│   ├── PopularMovies.tsx # Películas populares
│   └── NotFound.tsx    # Página 404
├── store/              # Estado global con Redux Toolkit
│   ├── api/            # RTK Query APIs
│   │   └── moviesApi.ts # Endpoints de TMDB
│   ├── movieSlice.ts   # Slice para estado de películas
│   └── store.ts        # Configuración del store
├── types/              # Definiciones de TypeScript
│   ├── movie.type.ts   # Tipos para respuestas de películas
│   ├── movie.id.type.ts # Tipos para detalles de película
│   └── popular.api.ts  # Tipos para API de populares
├── utils/              # Utilidades y constantes
│   └── constants.ts    # Configuración de API
├── hooks/              # Custom hooks (vacío actualmente)
├── App.tsx             # Componente principal
└── main.tsx           # Punto de entrada
```

## 🛠️ Tecnologías Utilizadas

### Core Framework
- **React 19.1.1** - Framework principal para UI
- **TypeScript 5.9.3** - Tipado estático para mejor desarrollo
- **Vite 7.1.7** - Build tool rápido y moderno

### Estado y Datos
- **Redux Toolkit 2.9.1** - Manejo de estado global simplificado
- **RTK Query** - Fetching de datos y cache automático
- **React Redux 9.2.0** - Integración React-Redux

### Routing y Navegación
- **React Router DOM 7.9.4** - Navegación SPA con rutas dinámicas

### Estilos y Animaciones
- **Tailwind CSS 4.1.15** - Framework CSS utility-first
- **Framer Motion 12.23.24** - Animaciones fluidas y transiciones

### Desarrollo
- **ESLint 9.36.0** - Linting y calidad de código
- **TypeScript ESLint** - Reglas específicas para TypeScript

### Motivos de Elección
- **Redux Toolkit + RTK Query**: Simplifica el manejo de estado y elimina boilerplate
- **Framer Motion**: Animaciones declarativas y performantes
- **Tailwind CSS**: Desarrollo rápido con clases utilitarias
- **TypeScript**: Prevención de errores y mejor DX
- **Vite**: Build times rápidos y HMR instantáneo

## 🌐 APIs Utilizadas

### The Movie Database (TMDB) API v3

**Base URL**: `https://api.themoviedb.org/3`

#### Endpoints Implementados

1. **Discover Movies** - `/discover/movie`
   - Parámetros: `page`, `language=es-CO`, `sort_by=popularity.desc`
   - Uso: Lista paginada de películas populares

2. **Movie Details** - `/movie/{id}`
   - Parámetros: `language=es-ES`
   - Uso: Detalles completos de película específica

3. **Popular Movies** - `/discover/movie` (página 1)
   - Parámetros: `language=es-CO`, `page=1`
   - Uso: Películas más populares del momento

#### Configuración de Imágenes
- **Base URL**: `https://image.tmdb.org/t/p`
- **Tamaños**: `w500` (detalles), `original` (grid principal)

#### Autenticación
- **Método**: Bearer Token en headers
- **Header**: `Authorization: Bearer {API_KEY}`

## 🧩 Componentes Principales

### Pages

#### `Home.tsx`
- **Funcionalidad**: Grid principal de películas con paginación
- **Estado**: Maneja página actual con Redux
- **Features**: 
  - Paginación bidireccional
  - Lazy loading de imágenes
  - Animaciones de entrada
  - Sistema de calificación visual

#### `DetailMovie.tsx`
- **Funcionalidad**: Vista detallada de película individual
- **Datos mostrados**: 
  - Información básica (título, año, sinopsis)
  - Géneros y idiomas
  - Calificación con estrellas
  - Datos financieros (presupuesto, ingresos)
  - Compañía productora
- **Navegación**: Botón de retroceso integrado

#### `PopularMovies.tsx`
- **Funcionalidad**: Lista de películas más populares
- **Implementación**: Similar a Home pero sin paginación

### Components

#### `Navbar.tsx`
- **Funcionalidad**: Navegación principal
- **Rutas**: Enlaces a Home y Películas Populares

#### `Loader.tsx`
- **Funcionalidad**: Indicador de carga global
- **Uso**: Mostrado durante fetch de datos

## 🗄️ Estado Global

### Store Configuration (`store.ts`)
```typescript
- movieReducer: Manejo de estado de películas
- moviesApi.reducer: Cache de RTK Query
- Middleware: RTK Query para invalidación automática
```

### Movie Slice (`movieSlice.ts`)
```typescript
interface MovieState {
  initializedPage: number; // Página actual para persistencia
}

Actions:
- uploadPage: Actualiza página actual
```

### Movies API (`moviesApi.ts`)
```typescript
Endpoints:
- getMovies: Query paginada con cache automático
- getMovieFromId: Detalles por ID con cache
- getPopularMovies: Lista de populares

Features:
- Invalidación automática
- Loading states
- Error handling
- Background refetching
```

## ✨ Animaciones Implementadas

### Framer Motion Animations

#### Page Transitions
```typescript
// Fade in principal
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

#### Movie Cards
```typescript
// Entrada escalonada
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}

// Hover effect
whileHover={{ scale: 1.05 }}
```

#### Detail View
```typescript
// Entrada con escala
initial={{ scale: 0.95, y: 20 }}
animate={{ scale: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

#### Title Animation
```typescript
// Slide down del título
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### CSS Animations
- **Loading states**: `animate-pulse` para indicadores
- **Transitions**: Hover effects en botones y cards
- **Gradients**: Backgrounds animados con Tailwind

## 🎨 Características de UI/UX

- **Responsive Design**: Adaptable a móviles, tablets y desktop
- **Dark Theme**: Esquema de colores oscuro moderno
- **Lazy Loading**: Carga diferida de imágenes
- **Error Boundaries**: Manejo graceful de errores
- **Loading States**: Feedback visual durante cargas
- **Accessibility**: Navegación por teclado y screen readers

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)  
- **Desktop**: > 1024px (xl)

Grid adaptativo:
- Mobile: 1 columna
- Tablet: 2-3 columnas
- Desktop: 4 columnas

## 🔧 Scripts Disponibles

```bash
npm run dev      # Desarrollo con HMR
npm run build    # Build de producción
npm run lint     # Linting con ESLint
npm run preview  # Preview del build
```

## 🌟 Próximas Mejoras

- [ ] Búsqueda de películas
- [ ] Filtros por género/año
- [ ] Favoritos con localStorage
- [ ] Modo claro/oscuro
- [ ] Infinite scroll
- [ ] PWA capabilities
- [ ] Tests unitarios