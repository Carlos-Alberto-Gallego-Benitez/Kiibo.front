# Angular.io y Angular-es
[![Build Status][travis-badge]][travis-badge-url]

### Servidor local sincronizado y recarga del navegador
1. cd dentro del directorio raiz `angular.io/`
1. ejecute `gulp serve-and-sync`
1. el navegador se lanzará en localhost:4200 y se mantendrá actualizado automáticamente.

<a id="serve-and-sync"></a>
Si va a trabajar en una parte especifica de la documentación, tal como la guía de desarrollo, se puede utilizar una de las tareas más especificas de gulp para sincronizar solo esos archivos del sistema:

* `gulp serve-and-sync` : sincronice todos los archivos Jade/Sass locales, los ejempos y recursos de la API y los archivos de la guía de desarrollo
* `gulp serve-and-sync-api` : sincronice solo los archivos de ejemplo y de código fuente de la API
* `gulp serve-and-sync-devguide` : sincronice solo los archivos de la guía de desarrollo
* `gulp build-and-serve` : sincronice solo los archivos Jade/Sass locales

## Desarrollo Del Código De Ejemplo

Toda la documentación está apoyada por código de ejemplo y plunkers.
Dicho código reside en el directorio `public/docs/_examples`, bajo los directorios del capítulo especifico y luego divididos por lenguaje.

Los ejemplos del Inicio Rápido en Typescript están en `public/docs/_examples/quickstart/ts`.


1. cd a `public/docs/_examples`

1. instale los paquetes canónicos para todos los ejemplos ejecutando `npm install`

1. cd de vuelta a la raiz `angular.io`: `cd ../../..`

Ahora entra en cualquier ejemplo particular de un languaje (ej., `public/docs/_examples/quickstart/ts`) y pruebe:
- `npm start`  para compilar y servir en el navegador de forma sincronizada
- `npm run tsc` para solo compilar
- `npm run lite` para servir en el navegador de forma sincronizada

Mire los scripts en `package.json` para otras opciones.
También, puede abrir cualquier `plunkr.no-link.html` para ver la ejecución del código en plunker
(tal vez se debe ejecutar `gulp build-plunkers` primero para crear/actualizar).


Cualquier combinación de opciones es posible.


### Trabajar con la versión build de Angular en vez de la última versión publicada
Se pueden cambiar los paquetes de `@angular` en `~/public/docs/_examples/node_modules` por los paquetes del build con
```
gulp install-example-angular --build
```
Restaurar a los paquetes de la VERSIÓN ACTUAL con
```
gulp install-example-angular
```
>Estos comandos fallarán si algo está bloqueando algunos de los paquetes ... como algún IDE hace a menudo.
>
>El síntoma es típicamente un error al tratar de `rm -rf node_modules/@angular`.
>
>_Solución_: Para desbloquear un paquete. En VS Code, recargar la ventana (`cmd-P` luego ingresar `>relow`).

NOTA: La versión build corresponde con la versión en master de Angular 16


## Technología Usada
- Angular 1.x: La versión lista para producción de Angular
- Gulp: Librería basada en node que sirve para automatizar tareas comunes de desarrollo
- Harp: El servidor web estático con preprocesamiento incorporado
- Sass: Una extensión de CSS.
- Grids: Una sistema de cuadrícula de CSS altamente personalizable construido con Sass
- Prettify: Un módulo de JS y CSS para resaltar sintaxis de fragmentos de código fuente
- Icomoon: Fuentes de iconos personalizados
- Ionic: Sdk de apoyo para el desarrollo de aplicación.
- Firebase: Almacenamiento de datos remoto


## paso 1
npm i para instalar las depedencias

## paso 2

ng serve para encender el servidor


