const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'tu_contraseña_admin';
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt