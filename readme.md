# BeeTheBest - Generador de Rutinas de Aprendizaje Personalizadas

## Descripción  
BeeTheBest es una aplicación web diseñada para ayudarte a organizar tus rutinas de estudio de manera efectiva y personalizada. Puedes crear tareas diarias, editarlas, eliminarlas y agruparlas por días de la semana. La interfaz es intuitiva, adaptable a cualquier dispositivo y visualmente atractiva gracias a Bootstrap. 

## Tecnologías Usadas  
- Angular
- Bootstrap
- HTML5, CSS3, TypeScript
- Node.js  
- Express.js 
- MySQL  
- JWT para autenticación  
- bcrypt para hashing de contraseñas  


## Instrucciones para Ejecutar el Backend 

1. ### Asegúrate de tener instalado Node.js y MySQL.

2. ### Clona el repositorio:

```JSON
git clone https://github.com/anaCampon/Gestor-rutinas
cd beethebest/backend
```
3. ### Instala las dependencias:

```JSON
npm install
```

4. ### Configura la base de datos:

  Crea una base de datos en MySQL (por ejemplo, beethebest_db).

  Ajusta el archivo .env con tus credenciales:

    ```.env
    USER_DB=
    PASS_DB=
    PORT_DB=
    NAME_DB=
    PORT=
    PASS_JWT=
    ```

5. ### Ejecuta el script de base de datos si es necesario.

Inicia el servidor:

```JSON
npm start
npm run dev
```

El backend se ejecutará en: http://localhost:4500

# Instrucciones para ejecutar el proyecto

### Requisitos previos

- Node.js y npm instalados.
- Angular CLI instalado globalmente (`npm install -g @angular/cli`).
- Servidor MySQL en funcionamiento (puede ser local o remoto).

---

## Configuración de la base de datos

1. Abre tu herramienta MySQL (MySQL Workbench o la terminal).
2. Crea una nueva base de datos, explicado en init_db.sql

## Instrucciones para Ejecutar el Frontend (Angular)

1. ## Desde el directorio raíz:

```JSON
cd ../frontend
```

2. ## Instala las dependencias:

```JSON
npm install
```

3. ## Ejecuta la aplicación:

```JSON
ng serve
```

4. ## Abre el navegador en: http://localhost:4200


