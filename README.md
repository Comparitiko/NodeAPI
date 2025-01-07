<h1 style="text-align: center; font-weight: 500;">
  🚀 Práctica API NodeJS 🚀
</h1>

<h2 style="text-align: center; border-bottom: 1px solid white; font-weight: 500; padding-bottom: 2rem;">
   Gabriel Collado
</h2>

## Link de la práctica en github

- [**NodeJS API**](https://github.com/Comparitiko/NodeAPI)

## Para ver la app desplegada se puede acceder a las siguiente URL

- [**NodeJS API**](https://nodejs.comparitiko.dev/)

## En caso de que el servidor no esté disponible

1. Entrar por ssh a mi aws

2. Entrar al directorio del servidor

   ```bash
   cd NodeAPI
   ```

3. Hacer un git pull para actualizar los archivos
   ```bash
    git pull
   ```
4. Ejecutar los contenedores docker
   ```bash
   docker-compose build && docker-compose up -d
   ```
5. Entrar a la aplicación en la URL:

- NodeJS API: **http://[IP_AWS]:8080/**

## Poner en ejecuciòn en entorno local

1. Clonar el repositorio
   ```bash
   git clone https://github.com/Comparitiko/NodeAPI.git
   ```
2. Entrar al directorio clonado
   ```bash
   cd NodeAPI
   ```
3. Hacer una copia del archivo .env.template y renombrarlo como .env

   ```bash
   cp .env.template .env
   ```

4. Cambiar los valores de las variables de entorno en el archivo .env

5. Ejecutar el contenedor docker reconstruyendo las imagenes
   ```bash
   docker compose build && docker compose up -d
   ```

7. Abrir en el navegador la ruta

- **http://localhost:8080/**
