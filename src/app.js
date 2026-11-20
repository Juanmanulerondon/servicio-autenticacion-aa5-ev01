// Importamos las herramientas necesarias para crear el servicio web.
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Creamos la aplicación de Express.
const app = express();
const PORT = 3000;

// Configuramos el servicio para recibir datos JSON y solicitudes externas.
app.use(cors());
app.use(express.json());

// Definimos la ubicación del archivo donde se guardan los usuarios.
const usersFile = path.join(__dirname, '../data/users.json');

// Leemos los usuarios almacenados en el archivo.
function readUsers() {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
}

// Guardamos los usuarios actualizados en el archivo.
function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Ruta principal para comprobar que el servicio funciona.
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servicio de autenticación funcionando correctamente' });
});

// Ruta para registrar un usuario.
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validamos que se reciban los datos necesarios.
        if (!username || !password) {
            return res.status(400).json({
                mensaje: 'El usuario y la contraseña son obligatorios'
            });
        }

        const users = readUsers();

        // Evitamos registrar dos veces el mismo nombre de usuario.
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            return res.status(409).json({
                mensaje: 'El nombre de usuario ya está registrado'
            });
        }

        // Convertimos la contraseña en un hash para no guardarla en texto plano.
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = {
            id: crypto.randomUUID(),
            username,
            password: passwordHash
        };

        users.push(newUser);
        saveUsers(users);

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: username
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
});

// Ruta para iniciar sesión y verificar las credenciales.
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Comprobamos que se hayan enviado usuario y contraseña.
        if (!username || !password) {
            return res.status(400).json({
                mensaje: 'El usuario y la contraseña son obligatorios'
            });
        }

        const users = readUsers();

        // Buscamos el usuario registrado.
        const user = users.find(user => user.username === username);

        // Si no existe, devolvemos un error de autenticación.
        if (!user) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        // Comparamos la contraseña recibida con el hash almacenado.
        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria',
            usuario: username
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
});

// Iniciamos el servicio web en el puerto definido.
app.listen(PORT, () => {
    console.log(`Servicio de autenticación activo en http://localhost:${PORT}`);
});
