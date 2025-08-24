# SIGMini – Frontend

Frontend de **SIGMini** (Gestión de Minimercado) construido con **Vite + React + TypeScript**, conectado a un backend **FastAPI**.

> Repositorio del backend (referencia): `https://github.com/<TU_USUARIO>/sigmini-backend`

---

## 🚀 Requisitos

- **Node.js** ≥ 18 (recomendado LTS)
- **npm** ≥ 9

Verifica tu versión:

```bash
node -v
npm -v
```

---

## 📦 Instalación

Clona este repositorio y entra al proyecto:

```bash
git clone https://github.com/<TU_USUARIO>/sigmini-frontend.git
cd sigmini-frontend
```

Instala dependencias:

```bash
npm install
```

---

## ⚙️ Configuración de entorno

Este proyecto lee la URL del backend desde una variable de entorno **VITE_API_BASE**.

1) Copia el ejemplo y crea tu archivo `.env`:

```bash
# en Windows PowerShell
Copy-Item .env.example .env

# o en macOS/Linux
cp .env.example .env
```

2) Edita `.env` y coloca la URL de tu backend (por defecto FastAPI corre en 8000):

```ini
VITE_API_BASE=http://127.0.0.1:8000
```

> **Nota:** El archivo `.env` no debe subirse al repositorio. Se incluye `.env.example` como plantilla.

---

## ▶️ Ejecutar en modo desarrollo

```bash
npm run dev
```

Vite mostrará una URL similar a:

```
http://localhost:5173/
```

Abre esa dirección en el navegador y ya podrás usar la app.  
Si el backend está corriendo y CORS está habilitado, verás/crearás productos sin errores.

---

## 🧰 Scripts útiles

```bash
npm run dev        # Modo desarrollo
npm run build      # Compilación para producción (dist/)
npm run preview    # Previsualizar build de producción
```

---

## 🧭 Estructura (resumen)

```
sigmini-frontend/
├─ src/
│  ├─ api/           # llamadas a la API (fetch/axios)
│  ├─ components/    # componentes UI
│  ├─ pages/         # páginas (Productos, etc.)
│  └─ main.tsx       # arranque de React
├─ index.html
├─ package.json
├─ vite.config.ts
├─ .env.example
└─ README.md
```

> Los nombres pueden variar ligeramente según tu implementación.

---

## 🩺 Solución de problemas

- **“Network Error / CORS error” al cargar/crear productos**
  - Asegúrate de que el backend está levantado en `http://127.0.0.1:8000`.
  - Verifica que el backend tenga CORS habilitado. Ejemplo en FastAPI:
    ```python
    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    ```
- **No conecta con el backend**
  - Revisa que tu `.env` tenga `VITE_API_BASE` correcto.
  - Vuelve a **reiniciar** el servidor de desarrollo después de cambiar `.env`:
    - Detén con `Ctrl + C` y ejecuta otra vez `npm run dev`.

---

## 📄 Licencia

Este proyecto es de uso académico. Ajusta la licencia si lo necesitas.

---
