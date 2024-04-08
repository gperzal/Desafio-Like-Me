# Like Me

Una aplicación web interactiva para compartir y reaccionar a publicaciones.

## Deploy

La aplicación está desplegada y disponible para uso en: [Like Me en Render](https://like-me.onrender.com)

## Tecnologías Utilizadas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/sequelize-24242d?style=for-the-badge&logo=sequelize&logoColor=2596be&labelColor=24242d)
![DOTENV](https://img.shields.io/badge/dotenv-0000?style=for-the-badge&logo=dotenv&logoColor=fff&color=b0a321)
![POSTGRES](https://img.shields.io/badge/Postgres-436590?style=for-the-badge&logo=postgresql&logoColor=fff&color=436590)
![Neon](https://img.shields.io/badge/neon-0c0c0c?style=for-the-badge&logo=neon&logoColor=fff&color=0c0c0c)

## Instalación

Para ejecutar localmente, necesitas tener instalado Node.js y PostgreSQL. Sigue estos pasos para la instalación:

1. Clona el repositorio: 
    ```
   git clone https://github.com/gperzal/Desafio-Like-Me.git
    ```

3. Navega al directorio del proyecto: 
    ```
   cd DesafIo-Mi-Like-Me
    ```

4. Instala las dependencias: 
    ```
   npm i
    ```

5. Configura las variables de entorno según tu configuración de PostgreSQL en un archivo .env
    ```
    DB_USER = tu_usuario_de_base_de_datos
    DB_PASS = contraseña_de_base_de_datos
    DB_HOST = host_de_base_de_datos
    DB_NAME = nombre_de_la_base_de_datos
    ```

   

6. Ejecuta las migraciones para crear las tablas en la base de datos:
   ```
   npx sequelize-cli db:migrate
   ```

8. Inicia el servidor: 
    ```
   npm start
    ```

##  Características y Rutas

| Ruta	                  | Método	| Descripción                                               |
|-------------------------|---------|-----------------------------------------------------------|
|/posts	                  |GET	    |Obtiene una lista de todas las publicaciones.              |
|/posts                   |POST	    |Crea una nueva publicación.                                |
|/posts/:postId/reaction  |PUT	    |Actualiza la reacción de una publicación (like/dislike).   |
|/posts/:postId	          |PUT	    |Actualiza la |información de una publicación.              |
|/posts/:postId	          |DELETE	|Elimina una publicación específica.                        |
