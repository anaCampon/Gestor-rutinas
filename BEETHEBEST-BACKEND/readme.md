# API de Gestión de Eventos

## Descripción  
Esta API permite gestionar eventos deportivos, permitiendo a los usuarios registrarse, autenticarse y administrar eventos.  

## Tecnologías Usadas  
- Node.js  
- Express  
- MySQL  
- JWT para autenticación  
- bcrypt para hashing de contraseñas  


## ENDPOINTS principales

### Rutas de autenticación
**POST /api/users/register** -> Registra un usuario
Ejemplo de body:
```JSON
{
"username":"kikoMangasVerdes",
"password":"Hola"
} 
```
Resultado esperado:
```JSON
{
  "message": "Registrado con éxito",
  "id": 5
}
```

**POST /api/users/login** -> Inicia sesión y recibe un token
Ejemplo de body:
```JSON
{
"username":"kikoMangasVerdes",
"password":"Hola"
} 
```
Resultado esperado:
```JSON
{
  "token": "eyJhbGciOiJIUzI..."
}
```

**GET /api/users/profile** -> Permite ver el perfil de la persona logeada (requiere token)
Auth:
```JSON
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVz
```
Resultado esperado:
```JSON
{
    "data": {
    "id": 3,
    "username": "kikoMangasverdes"
  }
}
```


### Rutas para Gestión de Eventos(todas protegidas con JWT)
**GET /api/events** -> Devuelve una lista de todos los eventos deportivos

**GET /api/events/:id** -> Devuelve los detalles de un evento específico por su ID.
Auth:
```JSON
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVz
```
Resultado esperado:
```JSON
{
  "data": [
    {
      "idevento": 1,
      "nombre": "Maratón de Primavera",
      "descripcion": "Carrera de 10km por la ciudad.",
      "fecha": "2023-09-14T22:00:00.000Z",
      "ubicacion": "Madrid",
      "deporte": "Atletismo",
      "organizador_id": 1
    }
  ]
}
```


**POST /api/events** -> Permite crear un nuevo evento deportivo 
Ejemplo de body:
```JSON
{
  "nombre": "Maratón de Primavera",
  "descripcion": "Carrera de 10km",
  "fecha": "2024-06-01",
  "ubicacion": "Madrid",
  "deporte": "Atletismo"
}
```
Auth:
```JSON
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVz
```
Resultado esperado:
```JSON
{
  "clientid": 28
}
```

**PUT /api/events/:id** -> Permite actualizar un evento existente
Ejemplo de body:
```JSON
{
  "nombre": "Nuevo Nombre del Evento",
  "descripcion": "Descripción actualizada",
  "fecha": "2024-06-01",
  "organizador_id":1
}
```
Auth:
```JSON
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVz
```
Resultado esperado:
```JSON
{
  "message": "Evento actualizado correctamente"
}
```

**DELETE /api/events/:id** -> Elimina un evento específico
Auth:
```JSON
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVz
```
Resultado esperado:
```JSON
{
  "message": "Evento eliminado correctamente"
}
```

### Rutas para Consulta Avanzada de Eventos(todas protegidas con JWT)
**GET /api/events/upcoming** -> Devuelve una lista de eventos próximos, ordenados por fecha.
Búsqueda en Thunderclient:
```JSON
GET -> http://localhost:4500/events/upcoming
```

**GET /api/events?type=** -> Permite filtrar eventos por tipo de deporte
Búsqueda en Thunderclient:
```JSON
GET -> http://localhost:4500/events?type=Atletismo
```

**GET /api/events/date?from=2023-09-10&to=2023-09-20** -> Devuelve los eventos dentro del rango de fechas especificado.
Búsqueda en Thunderclient:
```JSON
GET -> http://localhost:4500/events/date?from=2023-09-10&to=2023-09-20
```


