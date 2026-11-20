# Servicio de Autenticación

## Descripción
Este proyecto consiste en un servicio web desarrollado con Node.js y Express que permite registrar usuarios e iniciar sesión mediante usuario y contraseña.

El servicio verifica las credenciales recibidas y devuelve un mensaje de autenticación satisfactoria cuando los datos son correctos. Si las credenciales son incorrectas, devuelve un mensaje de error.

## Tecnologías utilizadas
- Node.js
- Express
- JavaScript
- bcryptjs
- CORS
- Git

## Instalación

1. Descargar o clonar el repositorio.
2. Abrir una Terminal en la carpeta del proyecto.
3. Instalar las dependencias:

   npm install

4. Iniciar el servicio:

   npm start

El servidor estará disponible en:

http://localhost:3000

## Rutas del servicio

### 1. Comprobar el funcionamiento

Método: GET

Ruta: /

### 2. Registrar un usuario

Método: POST

Ruta: /api/auth/register

Ejemplo de datos JSON:

{
  "username": "aprendiz1",
  "password": "ClaveSena2026"
}

Respuesta esperada:

{
  "mensaje": "Usuario registrado correctamente",
  "usuario": "aprendiz1"
}

### 3. Iniciar sesión

Método: POST

Ruta: /api/auth/login

Ejemplo de datos JSON:

{
  "username": "aprendiz1",
  "password": "ClaveSena2026"
}

Si las credenciales son correctas, el servicio responde:

{
  "mensaje": "Autenticación satisfactoria",
  "usuario": "aprendiz1"
}

Si las credenciales son incorrectas, responde:

{
  "mensaje": "Error en la autenticación"
}

## Seguridad

Las contraseñas se protegen mediante bcryptjs antes de almacenarse. De esta manera, no se guardan como texto plano.

## Almacenamiento

Los usuarios registrados se almacenan localmente en el archivo:

data/users.json

## Autor
Aprendiz del programa Análisis y Desarrollo de Software - SENA.
