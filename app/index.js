import express from 'express';
// Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// server
const app = express();
const port = process.env.PORT || 4000;
app.set("port", port);
app.listen(app.get("port"));
console.log("servidor corriendo en el puerto", app.get("port"));

// configuración 
app.use(express.static(path.join(__dirname, 'public')));

// links de la página
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'pages', 'index.html')));
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

