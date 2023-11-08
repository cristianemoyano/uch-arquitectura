# uch-arquitectura
UCH - Arquitectura de sistemas - 2023

##  Comenzar
> Importante: Es necesario tener instalado [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) y [git](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalaci%C3%B3n-de-Git)

1. Descargar repo

```bash
git clone https://github.com/cristianemoyano/uch-arquitectura.git

cd app
```

2. Instalar

```bash
yarn install
```

3. Configurar credentiales en el ambiente. Para ello crear un archivo llamado  `.env.local` en la carpeta `/app`

```bash
touch .env.local
```

4. Copia las credenciales de [este archivo](https://docs.google.com/document/d/1tpbiKsa5k58bKFH4esytqIoiLZ8jyANJeZKcCm6M8jI/edit?usp=sharing) en el archivo creado en el paso anterior.

5. Correr localmente

```bash
yarn dev
```

6. Abrir la app [http://localhost:3000](http://localhost:3000)


##  Subir los cambios a Github y crear un PR

1. Descarga los ultimos cambios en el repositorio
```bash
git pull
```
2. Crear una nueva rama

```bash
git checkout -b nombre-de-la-rama
```

3. Hace los cambios en tu editor.
4. Hacer stash de los cambios

```bash
git add .
```
5. Hacer commit de los cambios

```bash
git commit -m 'Mensaje del commit'
```
6. Subir los cambios a GIT

```bash
git push origin nombre-de-la-rama
```
7. Crear el PR
```bash
https://github.com/cristianemoyano/uch-arquitectura/pull/new/nombre-de-la-rama
```

8. Una vez creado el PR, pide que te lo revise un compañero. Necesitas que esté aprobado para que puedas mergearlo.
9. Una vez revisado y aprobado el PR, podrás mergearlo.
10. Vuelve a la rama principal
```bash
git checkout main
```
11. Traete los últimos cambios
```bash
git pull
```

## Estructura del proyecto

https://nextjs.org/docs/getting-started/project-structure

- **app/**
  - **src/**
    - **components/**: Aquí se escriben los [React components](https://react.dev/learn/your-first-component#defining-a-component).
    - **pages/**: Aquí se definen las rutas y los controladores de las páginas de la app. Haz [aquí](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) aquí para para aprender más de la carpeta pages de NextJs.
      - **api/**: En esta carpeta, se define los endpoints y controladores de la api de la app.
    - **services/**: Aquí se van a definir los servicios backend de la app.
    - **styles/**: Aquí se pueden definir estilos CSS globales. Aunque no es necesario que escribas los estilos aquí dado que la app tiene instalado [Tailwind](https://tailwindcss.com/) como framework de CSS.

## Asignaciones

### REVISIÓN 1:

- UserService: Clara y [Claudia](https://github.com/Silvi07) (frontend) y [Cristian](https://github.com/cristianemoyano) (backend)
- ProductService: [Martín](https://github.com/Tinincho) y [Lucio](https://github.com/Mlucio94) (backend y frontend)
- OrderService: [Karim](https://github.com/Karim-Neme) y [Anahi](https://github.com/anissval) (backend y frontend)


### REVISIÓN 2:

- Validar roles / permisos y exponer un servicio para esto mismo [Cristian](https://github.com/cristianemoyano)
- revisar links que estén funcionando (barra de navegación) [Anahi](https://github.com/anissval)
- revisión y actualización de documentación Clara y [Claudia](https://github.com/Silvi07)
- agregar user id  logueado en el checkout [Karim](https://github.com/Karim-Neme)
- arreglar el remove producto del carrito [Lucio](https://github.com/Mlucio94)
- Revisar lógica del stock [Martín](https://github.com/Tinincho)