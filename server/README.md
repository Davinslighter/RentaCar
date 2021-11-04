# RentaCar
servidor

### Idiomas
- 🇪🇸 Español
- 🇺🇸 [Inglés](./README.en.md)

## Instalar dependencias

Por defecto, las dependencias en esta aplicación ya fueron generadas.
Siempre que las dependencias en `package.json` son cambiadas, corre el siguiente comando: 

```sh
npm install
```

Para solo instalar las dependencias resueltas en `package-lock.json`:

```sh
npm ci
```

## Correr la aplicación

```sh
npm start
```

También puedes correr `node .` para saltarte la parte de compilación.

Abre http://127.0.0.1:3000 en tu navegador.

## Recompilar el proyecto

Para compilar incrementalmente el proyecto:

```sh
npm run build
```

Para forzar una compilación completa limpiando los artefacots almacenados en caché:

```sh
npm run rebuild
```

## Corregir problemas de formato y estilo de código

```sh
npm run lint
```

Para solucionar automáticamente estos problemas:

```sh
npm run lint:fix
```

## Otros comandos útiles

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```
