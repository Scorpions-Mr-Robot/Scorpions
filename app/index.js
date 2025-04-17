const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autenticación
const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.adminToken;
    
    if (!token) {
        return res.redirect('/admin/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        res.clearCookie('adminToken');
        return res.redirect('/admin/login');
    }
};

// Rutas públicas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Rutas existentes
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'login.html')));
app.get("/contacto", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'contacto.html')));
app.get("/servicios", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'servicios.html')));
app.get("/horarios", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'horarios.html')));
app.get("/informacion", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'informacion.html')));
app.get("/sistemas", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'sistemas.html')));
app.get("/proyectos", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'proyectos.html')));
app.get("/mision", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'mision.html')));
app.get("/vision", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'vision.html')));
app.get("/valores", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'valores.html')));

// Rutas de administrador
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin', 'login.html'));
});

app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Verifica las credenciales
        if (username === process.env.ADMIN_USER && 
            await bcrypt.compare(password, process.env.ADMIN_PASS)) {
            
            const token = jwt.sign(
                { username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.cookie('adminToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 24 horas
            });
            
            res.json({ success: true });
        } else {
            res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// Ruta para cerrar sesión
app.get('/api/admin/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin/login');
});

// Rutas protegidas del administrador
app.get('/admin/dashboard', authenticateAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin', 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

