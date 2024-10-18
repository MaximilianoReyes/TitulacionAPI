# TitulacionAPI

Esta es una API RESTful construida con Node.js y Express que permite gestionar informacion de una base de datos PostgreSQL.

## Funcionalidades

- **Gestión de Estudiantes**: Permite realizar operaciones CRUD sobre los registros de estudiantes.
- **Validación de Datos**: Utiliza `express-validator` para asegurar que los datos de entrada sean válidos.
- **Middleware Reutilizable**: Implementa middleware para buscar estudiantes y manejar validaciones de manera eficiente.

## Instalación

1. Clonar el repositorio:

    ```bash
    https://github.com/MaximilianoReyes/TitulacionAPI.git
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Crear el archivo .env y despues configurar las variables de entorno en el archivo segun tus credenciales 

    ```bash
    New-Item -Path .env -ItemType File

    DB_USER
    DB_HOST
    DB_NAME
    DB_PASSWORD
    DB_PORT
    ``` 

4. Iniciar la API

    ```bash
    npm start
    ```
