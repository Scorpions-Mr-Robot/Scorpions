const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = '123456a'; // Changed password here
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log('Hash generado:', hash);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateHash();